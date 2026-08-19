<script>
    import { fade, fly } from "svelte/transition";
</script>

<div
    class="logo-text"
    in:fly={{ x: -50, delay: 1000, duration: 2300 }}
    out:fade={{ duration: 1200 }}
>
    <h1>deltacv</h1>
    <div class="p-wrapper" in:fly={{ y: -50, delay: 1200, duration: 2500 }}>
        <p>
            Making&nbsp;computer&nbsp;vision approachable&nbsp;to&nbsp;everyone.
        </p>
    </div>
</div>

<style>
    .logo-text {
        display: inline-flex;
        flex-direction: column;
        align-items: flex-start;
        text-align: left;
        max-width: 90%;
        margin-left: 2vw;
    }

    h1,
    p {
        font-family: "Noto Sans", sans-serif;
        margin: 0;
        padding: 0;
        color: #c9d1d9;
        transition: transform 0.1s ease-out; /* Match spring responsiveness */
    }

    h1 {
        font-size: clamp(1.8rem, 3vw, 2.6rem);
        font-weight: 800;
        transform: translate(var(--hx), var(--hy)) scale(var(--s));
    }

    .p-wrapper {
        margin-top: 0.4rem;
        min-width: 0;
        padding-right: 1rem;
    }

    p {
        color: #8b949e;
        font-size: clamp(0.85rem, 4.5vw, 1.7rem);
        font-weight: 400;
        line-height: 1.3;
        margin: 0;
        white-space: nowrap; /* keeps it one line on desktop */
        overflow: hidden;
        text-overflow: ellipsis;
        /* Force container to tightly wrap the exact width of the longest line, destroying invisible empty space */
        width: min-content;
        transform: translate(var(--px), var(--py)) scale(var(--s));
    }

    /* Allow wrapping on tablets and mobile screens, breaking perfectly at our non-breaking spaces */
    @media (max-width: 900px) {
        .logo-text p {
            white-space: normal;
            text-overflow: unset;
        }
    }
</style>
