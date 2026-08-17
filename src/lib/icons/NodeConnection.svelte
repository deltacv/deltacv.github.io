<script lang="ts">
    let { class: className = "", stroke = "#f59e0b" } = $props();
</script>

<svg class="absolute inset-0 w-full h-full z-0 pointer-events-none {className}">
    <path
        d="M 180 41 C 220 41, 220 81, 260 81"
        fill="none"
        {stroke}
        stroke-width="2.5"
        stroke-dasharray="4"
        class="opacity-40 group-hover/pv:opacity-100 group-hover/pv:-translate-y-1 transition-all duration-500 hidden md:block"
    />
</svg>
