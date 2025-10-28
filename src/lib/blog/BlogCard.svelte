<script>
    export let title = "Default Title";
    export let description = "";
    export let date = "";
    export let href = "/";
</script>

<a {href} class="card">
    <article>
        <h2>{title}</h2>
        {#if date}
            <p class="date">{date}</p>
        {/if}
        <p class="description">{description}</p>
        <span class="read-more">Read more &rarr;</span>
    </article>
</a>

<style>
    .card {
        display: block;
        background-color: #2a2a2a;
        border-radius: 8px;
        padding: 24px;
        text-decoration: none;
        color: #ffffff;
        transition: all 0.2s ease-in-out;
        width: 350px; /* Set a width so cards can wrap */
        max-width: 100%;
        box-sizing: border-box;
    }

    .card:hover {
        transform: scale(1.03);
        background-color: #333;
    }

    h2 {
        font-size: 1.5rem; /* 24px */
        font-weight: 700;
        color: #ffffff;
        margin: 0 0 10px 0;
        line-height: 1.3;
    }

    .description {
        font-size: 1rem; /* 16px */
        color: #d0d0d0;
        margin: 0 0 15px 0;
        line-height: 1.5;
    }

    .date {
        font-size: 0.9rem; /* 14px */
        color: #a0a0a0;
        margin: 0 0 20px 0;
    }

    .read-more {
        color: #26a69a; /* Teal accent color from your design */
        font-weight: 500;
        font-size: 1rem;
    }
</style>
