<script>
	import axios from 'axios';
	import { get } from 'svelte/store';
	import { goto } from '$app/navigation';
	import { authToken } from '../../../stores/auth';
	import { onMount } from 'svelte';
	import Nav from '../../../components/nav.svelte';
	import OrgCard from './org-card.svelte';

    let orgs;

    const getOrganizations = (id) => {
        axios.get("http://localhost:8000/organizations/").then((response) => {
            orgs = response.data
            orgs.sort((a, b) => a.name.localeCompare(b.name))
            console.log(orgs)
        }).catch((err) => {
			console.error('Error fetching RSVP status:', err);
		})
    }

	onMount(() => {
		if (!get(authToken)) {
			goto('/login');
		}
        getOrganizations()
	});
</script>

<Nav active={4} />

<div class="flex justify-center">
	<div class="container p-4 mt-4">
		<h1 class="text-4xl font-semibold text-gray-800 mb-8 mx-auto">Organizations</h1>
        <div class="grid grid-cols-4 gap-x-4 gap-y-4">
            {#each orgs as org}
            <OrgCard {org}/>
            {/each}
        </div>
    </div>
</div>
