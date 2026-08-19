<script lang="ts">
	import "../app.css"
	import { navigating } from '$app/stores';
	import { fade } from 'svelte/transition';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
	<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
	<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
	<link rel="manifest" href="/site.webmanifest">
</svelte:head>

{#if $navigating}
	<div class="global-loading-screen" in:fade={{ duration: 150, delay: 200 }} out:fade={{ duration: 300 }}>
		<div class="spinner"></div>
	</div>
{/if}

{@render children?.()}

<style>
	.global-loading-screen {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background-color: rgba(5, 7, 10, 0.7);
		backdrop-filter: blur(8px);
		-webkit-backdrop-filter: blur(8px);
		z-index: 9999;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.spinner {
		width: 48px;
		height: 48px;
		border: 3px solid rgba(88, 166, 255, 0.2);
		border-top-color: #58a6ff;
		border-radius: 50%;
		animation: spin 1s cubic-bezier(0.6, 0.2, 0.4, 0.8) infinite;
	}

	@keyframes spin {
		to { transform: rotate(360deg); }
	}
</style>
