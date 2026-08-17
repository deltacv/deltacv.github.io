<script lang="ts">
    import type { Snippet } from "svelte";

    let { 
        title, 
        subtitle = "", 
        date = "", 
        icon = null,
        iconColor = "#8b949e",
        children
    }: {
        title: string;
        subtitle?: string;
        date?: string;
        icon?: any;
        iconColor?: string;
        children?: Snippet;
    } = $props();
</script>

<div class="relative pl-8 md:pl-10 group">
    <!-- Icon or Dot -->
    <div class="absolute -left-[17px] top-1 w-8 h-8 rounded-full bg-[#161b22] border border-[#30363d] flex items-center justify-center shadow-sm group-hover:border-[#58a6ff] transition-colors" style="color: {iconColor}">
        {#if icon}
            {@const Icon = icon}
            <Icon size={14} strokeWidth={2.5} />
        {:else}
            <div class="w-2.5 h-2.5 rounded-full bg-current"></div>
        {/if}
    </div>

    <!-- Content -->
    <div class="flex flex-col gap-1">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-1 md:gap-4">
            <h3 class="text-lg font-bold text-[#c9d1d9] tracking-tight">{title}</h3>
            {#if date}
                <span class="text-xs font-mono text-[#8b949e] bg-[#21262d] px-2.5 py-1 rounded-md border border-[#30363d] w-fit font-semibold tracking-wide">{date}</span>
            {/if}
        </div>
        {#if subtitle}
            <h4 class="text-sm font-medium text-[#8b949e] mb-1 max-w-[18rem] md:max-w-[22rem] leading-snug text-balance">{subtitle}</h4>
        {/if}
        
        {#if children}
            <div class="text-[#8b949e] text-[0.95rem] leading-relaxed mt-2 space-y-2">
                {@render children()}
            </div>
        {/if}
    </div>
</div>
