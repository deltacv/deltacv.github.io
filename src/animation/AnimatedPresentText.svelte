<script>
    import { fade, fly } from 'svelte/transition';
</script>

<div in:fly="{{x: -50, delay: 2500, duration: 2300}}" out:fade="{{duration: 1200}}">
    <h1 style="color: #c9d1d9">deltacv</h1>
    <p in:fly="{{y: -50, delay: 2500, duration: 2500}}"style="color: #8b949e">Making computer vision approachable to everyone</p>
</div>

<style>
    h1, p {
        font-family: 'Segoe UI';
        margin: 0px;
        padding: 0px; 
    }

    p {
        margin-right: 0.5vmin;
        font-size: 5vmin;
    }

    h1 {
        margin-right: 0.5vmin;
        font-size: 3vmax;
    }
</style>