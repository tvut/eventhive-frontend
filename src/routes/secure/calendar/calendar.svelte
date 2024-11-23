<script>
	import axios from 'axios';
	import { onMount } from 'svelte';

	let events;
    const timezoneOffset = new Date().getTimezoneOffset();
    const getAdjustedDate = (s) => {
        return new Date((new Date(s)).getTime() - timezoneOffset * 60000)
    }

    const getBg = (s) => {
        if(s == "Social") {
            return "#306B34"
        } else if (s == "Academic") {
            return "#1C5253"
        } else if (s == "Sports") {
            return "#C9D3A4"
        } else if (s == "Club") {
            return "#C3EB78"
        } else if (s == "Professional") {
            return "#B6174B"
        } else {
            return "#E83838"
        }
    }

    const getampm = (s) => {
        let d = getAdjustedDate(s)
        return (d.getHours() > 12 ? d.getHours() - 12 : d.getHours())  + ":" +d.getMinutes().toString().padStart(2, '0') + " " + (d.getHours() >= 12 ? "PM"  : "AM")
    }

	const getEventsBlob = async () => {
		axios
			.get('http://localhost:8000/groupedevents')
			.then((response) => {
				events = response.data['events_by_year'];
			})
			.catch((err) => console.log(err));
	};

    const months = [ "January", "February", "March", "April", "May", "June", 
           "July", "August", "September", "October", "November", "December" ];

	onMount(() => {
		getEventsBlob();
	});
</script>

<div class="w-full flex flex-col items-center justify-center ">
<div class="container flex flex-col items-center justify-center ">
    <div class="w-1/2">
	{#if events}
		{#each Object.keys(events) as year}
			<h1 class="text-2xl font-semibold text-gray-600 mt-2">{year}</h1>
			{#each Object.keys(events[year]) as month}
				<h2 class="text-3xl font-semibold text-gray-700 mt-2">{months[month-1]}</h2>
				{#each Object.keys(events[year][month]) as day}
					<h3 class="text-4xl font-bold text-gray-800 my-4 border-b-2 border-gray-300">{day}</h3>
					{#each events[year][month][day] as event}
                        <div style="background-color: {getBg(event.category)};" class="text-white rounded-xl p-4 my-2">
                            <h4 class="text-2xl font-semibold">{event.name}</h4>
                            <h3 class="text-xl">{getampm(event.start_date)} - {getampm(event.end_date)}</h3>
                            {#if event.location}
                                <p class="font-small">{event.location}</p>
                            {:else}
                                <a class="font-small text-white-600 hover:underline" href={event.link}>{event.link}</a>
                            {/if}
                        </div>
					{/each}
				{/each}
			{/each}
		{/each}
	{/if}
</div>
</div>
</div>