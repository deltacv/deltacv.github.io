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
        /* Min: 1.1rem (17.6px), Preferred: 2.9vw, Max: 2.2rem (35.2px) */
        font-size: clamp(1.1rem, 2.9vw, 2.2rem);
        font-weight: 400;
    }

    h1 {
        margin-right: 1vmin;
        /* Min: 1.2rem (19.2px), Preferred: 2.8vw, Max: 2.5rem (40px) */
        font-size: clamp(1.2rem, 2.8vw, 2.5rem);
        font-weight: 800;
    }
</style>