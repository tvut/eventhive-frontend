<script>
	import { goto } from "$app/navigation";

    export let org;
</script>

<div
	class="text-gray-900 hover:text-red cursor-pointer shadow w-full flex items-center border border-gray-200 rounded hover:border-red dark:border-gray-700 p-4"
	on:click={() => {
		goto("/secure/organization/"+org.id);
	}}
>
	<div>
		<div class="w-full text-lg font-medium">
			{org.name}
		</div>
	</div>
</div>