<script>
	import CalendarEvent from './calendar-event.svelte';

	export let events;
    export let categories;
    export let freeFood;
    export let freeEvent;

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

    $: {
        console.log(freeFood)
    }
</script>

{#key freeFood}
<div class="flex justify-center w-full">
	<div class="w-3/5 mt-4">
		{#if events}
			{#each Object.keys(events) as year}
				<h1 class="text-2xl font-semibold text-gray-600">{year}</h1>
				{#each Object.keys(events[year]) as month}
					<h2 class="text-3xl font-semibold text-gray-700 mt-2">{months[month - 1]}</h2>
					{#each Object.keys(events[year][month]) as day}
						<h3 class="text-4xl font-bold text-gray-800 my-4 border-b-2 border-gray-300">
							{day}
						</h3>
						{#each events[year][month][day] as event}
                        {#if (event.food || !freeFood) && (!freeEvent || event.cost ==0)}
							<CalendarEvent {event} />
                        {/if}
						{/each}
					{/each}
				{/each}
			{/each}
		{/if}
	</div>
</div>
{/key}
