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

	const filterNestedMap = (map, filterFunction) => {
		return new Map(
			Array.from(map)
				.map(([key, value]) => {
					if (value instanceof Map) {
						// Recursively filter nested Maps
						value = filterNestedMap(value, filterFunction);
					} else if (Array.isArray(value)) {
						// Filter arrays if present
						value = value.filter(filterFunction);
					}
					return [key, value];
				})
				.filter(([_, value]) => {
					// Exclude empty Maps or arrays
					if (value instanceof Map) return value.size > 0;
					if (Array.isArray(value)) return value.length > 0;
					return true;
				})
		);
	};

	$: cats = [
		categories[0] ? 'Social' : '',
		categories[1] ? 'Academic' : '',
		categories[2] ? 'Sports' : '',
		categories[3] ? 'Club' : '',
		categories[4] ? 'Professional' : ''
	];
</script>

{#key freeFood}
	<div class="col-span-2 pt-5 pr-16">
		{#if events && Object.keys(events).length > 0}
			{#if personal}
				<h1 class="text-4xl font-semibold text-gray-800 mb-4">Your Upcoming Events</h1>
			{/if}
			{#each Object.keys(events) as year}
				<h1 class="mt-4 text-2xl font-semibold text-gray-600">{year}</h1>
				{#each Object.keys(events[year]) as month}
					<h2 class="text-3xl font-semibold text-gray-700 -mb-4">{months[month - 1]}</h2>
					{#each Object.keys(events[year][month]) as day}
						<h3 class="text-4xl font-bold text-gray-800 mt-4 mb-4 border-b-2 border-gray-300">
							{day}
						</h3>
						{#each events[year][month][day] as event}
							{#if (event.food || !freeFood) && (!freeEvent || event.cost == 0) && cats.includes(event.category)}
								<CalendarEvent {event} />
							{/if}
						{/each}
					{/each}
				{/each}
			{/each}
		{:else if personal}
			<h1 class="text-4xl font-semibold text-gray-800 mt-8 mb-8 text-center">
				Looks like you have no events!
			</h1>
		{/if}
	</div>
{/key}
