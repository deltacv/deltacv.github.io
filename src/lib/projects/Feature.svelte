<script lang="ts">
  import type { SvelteComponent, Snippet } from 'svelte';

  interface Props {
    icon: typeof SvelteComponent;
    title: string;
    desc: string;
    url?: string;
    color?: 'cyan' | 'amber' | 'purple' | 'rose' | 'blue' | 'emerald' | 'indigo';
    class?: string;
    children?: Snippet;
  }

  let {
    icon,
    title,
    desc,
    url = undefined,
    color = 'cyan',
    class: className = '',
    children
  }: Props = $props();

  const themes = {
    cyan: {
      icon: 'bg-cyan-500/20 text-cyan-400',
      hoverBorder: 'hover:border-cyan-500/50'
    },
    amber: {
      icon: 'bg-amber-500/20 text-amber-400',
      hoverBorder: 'hover:border-amber-500/50'
    },
    purple: {
      icon: 'bg-purple-500/20 text-purple-400',
      hoverBorder: 'hover:border-purple-500/50'
    },
    rose: {
      icon: 'bg-rose-500/20 text-rose-400',
      hoverBorder: 'hover:border-rose-500/50'
    },
    blue: {
      icon: 'bg-blue-500/20 text-blue-400',
      hoverBorder: 'hover:border-blue-500/50'
    },
    emerald: {
      icon: 'bg-emerald-500/20 text-emerald-400',
      hoverBorder: 'hover:border-emerald-500/50'
    },
    indigo: {
      icon: 'bg-indigo-500/20 text-indigo-400',
      hoverBorder: 'hover:border-indigo-500/50'
    }
  };

  const theme = themes[color] || themes.cyan;
  const tag = url ? 'a' : 'div';
  const linkProps = url ? { href: url } : {};
</script>

<svelte:element
  this={tag}
  class="group relative flex flex-col h-full w-full bg-[#0d1117] p-8 rounded-lg border border-gray-800 transition-all duration-200 {theme.hoverBorder} overflow-hidden block {className}"
  {...linkProps}
>
  <div class="relative z-10 flex flex-col h-full">
    <div class="inline-flex items-center justify-center w-12 h-12 rounded-lg {theme.icon} mb-6 transition-transform group-hover:scale-110 duration-300">
      <svelte:component this={icon} size={24} strokeWidth={2.5} />
    </div>
    
    <h3 class="text-xl font-bold text-white mb-3 tracking-tight">{title}</h3>
    <p class="text-gray-400 leading-relaxed text-sm flex-grow">
      {desc}
    </p>
  </div>
  
  {#if children}
    {@render children()}
  {/if}
</svelte:element>
