<script>
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

    const getHost = (id) => {
        let token = get(authToken);
		let config = {
			headers: { Authorization: `Bearer ${token}` }
		};

		try {
			const response = await axios.get("http://localhost:8000/organizations/"+id, config);
			const rsvpEvents = response.data || [];
			isRSVPed = rsvpEvents.some((e) => e.id === event.id);
		} catch (err) {
			console.error('Error fetching RSVP status:', err);
		}
    }
</script>

{#if popup}
	<div
		on:click={() => {
			popup = !popup;
		}}
		class="cursor-pointer absolute top-0 left-0 z-50 bg-gray-200 bg-opacity-50 flex flex-col items-center justify-center h-screen w-screen"
	>
		<div class="cursor-default w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 h-3/4">
			<div class="p-6 space-y-3 sm:p-8">
				<h1 class="text-red font-bold leading-tight tracking-tight text-gray-900 text-2xl">
					{event.name}
				</h1>
				<div class="flex row-auto text-lg font-semibold leading-tight tracking-tight text-gray-900">
					<div class="w-8"><i class="mr-4 fa-regular fa-clock"></i></div>
					{getampm(event.start_date)} - {getampm(event.end_date)}
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
					<div
						class="text-md font-semibold leading-tight tracking-tight text-gray-700 flex row-auto"
					>
						<div class="w-8"><i class="fa-solid fa-dollar-sign"></i></div>
						{event.cost == 0 ? 'Free' : '$' + event.cost}
					</div>
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
					{#if event.attendees.length > 0}
						<h2 class="text-xl font-bold mt-4">Who's Attending?</h2>
						<div class="relative flex mt-2">
							<div class="pl-2">
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
											class="absolute -bottom-6 left-0 transform translate-x-{index *
												2} text-sm text-gray-600"
											style="white-space: nowrap;"
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
