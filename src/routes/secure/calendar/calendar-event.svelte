<script>
	import '@fortawesome/fontawesome-free/css/all.min.css';
	import axios from 'axios';
	import { get } from 'svelte/store';
	import { authToken } from '../../../stores/auth';
	import { onMount } from 'svelte';
	import '@fortawesome/fontawesome-free/css/all.min.css';
	import axios from 'axios';
	import { get } from 'svelte/store';
	import { authToken } from '../../../stores/auth';
	import { onMount } from 'svelte';

	export let event;

	let rsvpedUsers = [];
	let popup = false;
	let isRSVPed = false;
	let hoveredUserIndex = null; // Track which user is hovered over

	const timezoneOffset = new Date().getTimezoneOffset();
	const getAdjustedDate = (s) => {
		return new Date(new Date(s).getTime() - timezoneOffset * 60000);
	};

	const getBg = (s) => {
		if (s == 'Social') {
			return '#306B34';
		} else if (s == 'Academic') {
			return '#1C5253';
		} else if (s == 'Sports') {
			return '#C9D3A4';
		} else if (s == 'Club') {
			return '#C3EB78';
		} else if (s == 'Professional') {
			return '#B6174B';
		} else {
			return '#E83838';
		}
	};

	const getampm = (s) => {
		let d = getAdjustedDate(s);
		return (
			(d.getHours() > 12 ? d.getHours() - 12 : d.getHours()) +
			':' +
			d.getMinutes().toString().padStart(2, '0') +
			' ' +
			(d.getHours() >= 12 ? 'PM' : 'AM')
		);
	};

	const toggleRSVP = async () => {
		let token = get(authToken);
		let config = {
			headers: { Authorization: `Bearer ${token}` }
		};
	const toggleRSVP = async () => {
		let token = get(authToken);
		let config = {
			headers: { Authorization: `Bearer ${token}` }
		};

		try {
			if (isRSVPed) {
				await axios.delete(`http://localhost:8000/rsvp/${event.id}`, config);
				isRSVPed = false;
			} else {
				await axios.post(`http://localhost:8000/rsvp/${event.id}`, {}, config);
				isRSVPed = true;
			}
			await fetchRSVPedUsers(); // Refresh attendees
		} catch (err) {
			console.error('Error toggling RSVP:', err);
		}
	};

	const getEvent = async () => {
		let token = get(authToken);
		let config = {
			headers: { Authorization: `Bearer ${token}` }
		};

		try {
			const response = await axios.get(`http://localhost:8000/events/${event.id}`, config);
			event = response.data;
		} catch (err) {
			console.error('Error fetching event:', err);
		}
	};

	const checkRSVPStatus = async () => {
		let token = get(authToken);
		let config = {
			headers: { Authorization: `Bearer ${token}` }
		};

		try {
			const response = await axios.get(`http://localhost:8000/rsvp/`, config);
			const rsvpEvents = response.data || [];
			isRSVPed = rsvpEvents.some((e) => e.id === event.id);
		} catch (err) {
			console.error('Error fetching RSVP status:', err);
		}
	};
		try {
			const response = await axios.get(`http://localhost:8000/rsvp/`, config);
			const rsvpEvents = response.data || [];
			isRSVPed = rsvpEvents.some((e) => e.id === event.id);
		} catch (err) {
			console.error('Error fetching RSVP status:', err);
		}
	};

	onMount(() => {
		checkRSVPStatus();
		getEvent();
	});
</script>

<div
	on:click={() => {
		popup = !popup;
	}}
	style="background-color: {getBg(event.category)};"
	class="cursor-pointer text-white rounded-xl p-4 my-2 flex justify-between items-center"
>
	<div>
		<h4 class="text-2xl font-semibold">{event.name}</h4>
		<h3 class="text-xl">{getampm(event.start_date)} - {getampm(event.end_date)}</h3>
		{#if event.location}
			<p class="font-small">{event.location}</p>
		{:else}
			<a class="font-small text-white-600 hover:underline" href={event.link}>{event.link}</a>
		{/if}
	</div>
	<div class="flex items-center">
		<button
			on:click|stopPropagation={toggleRSVP}
			class="w-10 h-10 rounded-full"
			style="background-color: {getBg(event.category)}; display: flex; justify-content: center; align-items: center;"
		>
			<i
				class="fa-sharp fa-solid fa-heart text-2xl"
				style="color: {isRSVPed ? 'lightpink' : 'darkpink'};"
			></i>
		</button>
	</div>
</div>

{#if popup}
	<div
		on:click={() => {
			popup = !popup;
		}}
		class="cursor-pointer absolute top-0 left-0 z-50 bg-gray-200 bg-opacity-50 flex flex-col items-center justify-center h-screen w-screen"
	>
		<div class="cursor-default w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 h-3/4">
			<div class="p-6 space-y-3 sm:p-8">
				<h1 class="text-red font-bold leading-tight tracking-tight text-gray-900 text-2xl">
					{event.name}
				</h1>
				<div class="flex row-auto text-lg font-semibold leading-tight tracking-tight text-gray-900">
					<div class="w-8"><i class="mr-4 fa-regular fa-clock"></i></div>
					{getampm(event.start_date)} - {getampm(event.end_date)}
				</div>
				<div class="flex row-auto text-md font-semibold leading-tight tracking-tight text-gray-700">
					<div class="w-8"><i class="fa-regular fa-calendar mr-4"></i></div>
					{new Date(event.start_date).toDateString()}
				</div>
				<div class="flex row-auto text-md font-semibold leading-tight tracking-tight text-gray-700">
					<div class="w-8"><i class="mr-4 fa-solid fa-list"></i></div>
					{event.category}
				</div>
				<p class="text-md">{event.description}</p>

				<div>
					<h2 class="text-xl font-bold mt-4">Who is Attending</h2>
					<div class="relative flex mt-2">
						{#each event.attendees as user, index}
							<div
								class="-ml-2 text-white rounded-full w-8 h-8 flex items-center text-center"
								style="background-color: {index % 2 === 0 ? 'red' : 'lightpink'}"
								on:mouseenter={() => (hoveredUserIndex = index)}
								on:mouseleave={() => (hoveredUserIndex = null)}
							>
								<p class="w-full text-center">
									{(user.name ? user.name : user.username).toUpperCase().charAt(0)}
								</p>
							</div>
							{#if hoveredUserIndex === index}
								<div
									class="absolute -bottom-6 left-0 transform translate-x-{index * 2} text-sm text-gray-600"
									style="white-space: nowrap;"
								>
									{user.name ? user.name : user.username}
								</div>
							{/if}
						{/each}
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}
