<script>
	import '@fortawesome/fontawesome-free/css/all.min.css';
	import axios from 'axios';
	import { get } from 'svelte/store';
	import { authToken } from '../../../stores/auth';
	import { onMount } from 'svelte';
	import PopupEvent from './popup-event.svelte';

	export let event;
    let isRSVPed = false;
	let popup = false;

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

	onMount(() => {
		checkRSVPStatus();
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
		<h3 class="text-xl">{getampm(event.start_date)}</h3>
		{#if event.location}
			<p class="font-small">{event.location}</p>
		{:else if event.link}
			<a class="font-small text-white-600 hover:underline" href={event.link}>{event.link.slice(0,70)}</a>
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

<PopupEvent {event} bind:popup/>