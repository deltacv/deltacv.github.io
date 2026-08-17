<script lang="ts">
    import type { Snippet } from "svelte";

    let { href, ariaLabel, colorClass = "hover:text-[#c9d1d9]", handle, children } = $props<{
        href: string;
        ariaLabel: string;
        colorClass?: string;
        handle: string;
        children: Snippet;
    }>();
</script>

<a
    {href}
    target="_blank"
    rel="noopener noreferrer"
    class="social-badge text-[#8b949e] {colorClass} transition-colors duration-200"
    aria-label={ariaLabel}
>
    {@render children()}
    <span class="social-text">{handle}</span>
</a>

<style>
    .social-badge {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        text-decoration: none;
        position: relative;
    }

    .social-text {
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        margin-top: 4px;
        max-width: 0;
        opacity: 0;
        overflow: hidden;
        white-space: nowrap;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        font-family: "Inter", sans-serif;
        font-size: 0.85rem;
        font-weight: 500;
        color: inherit;
    }

    .social-badge:hover .social-text,
    .social-badge:focus-visible .social-text {
        max-width: 250px;
        opacity: 1;
    }
</style>
