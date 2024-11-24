<script>
	import axios from 'axios';
	import { get } from 'svelte/store';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { authToken } from '../../../../stores/auth';
	import { onMount } from 'svelte';
	import Nav from '../../../../components/nav.svelte';
	import EventCard from './event-card.svelte';

	let club;

	const getClub = async () => {
		let token = get(authToken);
		let config = {
			headers: { Authorization: `Bearer ${token}` }
		};

		try {
			const response = await axios.get(
				'http://localhost:8000/organizations/' + $page.params.slug,
				config
			);
			club = response.data;
		} catch (err) {
			console.error(err);
		}
	};

	onMount(() => {
		if (!get(authToken)) {
			goto('/login');
		}
		getClub();
	});
</script>

<Nav active={2} />
{#if club}
	<div class="mt-6 flex justify-center">
		<div class="container w-2/3 bg-white p-8 rounded-xl space-y-4">
			<p
	on:click={() => {
		history.back();
	}}
	class="cursor-pointer hover:text-red"
>
	<i class="fa-solid fa-backward mr-1"></i> Go Back
</p>
			<h1 class="text-red font-bold leading-tight tracking-tight text-gray-900 text-3xl">
				{club.name}
			</h1>
			<p class="text-xl">
				{club.description}
			</p>
			<div class="grid-cols-2 grid gap-x-4 gap-y-4">
				{#if club.location}
					<div
						class="w-full flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700"
					>
						<i class="w-8 text-xl fa-solid fa-map"></i>
						<p class="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
							{club.location}
						</p>
					</div>
				{/if}
				{#if club.faculty}
					<div
						class="w-full flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700"
					>
						<i class="w-8 text-xl fa-solid fa-school"></i>
						<p class="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
							{club.faculty}
						</p>
					</div>
				{/if}
				{#if club.instagram}
					<div
						class="w-full flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700"
					>
						<a
							href={'https://www.instagram.com/' + club.instagram}
							class="block flex row-auto items-center"
						>
							<i class="w-8 fa-brands fa-instagram text-xl"></i>
							<p class=" w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
								{club.instagram}
							</p>
						</a>
					</div>
				{/if}
				{#if club.facebook}
					<div
						class="w-full flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700"
					>
						<a
							href={'https://www.facebook.com/' + club.facebook}
							class="block flex row-auto items-center"
						>
							<i class="w-8 fa-brands fa-facebook text-xl"></i>
							<p class=" w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
								{club.facebook}
							</p>
						</a>
					</div>
				{/if}
				{#if club.website}
					<div
						class="w-full flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700"
					>
						<a href={club.website} class="block flex row-auto items-center">
							<i class="w-8 fa-solid fa-link text-xl"></i>
							<p class=" w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
								{club.website}
							</p>
						</a>
					</div>
				{/if}
				{#if club.email}
					<div
						class="w-full flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700"
					>
						<a href={'mailto:' + club.email} class="block flex row-auto items-center">
							<i class="w-8 fa-solid fa-envelope text-xl"></i>
							<p class=" w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
								{club.email}
							</p>
						</a>
					</div>
				{/if}
			</div>
			{#if club.events.length > 0}
				<h1 class="font-bold leading-tight tracking-tight text-gray-900 text-2xl">
					Upcoming Events
				</h1>
				{#each club.events as event}
					<div class="grid-cols-2 grid gap-x-4 gap-y-4">
						<EventCard {event} />
					</div>
				{/each}
			{/if}
		</div>
	</div>
{/if}
