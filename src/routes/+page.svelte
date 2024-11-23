<script>
	import { goto } from '$app/navigation';
	import logo from '$lib/logo.png';
	import phone from '$lib/phonemockup.png';
</script>

<section class="bg-gray-50">
	<div class="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0 overflow-hidden">
		<a href="/" class="flex items-center mb-6 text-4xl font-semibold text-gray-900">
			<img class="w-16 h-16 mr-2" src={logo} alt="logo" />
			EventHive
		</a>
		<div class="container mt-16 mb-16">
			<div class="grid md:grid-cols-2">
				<div class="w-full md:pl-32">
					<h1 class="text-4xl text-left font-bold">Find out what's happening on campus.</h1>
					<h2 class="text-3xl pt-6 text-left font-semibold">Powered by <span class="text-red">AI.</span></h2>
					<h3 class="text-lg pt-6">
						EventHive will let you see every event happening from every club and organization on
						campus, at any given time.
					</h3>
					<h3 class="text-lg pt-8">It's as easy as signing up for what you want to do.</h3>
                    <button on:click={()=>{goto('/login')}} type="submit" class="w-32 text-white bg-red hover:bg-rose-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-6 text-center">Sign in</button>
				</div>
				<div class="w-full relative p-8">
					<img alt="sample calendar" class="animate-up absolute w-4/5 -mt-12 md:-mt-24" src={phone} />
				</div>
			</div>
		</div>
		<div class="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0"></div>
	</div>
</section>
