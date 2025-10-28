<script>
    import AnimatedLogo from "./DeltaCVAnimatedLogo.svelte";
    import AnimatedPresentText from "./DeltaCVAnimatedText.svelte";
</script>

<div class="icon">
    <AnimatedLogo />
</div>

<div class="text">
    <AnimatedPresentText />
</div>

<style>
    /* In your parent component's <style> block */
    .icon {
        /* Let's try something more reasonable:
       MIN: 3.5rem (56px)
       PREFERRED: 10vw
       MAX: 7rem (112px)
    */
        width: clamp(3.5rem, 10vw, 7rem);

        aspect-ratio: 1 / 1;
        margin-right: 2em;
        margin-top: 0.5em;
    }

    .text {
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
