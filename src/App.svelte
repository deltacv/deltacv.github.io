<script>
  	import AnimatedLogoText from './animation/AnimatedLogoText.svelte'
  	import { onMount } from 'svelte';

  	let ready = false;
  	onMount(() => setTimeout(() => ready = true, 500));
</script>

{#if ready}

<AnimatedLogoText/>

{/if}

<style>
	:global(body) {
		background-color: #000;
	}
</style>