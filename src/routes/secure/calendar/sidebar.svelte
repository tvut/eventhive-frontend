<script>
	import Checkbox from './checkbox.svelte';

	export let categories = [true, true, true, true, true];
	export let freeFood = false;
	export let freeEvent = false;
</script>

<div></div>
<div class="w-1/3 mt-5 p-4 pr-8 h-screen fixed">
	<div class="bg-white rounded-lg shadow bg-white p-2">
		<div class="m-4 space-y-4">
			<h1 class="text-2xl font-semibold text-gray-600 mt-2">Categories</h1>
			<Checkbox bind:value={categories[0]} label={'Social'} />
			<Checkbox bind:value={categories[1]} label={'Academic'} />
			<Checkbox bind:value={categories[2]} label={'Sports'} />
			<Checkbox bind:value={categories[3]} label={'Club'} />
			<Checkbox bind:value={categories[4]} label={'Professional'} />
		</div>
		<div class="m-4 space-y-4">
			<h1 class="text-2xl font-semibold text-gray-600 mt-2">Refine Your Search</h1>
			<div class="flex row-auto space-x-3">
				<Checkbox bind:value={freeFood} label={'Free Food'} />
				<Checkbox bind:value={freeEvent} label={'Free Event'} />
			</div>
		</div>
	</div>
</div>
