<script>
	import { goto } from '$app/navigation';
	import logo from '$lib/logo.png';
	import axios from 'axios';
	import { get } from 'svelte/store';
	import { onMount } from 'svelte';
	import { authToken } from '../stores/auth';

	export let active = 0;

	let username = '';

	const getProfile = async () => {
		let token = get(authToken);
		console.log(token);
		let config = {
			headers: { Authorization: `Bearer ${token}` }
		};

		axios
			.get('http://localhost:8000/profile', config)
			.then((response) => {
				username = response.data.username;
			})
			.catch((err) => console.log(err));
	};

	onMount(() => {
		getProfile();
	});
</script>

<nav class="bg-white border-gray-200 border-b-solid border-b-2 border-grey-100">
	<div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
		<a on:click={() => goto('/secure')} class="flex items-center space-x-3 rtl:space-x-reverse">
			<img src={logo} class="h-8" alt="Flowbite Logo" />
			<span class="self-center text-2xl font-semibold whitespace-nowrap">EventHive</span>
		</a>
		<div class="hidden w-full md:block md:w-auto" id="navbar-default">
			<ul
				class="font-medium flex items-center flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white"
			>
				<p
					on:click={() => {
						goto('/secure/');
					}}
					class:text-red={active == 1}
					class="cursor-pointer block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
				>
					Home
				</p>
				<li>
					<p
						on:click={() => {
							goto('/secure/calendar');
						}}
						class:text-red={active == 2}
						class="h-full cursor-pointer block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
					>
						Calendar
					</p>
				</li>
				<li>
					<div class="items-center flex flex-row">
						<div
							on:click={() => {
								goto('/secure/profile');
							}}
							class:text-red={active == 3}
							class="flex items-center flex-row cursor-pointer block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
						>
							<p>Profile</p>
							<div
								class="ml-4 text-white rounded-full w-8 h-8 bg-red flex items-center text-center"
							>
								<p class="w-full text-center">{username.toUpperCase().charAt(0)}</p>
							</div>
						</div>
						<button
							on:click={() => {
								authToken.set({});
								goto('/login');
							}}
							type="submit"
							class="h-8 text-white bg-red hover:bg-rose-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-xs px-3 py-2 ml-4 text-center"
							>Log Out</button
						>
					</div>
				</li>
			</ul>
		</div>
	</div>
</nav>
