<script>
	import PopupEvent from "../../calendar/popup-event.svelte";
	export let event;
	let popup = false;

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
</script>

<div
	class="cursor-pointer w-full flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700 p-4"
	on:click={() => {
		popup = !popup;
	}}
>
	<div>
		<div class="w-full text-md font-medium text-gray-900 dark:text-gray-300">
			{event.name}
		</div>
		<div class="w-full text-sm font-medium text-gray-900 dark:text-gray-300">
			{new Date(event.start_date).toDateString()}, {getampm(event.start_date)}
		</div>
		<div class="w-full text-sm font-medium text-gray-900 dark:text-gray-300">
			{event.location}
		</div>
	</div>
</div>

<PopupEvent {event} bind:popup />
