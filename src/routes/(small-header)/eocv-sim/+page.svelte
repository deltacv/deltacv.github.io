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
            goto("/visionbench", { replaceState: true });
        }, 5000);

        return () => clearInterval(interval);
    });
</script>

<svelte:head>
    <title>EOCV-Sim is now VisionBench</title>
    <meta name="description" content="EOCV-Sim has been officially renamed to VisionBench. You will be redirected automatically to the new VisionBench landing page." />
    <meta http-equiv="refresh" content="5; url=/visionbench" />
    <link rel="canonical" href="https://deltacv.org/visionbench" />
</svelte:head>

<div class="min-h-[80vh] flex items-center justify-center bg-[#05070a] text-gray-300">
    <div class="text-center p-8 max-w-lg">
        <h1 class="text-3xl font-bold text-white mb-4">EOCV-Sim is now VisionBench</h1>
        <p class="mb-4 leading-relaxed">The desktop simulator previously known as EOCV-Sim has been upgraded and rebranded to <strong class="text-cyan-400">VisionBench</strong>. You are being redirected to the new project page.</p>
        <p class="text-gray-400 text-sm mb-6 font-mono">Redirecting in {countdown}...</p>
        <a href="/visionbench" class="inline-block px-6 py-2.5 bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors border border-gray-700">Go to VisionBench now</a>
    </div>
</div>
