<script>
    export let value;
    export let label;
</script>

<div class="w-full flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700">
    <input
        id={label}
        type="checkbox"
        bind:checked={value}
        name="bordered-checkbox"
        class="accent-red w-4 h-4 text-red bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
    />
    <label
        for={label}
        class="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >{label}</label
    >
</div>