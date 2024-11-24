<script>
	import '@fortawesome/fontawesome-free/css/all.min.css';
	import axios from 'axios';
	import { get } from 'svelte/store';
	import { authToken } from '../../../stores/auth';
	import { onMount } from 'svelte';
	import PopupEvent from './popup-event.svelte';

	export let toggleRefresh = false;

	export let event;
    let isRSVPed = false;
	let popup = false;

	const timezoneOffset = new Date().getTimezoneOffset();
	const getAdjustedDate = (s) => {
		return new Date(new Date(s).getTime() - timezoneOffset * 60000);
	};

	const getBg = (s) => {
		if (s == 'Social') {
			return '#624cab';
		} else if (s == 'Academic') {
			return '#08b2e3';
		} else if (s == 'Sports') {
			return '#640D14';
		} else if (s == 'Club') {
			return '#FE7F2D';
		} else if (s == 'Professional') {
			return '#094074';
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
				toggleRefresh = true;
			} else {
				await axios.post(`http://localhost:8000/rsvp/${event.id}`, {}, config);
				isRSVPed = true;
			}
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
	class="shadow cursor-pointer text-white rounded-xl p-4 my-3 flex justify-between items-center"
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
			class:bg-white={isRSVPed}
			style="display: flex; justify-content: center; align-items: center;"
		>
			<i
				class="fa-sharp fa-solid fa-heart text-2xl"
				class:hover:text-gray-500={isRSVPed}
				class:hover:text-red={!isRSVPed}
				class:text-red={isRSVPed}
			></i>
		</button>
	</div>
</div>

<PopupEvent {event} bind:popup/>
