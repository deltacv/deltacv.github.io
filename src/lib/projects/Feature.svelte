<script lang="ts">
  import type { SvelteComponent } from 'svelte';

  export let icon: typeof SvelteComponent;
  export let title: string;
  export let desc: string;
  export let url: string | undefined = undefined; 
  export let color: 'cyan' | 'amber' | 'emerald' | 'purple' | 'rose' | 'blue' = 'cyan';
  
  let className: string = '';
  export { className as class };

  const tag = url ? 'a' : 'div';
  const linkProps = url ? { href: url } : {};

  // Tailwind safe-listed dictionaries
  const colorMap = {
    cyan: {
      hoverBorder: 'hover:border-cyan-500/50',
      iconBoxBg: 'bg-cyan-500/10',
      iconText: 'text-cyan-400',
      iconBorder: 'border-cyan-500/20',
    },
    amber: {
      hoverBorder: 'hover:border-amber-500/50',
      iconBoxBg: 'bg-amber-500/10',
      iconText: 'text-amber-400',
      iconBorder: 'border-amber-500/20',
    },
    emerald: {
      hoverBorder: 'hover:border-emerald-500/50',
      iconBoxBg: 'bg-emerald-500/10',
      iconText: 'text-emerald-400',
      iconBorder: 'border-emerald-500/20',
    },
    purple: {
      hoverBorder: 'hover:border-purple-500/50',
      iconBoxBg: 'bg-purple-500/10',
      iconText: 'text-purple-400',
      iconBorder: 'border-purple-500/20',
    },
    rose: {
      hoverBorder: 'hover:border-rose-500/50',
      iconBoxBg: 'bg-rose-500/10',
      iconText: 'text-rose-400',
      iconBorder: 'border-rose-500/20',
    },
    blue: {
      hoverBorder: 'hover:border-blue-500/50',
      iconBoxBg: 'bg-blue-500/10',
      iconText: 'text-blue-400',
      iconBorder: 'border-blue-500/20',
    }
  };

  $: theme = colorMap[color] || colorMap.cyan;
</script>

<svelte:element
  this={tag}
  class="group relative flex flex-col h-full w-full bg-[#0d1117] p-8 rounded-lg border border-gray-800 transition-all duration-200 {theme.hoverBorder} overflow-hidden block {className}"
  {...linkProps}
>
  <div class="relative z-10 flex flex-col">
    <div class="inline-flex items-center justify-center p-3 rounded-lg {theme.iconBoxBg} {theme.iconBorder} mb-5 w-fit transition-transform group-hover:-translate-y-1 duration-200">
      <svelte:component this={icon} class="w-6 h-6 {theme.iconText}" />
    </div>
    
    <h3 class="text-lg font-bold text-gray-100 group-hover:text-white transition-colors">{title}</h3>
    <p class="mt-2 text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors text-sm">{desc}</p>
  </div>

  <!-- Optional rich media/graphic content injected into the card -->
  <slot />
</svelte:element>