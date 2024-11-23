<script>
	import { authToken } from "../../stores/auth";
    import { get } from "svelte/store";
    import { goto } from "$app/navigation";

    let token = get(authToken)
</script>
{token == null}

in secure

<a on:click={()=>{goto("secure/profile")}}>profile</a>