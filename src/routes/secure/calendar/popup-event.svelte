<script>
	import { onMount } from "svelte";
    import axios from 'axios';
	import { goto } from "$app/navigation";

	export let event;
	export let popup = false;

	let rsvpedUsers = [];
	let hoveredUserIndex = null; // Track which user is hovered over

	const timezoneOffset = new Date().getTimezoneOffset();
	const getAdjustedDate = (s) => {
		return new Date(new Date(s).getTime() - timezoneOffset * 60000);
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

    let host;

    const getHost = (id) => {
        axios.get("http://localhost:8000/organizations/"+id).then((response) => {
            host = response.data
        }).catch((err) => {
			console.error('Error fetching RSVP status:', err);
		})
    }

	const getEvent = async () => {
		try {
			const response = await axios.get(`http://localhost:8000/events/${event.id}`);
			event = response.data;
		} catch (err) {
			console.error('Error fetching event:', err);
		}
	};

    onMount(() => {
		getEvent()
        getHost(event.host_id)
    })
</script>

{#if popup}
	<div
		on:click={() => {
			popup = !popup;
		}}
		class="cursor-pointer fixed top-0 left-0 z-50 bg-gray-200 bg-opacity-50 flex flex-col items-center justify-center h-screen w-screen"
	>
		<div class="w-1/2 cursor-default bg-white rounded-lg shadow md:mt-0 xl:p-0 h-4/5">
			<div class="p-6 space-y-3 sm:p-8">
				<h1 class="-mt-2 text-red font-bold leading-tight tracking-tight text-gray-900 text-2xl">
					{event.name}
				</h1>
                {#if host}
                <h1 on:click={()=>{goto("/secure/organization/"+host.id)}} class="cursor-pointer font-bold leading-tight tracking-tight text-gray-900 text-xl">
					{host.name}
				</h1>
                {/if}
				<div class="flex row-auto text-lg font-semibold leading-tight tracking-tight text-gray-900">
					<div class="w-8"><i class="mr-4 fa-regular fa-clock"></i></div>
					{getampm(event.start_date)}
				</div>
				<div class="flex row-auto text-md font-semibold leading-tight tracking-tight text-gray-700">
					<div class="w-8"><i class="fa-regular fa-calendar mr-4"></i></div>
					{new Date(event.start_date).toDateString()}
				</div>
				<div class="flex row-auto text-md font-semibold leading-tight tracking-tight text-gray-700">
					<div class="w-8"><i class="mr-4 fa-solid fa-list"></i></div>
					{event.category}
				</div>
				{#if event.location}
					<div
						class="flex row-auto text-md font-semibold leading-tight tracking-tight text-gray-700"
					>
						<div class="w-8"><i class="mr-4 fa-solid fa-map"></i></div>
						{event.location}
					</div>
				{/if}
				{#if event.link}
					<div
						class="flex row-auto text-md font-semibold leading-tight tracking-tight text-gray-700"
					>
						<a class="flex row-auto block" href={event.link}
							><div class="w-8"><i class="mr-4 fa-solid fa-link"></i></div>
							{event.link}</a
						>
					</div>
					{#if event.cost}
					<div
						class="text-md font-semibold leading-tight tracking-tight text-gray-700 flex row-auto"
					>
						<div class="w-8"><i class="fa-solid fa-dollar-sign"></i></div>
						{event.cost == 0 ? 'Free' : '$' + event.cost}
					</div>
					{/if}
				{/if}
				{#if event.food}
					<div
						class="flex row-auto text-md font-semibold leading-tight tracking-tight text-gray-700"
					>
						<div class="w-8"><i class="mr-4 fa-solid fa-bowl-food"></i></div>
						Free Food!
					</div>
				{/if}
				<p class="text-md">{event.description}</p>

				<div>
					{#if event.attendees && event.attendees.length > 0}
						<h2 class="text-xl font-bold mt-4">Who's Attending?</h2>
						<div class="relative flex mt-2">
							<div class="pl-2 flex row-auto">
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
											class="absolute -bottom-10 transform text-sm text-white bg-red p-1.5 -ml-1 rounded-full"
											style="white-space: nowrap; left:{hoveredUserIndex * 26-8}px"
										>
											{user.name ? user.name : user.username}
										</div>
									{/if}
								{/each}
							</div>
						</div>
					{/if}
				</div>
			</div>
		</div>
	</div>
{/if}
