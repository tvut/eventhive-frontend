<script>
	import axios from 'axios';
    import { get } from "svelte/store";
	import { authToken } from '../../../stores/auth';

	const getProfile = async () => {
		let token = get(authToken)
		console.log(token)
		let config = {
			headers: { Authorization: `Bearer ${token}` }
		};

		axios
			.get('http://localhost:8000/profile', config)
			.then((response) => {
				console.log(response);
			})
			.catch((err) => console.log(err));
	};
</script>
{get(authToken)}
<button on:click={getProfile}>GetProfile</button>