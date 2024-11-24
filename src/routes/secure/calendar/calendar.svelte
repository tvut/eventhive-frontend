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

    $: {
        console.log(freeFood)
    }
</script>

{#key freeFood}
<div class="flex justify-center w-full">
	<div class="w-3/5 mt-4">
		{#if events && Object.keys(events).length>0}
			{#if personal}
				<h1 class="text-4xl font-semibold text-gray-800 mb-8">Your Upcoming Events</h1>
			{/if}
			{#each Object.keys(events) as year}
				<h1 class="text-2xl font-semibold text-gray-600">{year}</h1>
				{#each Object.keys(events[year]) as month}
					<h2 class="text-3xl font-semibold text-gray-700">{months[month - 1]}</h2>
					{#each Object.keys(events[year][month]) as day}
						<h3 class="text-4xl font-bold text-gray-800 mb-4 border-b-2 border-gray-300">
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
		{:else if personal}
			<h1 class="text-4xl font-semibold text-gray-800 mt-8 mb-8 text-center">Looks like you have no events!</h1>
		{/if}
	</div>
</div>
{/key}