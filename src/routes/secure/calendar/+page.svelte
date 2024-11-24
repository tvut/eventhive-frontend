<script>
	import { authToken } from '../../../stores/auth';
	import { get } from 'svelte/store';
	import { goto } from '$app/navigation';
	import Nav from '../../../components/nav.svelte';
	import { onMount } from 'svelte';
	import Calendar from './calendar.svelte';
	import axios from 'axios';
	import Sidebar from './sidebar.svelte';

	let events;

	const getEventsBlob = async () => {
		axios
			.get('http://localhost:8000/groupedevents')
			.then((response) => {
				events = response.data['events_by_year'];
			})
			.catch((err) => console.log(err));
	};

	onMount(() => {
		if (!get(authToken)) {
			goto('/login');
		}
		getEventsBlob();
	});

	let categories = [true, true, true, true, true];
	let freeFood = false;
	let freeEvent = false;

</script>

<Nav active={2} />

<div class="grid grid-cols-3">
	<Sidebar bind:categories bind:freeEvent bind:freeFood />

	<Calendar {events} bind:freeFood bind:categories bind:freeEvent/>
</div>

