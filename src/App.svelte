<script>
  	import AnimatedLogoText from './animation/AnimatedLogoText.svelte'
  	import { onMount } from 'svelte';

  	let ready = false;
  	onMount(() => setTimeout(() => ready = true, 500));
</script>

{#if ready}

<div class="header">
	<div class="logo">
		<AnimatedLogoText/>
	</div>
</div>

{/if}

<style>
	:global(body) {
		background-color: #000;
	}

	.header { 
		width: 100%;
		height: max(25vw, 25vh); 
		background-color: #0D1117;

		display: flex;
   		flex-direction: row;
   		flex-wrap: nowrap;
   		justify-content: center;
   		align-items: center;

		margin: 0 0 0 0;
	}

	.logo {
    	height: auto;
    	margin: 0 auto;
    	position: relative;
		
		display: flex;
   		justify-content: center;
	}
</style>