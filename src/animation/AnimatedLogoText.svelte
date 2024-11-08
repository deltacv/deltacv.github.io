<script>
    import AnimatedLogo from './AnimatedLogo.svelte'
    import AnimatedPresentText from './AnimatedPresentText.svelte'
</script>

<div class="icon">
    <AnimatedLogo/>
</div>

<div class="text">
    <AnimatedPresentText/>
</div>

<style>
    .icon {
        width: max(6vw, 20vh);
        margin-right: 2em;
        margin-top: 0.5em;
    }

    .text {
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>