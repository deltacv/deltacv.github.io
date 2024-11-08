<script>
    import { fade, fly } from 'svelte/transition';
</script>

<div in:fly="{{x: -50, delay: 1000, duration: 2300}}" out:fade="{{duration: 1200}}">
    <h1 style="color: #c9d1d9">deltacv</h1>
    <p in:fly="{{y: -50, delay: 1200, duration: 2500}}"style="color: #8b949e">Making computer vision approachable to everyone.</p>
</div>

<style>
    h1, p {
        font-family: "Noto Sans", sans-serif;
        margin: 0px;
        padding: 0px; 
    }

    p {
        margin-right: 1vmin;
        font-size: 5vmin;
    }

    h1 {
        margin-right: 1vmin;
        font-size: 3vmax;
    }
</style>