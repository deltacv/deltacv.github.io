<script lang="ts">
  import type { SvelteComponent, Snippet } from "svelte";

  interface Props {
    icon: typeof SvelteComponent;
    title: string;
    desc: string;
    url?: string;
    color?:
      | "cyan"
      | "amber"
      | "purple"
      | "rose"
      | "blue"
      | "emerald"
      | "indigo";
    class?: string;
    children?: Snippet;
  }

  let {
    icon,
    title,
    desc,
    url = undefined,
    color = "cyan",
    class: className = "",
    children,
  }: Props = $props();

  const themes = {
    cyan: {
      icon: "text-cyan-500/80",
      hoverBorder: "hover:border-cyan-500/60",
    },
    amber: {
      icon: "text-amber-500/80",
      hoverBorder: "hover:border-amber-500/60",
    },
    purple: {
      icon: "text-purple-500/80",
      hoverBorder: "hover:border-purple-500/60",
    },
    rose: {
      icon: "text-rose-500/80",
      hoverBorder: "hover:border-rose-500/60",
    },
    blue: {
      icon: "text-blue-500/80",
      hoverBorder: "hover:border-blue-500/60",
    },
    emerald: {
      icon: "text-emerald-500/80",
      hoverBorder: "hover:border-emerald-500/60",
    },
    indigo: {
      icon: "text-indigo-500/80",
      hoverBorder: "hover:border-indigo-500/60",
    },
  };

  const theme = themes[color] || themes.cyan;
  const tag = url ? "a" : "div";
  const linkProps = url ? { href: url } : {};
</script>

<svelte:element
  this={tag}
  class="group relative flex flex-col h-full w-full bg-[#0d1117] p-8 rounded-lg border border-[#30363d] transition-colors duration-300 {theme.hoverBorder} overflow-hidden block {className}"
  {...linkProps}
>
  <div class="relative z-10 flex flex-col h-full">
    <h3 class="text-xl font-semibold text-white mb-3 tracking-tight flex items-center gap-3">
      <svelte:component this={icon} size={22} strokeWidth={2} class="{theme.icon} transition-transform group-hover:scale-110 duration-300" color="currentColor" />
      {title}
    </h3>
    <p class="whitespace-pre-line text-[#8b949e] leading-relaxed flex-grow">
      {desc}
    </p>
  </div>

  {#if children}
    {@render children()}
  {/if}
</svelte:element>
