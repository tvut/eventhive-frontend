<script>
	import { authToken } from '../../stores/auth';
	import { get } from 'svelte/store';
	import axios from 'axios';
	import { goto } from '$app/navigation';
	import Nav from '../../components/nav.svelte';
	import { onMount } from 'svelte';
	import Calendar from './calendar/calendar.svelte';

	let events;

	const getEventsBlob = async () => {
		let token = get(authToken);
		console.log(token);
		let config = {
			headers: { Authorization: `Bearer ${token}` }
		};
		axios
			.get('http://localhost:8000/rsvpgrouped', config)
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

	let toggleRefresh = false;

	$:{
		if(toggleRefresh) {
			events=[]
			getEventsBlob()
			toggleRefresh = false
		}
	}
</script>

<Nav active={1} />
<div class="flex justify-center">
	<div class="w-2/3">
		<div class="ml-8">
			<Calendar {events} bind:toggleRefresh personal/>
		</div>
	</div>
</div>
