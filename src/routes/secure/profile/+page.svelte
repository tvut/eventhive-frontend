<script>
	import axios from 'axios';
	import { authToken } from '../../../stores/auth';
	import { get } from 'svelte/store';
	import { goto } from '$app/navigation';
	import Nav from '../../../components/nav.svelte';
	import { onMount } from 'svelte';

	let username = '';
	let data = {
		username: '',
		name: '',
		faculty: '',
		event: '',
		year: '', // Add year to the data object
		ispublic: null
	};
	let updateMessage = '';
	let errors = {};

	// Fetch the profile data on page load
	onMount(() => {
		if (!get(authToken)) {
			goto('/login');
		}
		getProfile();
	});

	// Fetch profile data from the backend
	const getProfile = async () => {
		let token = get(authToken);
		let config = {
			headers: { Authorization: `Bearer ${token}` }
		};

		try {
			const response = await axios.get('http://localhost:8000/profile', config);

			// Populate fields with data from the backend
			data = {
				username: response.data.username || '',
				name: response.data.name || '',
				faculty: response.data.faculty || '',
				event: response.data.event || '',
				year: response.data.year || '', // Load year from the backend
				ispublic: response.data.ispublic !== undefined ? response.data.ispublic : null
			};
			username = data.username; 
		} catch (err) {
			console.error(err);
			updateMessage = 'Failed to load profile data.';
		}
	};

	// Validate the form before updating
	const validate = () => {
		errors = {};
		if (!data.username || data.username.trim() === '') {
			errors.username = 'Username cannot be empty.';
		}
		if (!data.name || data.name.trim() === '') {
			errors.name = 'Name cannot be empty.';
		}
		if (data.year && isNaN(Number(data.year))) {
			errors.year = 'Year must be a valid number.';
		}
		return Object.keys(errors).length === 0;
	};

	// Update the profile on the backend
	const update = async () => {
		if (!validate()) {
			updateMessage = 'Please fix validation errors before saving.';
			return;
		}

		let token = get(authToken);
		let config = {
			headers: { Authorization: `Bearer ${token}` }
		};

		const updatedData = {
			username: data.username,
			name: data.name,
			faculty: data.faculty,
			event: data.event,
			year: data.year, // Include year in the update request
			ispublic: data.ispublic
		};

		try {
			await axios.put('http://localhost:8000/update-profile', updatedData, config);
			updateMessage = 'Changes saved.';
			await getProfile(); // Re-fetch profile data to ensure the fields stay updated
		} catch (err) {
			console.error(err.response?.data || err.message);
			updateMessage = 'Failed to save changes.';
		}
	};
</script>

<Nav active={3} />

<div class="flex justify-center">
	<div class="container w-2/3 bg-gray-50 mt-28 p-8 rounded-xl">
		<div class="flex justify-center">
			<div
				class="ml-4 text-white rounded-full -mt-24 w-48 h-48 bg-red flex items-center text-center"
			>
				<p class="text-9xl w-full text-center">{(data.name ? data.name : data.username).toUpperCase().charAt(0)}</p>
			</div>
		</div>
		<div class="w-full mt-4 grid grid-cols-2 gap-x-6 gap-y-6">
			<div >
				<label for="username" class="block mb-2 text-sm font-medium text-gray-900">Username</label>
				<input
					bind:value={data.username}
					type="text"
					name="username"
					id="username"
					class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
					placeholder="Enter your username"
				/>
				{#if errors.username}
					<p class="text-rose-600 text-sm mt-1">{errors.username}</p>
				{/if}
			</div>
			<div >
				<label for="name" class="block mb-2 text-sm font-medium text-gray-900">Name</label>
				<input
					bind:value={data.name}
					type="text"
					name="name"
					id="name"
					class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
					placeholder="Enter your name"
				/>
				{#if errors.name}
					<p class="text-rose-600 text-sm mt-1">{errors.name}</p>
				{/if}
			</div>
			<div>
				<label for="faculty" class="block mb-2 text-sm font-medium text-gray-900">What Faculty Are You In?</label>
				<select
					id="faculty"
					bind:value={data.faculty}
					class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
				>
					<option value="" disabled selected hidden>Choose a faculty</option>
					<option value="eng">Engineering</option>
					<option value="arts">Arts</option>
					<option value="sci">Science</option>
					<option value="edu">Education</option>
					<option value="artsci">Arts and Science</option>
					<option value="business">Business</option>
				</select>
			</div>
			<div>
				<label for="event" class="block mb-2 text-sm font-medium text-gray-900">What Type of Events Do You Prefer?</label>
				<select
					id="event"
					bind:value={data.event}
					class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
				>
					<option value="" disabled selected hidden>Choose an event type</option>
					<option value="social">Social</option>
					<option value="academic">Academic</option>
					<option value="sports">Sports</option>
					<option value="club">Club</option>
					<option value="professional">Professional</option>
				</select>
			</div>
			<div>
				<label for="year" class="block mb-2 text-sm font-medium text-gray-900">What Year Are You In?</label>
				<input
					id="year"
					bind:value={data.year}
					type="number"
					name="year"
					class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
					placeholder="Enter your year"
				/>
				{#if errors.year}
					<p class="text-rose-600 text-sm mt-1">{errors.year}</p>
				{/if}
			</div>
			<div>
				<label for="attendance" class="block mb-2 text-sm font-medium text-gray-900">Public Event Attendance</label>
				<div class="grid grid-cols-2">
					<div class="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700 mr-2">
						<input
							id="attendancey"
							type="radio"
							bind:group={data.ispublic}
							value={true}
							name="event-attendance"
							class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
						/>
						<label for="attendancey" class="w-full py-4 ms-2 text-sm font-medium text-gray-900">Show when I'm attending events</label>
					</div>
					<div class="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700 ml-2">
						<input
							id="attendancen"
							type="radio"
							bind:group={data.ispublic}
							value={false}
							name="event-attendance"
							class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
						/>
						<label for="attendancen" class="w-full py-4 ms-2 text-sm font-medium text-gray-900">Hide me from event attendance</label>
					</div>
				</div>
			</div>
		</div>
		<p class="mt-6 text-sm" class:hidden={!updateMessage} class:text-green-700={updateMessage=="Changes saved."} class:text-rose-800={updateMessage!="Changes saved."}>
				{updateMessage}
		</p>
		<div class="w-full text-end">
			<button on:click={update} type="submit" class="w-32 text-white bg-red hover:bg-rose-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-6 text-center">
				Update
			</button>
		</div>
	</div>
</div>
