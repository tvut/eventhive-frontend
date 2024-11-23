<script>
    import { authToken } from '../../../stores/auth';
	import { get } from 'svelte/store';
	import { goto } from '$app/navigation';
    import Nav from '../../../components/nav.svelte';
	import { onMount } from 'svelte';
	import Calendar from './calendar.svelte';

	onMount(() => {
		if (!get(authToken)) {
			goto('/login');
		}
	});
</script>

<Nav active={2}/>

<Calendar/>