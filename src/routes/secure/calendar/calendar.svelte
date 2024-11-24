<script>
	import CalendarEvent from './calendar-event.svelte';

	export let personal = false;

	export let events;
	export let categories = [true, true, true, true, true];
	export let freeFood = false;
	export let freeEvent = false;

	const months = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	];

	$: cats = [
		categories[0] ? 'Social' : '',
		categories[1] ? 'Academic' : '',
		categories[2] ? 'Sports' : '',
		categories[3] ? 'Club' : '',
		categories[4] ? 'Professional' : ''
	];

	export let toggleRefresh = false;
</script>

{#key freeFood}
	<div class="col-span-2 pt-5 mr-8">
		{#if events && Object.keys(events).length > 0}
			{#if personal}
				<h1 class="text-4xl font-semibold text-gray-800 mb-4 mt-6">Your Upcoming Events</h1>
			{/if}
			<div class:px-12={personal} class:py-6={personal} class:mt-8={personal} class:-mb-4={personal} class:bg-white={personal} class:rounded-3xl={personal} class:shadow={personal}>
				{#each Object.keys(events) as year}
					<h1 class="mt-4 text-2xl font-semibold text-gray-600 -mb-4">{year}</h1>
					{#each Object.keys(events[year]) as month}
						<h2 class="text-3xl font-semibold text-gray-700 mt-4 -mb-4">{months[month - 1]}</h2>
						{#each Object.keys(events[year][month]) as day}
							<h3 class="text-4xl font-bold text-gray-800 mt-4 mb-4 border-b-2 border-gray-300">
								{day}
							</h3>
							{#each events[year][month][day] as event}
								{#if (event.food || !freeFood) && (!freeEvent || event.cost == 0) && cats.includes(event.category)}
									<CalendarEvent {event} bind:toggleRefresh />
								{/if}
							{/each}
						{/each}
					{/each}
				{/each}
			</div>
		{:else if personal}
			<h1 class="text-4xl font-semibold text-gray-800 mt-8 mb-8 text-center">
				Looks like you have no events!
			</h1>
		{/if}
	</div>
{/key}
