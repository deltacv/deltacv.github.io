<script lang="ts">
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";

    let countdown = $state(5);

    onMount(() => {
        const interval = setInterval(() => {
            countdown -= 1;
        }, 1000);

        setTimeout(() => {
            clearInterval(interval);
            goto("/visiongraph", { replaceState: true });
        }, 5000);

        return () => clearInterval(interval);
    });
</script>

<svelte:head>
    <title>PaperVision is now VisionGraph</title>
    <meta name="description" content="PaperVision has been officially renamed to VisionGraph. You will be redirected automatically to the new VisionGraph landing page." />
    <meta http-equiv="refresh" content="5; url=/visiongraph" />
    <link rel="canonical" href="https://deltacv.org/visiongraph" />
</svelte:head>

<div class="min-h-[80vh] flex items-center justify-center bg-[#05070a] text-gray-300">
    <div class="text-center p-8 max-w-lg">
        <h1 class="text-3xl font-bold text-white mb-4">PaperVision is now VisionGraph</h1>
        <p class="mb-4 leading-relaxed">The visual node editor previously known as PaperVision has been upgraded and rebranded to <strong class="text-amber-400">VisionGraph</strong>. You are being redirected to the new project page.</p>
        <p class="text-gray-400 text-sm mb-6 font-mono">Redirecting in {countdown}...</p>
        <a href="/visiongraph" class="inline-block px-6 py-2.5 bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors border border-gray-700">Go to VisionGraph now</a>
    </div>
</div>
