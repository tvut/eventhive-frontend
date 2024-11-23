<script>
    import '@fortawesome/fontawesome-free/css/all.min.css';
    export let event;

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

    let popup = false
</script>

<div on:click={()=>{popup = !popup}} style="background-color: {getBg(event.category)};" class="cursor-pointer text-white rounded-xl p-4 my-2">
    <h4 class="text-2xl font-semibold">{event.name}</h4>
    <h3 class="text-xl">{getampm(event.start_date)} - {getampm(event.end_date)}</h3>
    {#if event.location}
        <p class="font-small">{event.location}</p>
    {:else}
        <a class="font-small text-white-600 hover:underline" href={event.link}>{event.link}</a>
    {/if}
</div>

{#if popup}
<div on:click={()=>{popup = !popup}} class="cursor-pointer absolute top-0 left-0 z-50 bg-gray-200 bg-opacity-50 flex flex-col items-center justify-center h-screen w-screen">
    <div class="cursor-default w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 h-3/4">
        <div class="p-6 space-y-3 sm:p-8">
            <h1 class="text-red font-bold leading-tight tracking-tight text-gray-900 text-2xl">
                {event.name}
            </h1>
            <div class="flex row-auto text-lg font-semibold leading-tight tracking-tight text-gray-900">
                <div class="w-8"><i class="mr-4 fa-regular fa-clock"></i></div>{getampm(event.start_date)} - {getampm(event.end_date)}
            </div>
            <div class="flex row-auto text-md font-semibold leading-tight tracking-tight text-gray-700">
                <div class="w-8"><i class="fa-regular fa-calendar mr-4"></i></div>{(new Date(event.start_date)).toDateString()}
            </div>
            <div class="flex row-auto text-md font-semibold leading-tight tracking-tight text-gray-700">
                <div class="w-8"><i class="mr-4 fa-solid fa-list"></i></div>{event.category}
            </div>
            {#if event.location}
            <div class="flex row-auto text-md font-semibold leading-tight tracking-tight text-gray-700">
                <div class="w-8"><i class="mr-4 fa-solid fa-map"></i></div>{event.location}
            </div>
            {/if}
            {#if event.link}
            <div class="flex row-auto text-md font-semibold leading-tight tracking-tight text-gray-700">
                <a class="flex row-auto block" href={event.link}><div class="w-8"><i class="mr-4 fa-solid fa-link"></i></div>{event.link}</a>
            </div>
            <div class="text-md font-semibold leading-tight tracking-tight text-gray-700 flex row-auto">
                <div class="w-8"><i class="fa-solid fa-dollar-sign"></i></div>{event.cost== 0 ? "Free" : "$"+event.cost}
            </div>
            {/if}
            {#if event.food}
            <div class="flex row-auto text-md font-semibold leading-tight tracking-tight text-gray-700">
                <div class="w-8"><i class="mr-4 fa-solid fa-bowl-food"></i></div>Free Food!
            </div>
            {/if}
            <p class="text-md">{event.description}</p>
        </div>
    </div>
</div>
{/if}

