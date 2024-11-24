<script>
	import { goto } from "$app/navigation";

    export let org;
</script>

<div
	class="cursor-pointer w-full flex items-center border border-gray-200 rounded dark:border-gray-700 p-4"
	on:click={() => {
		goto("/secure/organization/"+org.id);
	}}
>
	<div>
		<div class="w-full text-lg font-medium text-gray-900 dark:text-gray-300">
			{org.name}
		</div>
	</div>
</div>