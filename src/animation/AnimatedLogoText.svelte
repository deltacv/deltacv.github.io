<script>
    import { quintOut } from 'svelte/easing';
    import { draw, fade } from 'svelte/transition';
    import { reverseFly } from './transitions'

    import AnimatedLogo from './AnimatedLogo.svelte'
    import AnimatedPresentText from './AnimatedPresentText.svelte'
</script>

<div class="parent">
    <div class="icon" in:reverseFly="{{delay: 2000, duration: 1400, startX: 180}}">
        <AnimatedLogo/>
    </div>
    <div class="text">
        <AnimatedPresentText/>
    </div>
</div>

<style>
    .icon {
        width: 3.5em;
        height: 3.5em;
        margin-right: 1em;
        margin-top: 0.5em;
    }

    .parent {
        display: flex;
        align-content: flex-start;
    }
</style>