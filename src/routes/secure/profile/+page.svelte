<script>
	import axios from 'axios';
	import { authToken } from '../../../stores/auth';
	import { get } from 'svelte/store';
	import { goto } from '$app/navigation';
	import Nav from '../../../components/nav.svelte';
	import { onMount } from 'svelte';

	let username = '';
	let data;

	onMount(() => {
		if (!get(authToken)) {
			goto('/login');
		}
		getProfile();
	});

	const getProfile = async () => {
		let token = get(authToken);
		console.log(token);
		let config = {
			headers: { Authorization: `Bearer ${token}` }
		};

		axios
			.get('http://localhost:8000/profile', config)
			.then((response) => {
				username = response.data.username;
				data = response.data;
			})
			.catch((err) => console.log(err));
	};

	let updateMessage = ''

	const update = async () => {
		console.log("here")
		updateMessage = "Changes saved."
	}
</script>

<Nav active={3} />

<div class="flex justify-center">
	<div class="container w-2/3 bg-gray-50 mt-28 p-8 rounded-xl">
		<div class="flex justify-center">
			<div
				class="ml-4 text-white rounded-full -mt-24 w-48 h-48 bg-red flex items-center text-center"
			>
				<p class="text-9xl w-full text-center">{username.toUpperCase().charAt(0)}</p>
			</div>
		</div>
		{#if data}
			<div class="w-full mt-4 grid grid-cols-2 gap-x-6">
				<div class="mb-6">
					<label for="username" class="block mb-2 text-sm font-medium text-gray-900">Username</label
					>
					<input
						bind:value={data.username}
						type="text"
						name="username"
						id="username"
						class="cursor-not-allowed bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
						placeholder="@hackstreet"
						disabled
					/>
				</div>
				<div class="mb-6">
					<label for="name" class="block mb-2 text-sm font-medium text-gray-900">Name</label>
					<input
						bind:value={data.name}
						type="text"
						name="username"
						id="name"
						class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
						placeholder=""
					/>
				</div>
				<div>
					<label
						for="countries"
						class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
						>What Faculty Are You In?</label
					>
					<select
						id="countries"
						class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					>
						<option value="eng">Engineering</option>
						<option value="arts">Arts</option>
						<option value="sci">Science</option>
						<option value="edu">Education</option>
						<option value="artsci">Arts and Science</option>
						<option value="business">Business</option>
					</select>
				</div>
				<div>
					<label
						for="countries"
						class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
						>What Type of Events Do You Prefer?</label
					>
					<select
						id="countries"
						class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					>
						<option value="social">Social</option>
						<option value="academic">Academic</option>
						<option value="sports">Sports</option>
						<option value="club">Club</option>
						<option value="professional">Professional</option>
					</select>
				</div>
				<div>
					<label
						for="attendance"
						class="mt-6 block mb-2 text-sm font-medium text-gray-900 dark:text-white"
						>Public Event Attendance</label
					>
					<div class="grid grid-cols-2">
						<div
							class="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700 mr-2"
						>
							<input
								id="attendancey"
								type="radio"
								value=""
								name="bordered-radio"
								class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
							/>
							<label
								for="attendancey"
								class="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
								>Show when I'm attending events</label
							>
						</div>
						<div
							class="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700 ml-2"
						>
							<input
								checked
								id="attendancen"
								type="radio"
								value=""
								name="bordered-radio"
								class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
							/>
							<label
								for="attendancen"
								class="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
								>Hide me from event attendance</label
							>
						</div>
					</div>
				</div>
			</div>
		{/if}
		<p class="mt-6" class:hidden={!updateMessage} class:text-green-700={updateMessage=="Changes saved."} class:text-rose-800={updateMessage!="Changes saved."}>
		{updateMessage}
		</p>
		<div class="w-full text-end">
		<button on:click={update} type="submit" class="w-32 text-white bg-red hover:bg-rose-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-6 text-center">Update</button>
	</div>
	</div>
</div>
