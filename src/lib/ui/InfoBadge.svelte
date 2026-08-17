<script lang="ts">
    import type { Snippet } from "svelte";

    let { title, color = "", children } = $props<{
        title: string;
        color?: string;
        children: Snippet;
    }>();
</script>

<div class="info-badge" {title} style={color ? `color: ${color};` : ''}>
    {@render children()}
</div>

<style>
    .info-badge {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        color: #8b949e;
        font-size: 0.95rem;
        font-weight: 500;
        text-align: center;
        max-width: 100%;
        line-height: 1.4;
    }

    .info-badge :global(span) {
        text-wrap: balance;
    }

    .info-badge :global(svg) {
        flex-shrink: 0;
        opacity: 0.8;
    }

    @media (max-width: 600px) {
        .info-badge {
            text-align: center;
            gap: 10px;
        }

        .info-badge :global(svg) {
            transform: scale(1.1);
        }
    }
</style>
