<script>
	import axios from 'axios';
	import { authToken } from '../../stores/auth';
	import { goto } from '$app/navigation';
	import logo from "$lib/logo.png"
	import { page } from '$app/stores';

	let username = '';
	let password = '';
	let errorMessage = decodeURIComponent($page.url.searchParams.get('m') || '');
	let isGreen = !!errorMessage

	let config = { 'Content-Type': 'application/x-www-form-urlencoded' };

	const login = async () => {
		axios
			.post('http://localhost:8000/login', new URLSearchParams({ username, password }), config)
			.then((response) => {
				authToken.set(response.data.access_token);
				goto('/secure')
			})
			.catch((err) => {
				if(err.status == 401) {
                    errorMessage = "Incorrect username or password."
					isGreen = false
                } else {
                    console.log(err)
                }
			});
	};
</script>
<section class="bg-gray-50">
	<div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
		<a href="/" class="flex items-center mb-6 text-2xl font-semibold text-gray-900">
			<img class="w-8 h-8 mr-2" src={logo} alt="logo">
			EventHive    
		</a>
		<div class="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
			<div class="p-6 space-y-4 md:space-y-6 sm:p-8">
				<h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
					Sign in to your account
				</h1>
				<form on:submit|preventDefault={login} class="space-y-4 md:space-y-6" action="#">
					<div>
						<label for="username" class="block mb-2 text-sm font-medium text-gray-900">Your username</label>
						<input bind:value={username} type="text" name="username" id="username" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="@hackstreet" required>
					</div>
					<div>
						<label for="password" class="block mb-2 text-sm font-medium text-gray-900">Password</label>
						<input bind:value={password} type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required>
					</div>
					{#if errorMessage}
					<p class="text-sm mt-0" class:text-green-600={isGreen} class:text-red={!isGreen}>{errorMessage}</p>
					{/if}
					<button type="submit" class="w-full text-white bg-red hover:bg-rose-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Sign in</button>
					<p class="text-sm font-light text-gray-500">
						Don’t have an account yet? <a href="/register" class="font-medium text-primary-600 hover:underline">Sign up</a>
					</p>
				</form>
			</div>
		</div>
	</div>
  </section>
