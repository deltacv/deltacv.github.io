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
      hoverBorder: "hover:border-cyan-500/60 data-[mobile-active=true]:border-cyan-500/60",
    },
    amber: {
      icon: "text-amber-500/80",
      hoverBorder: "hover:border-amber-500/60 data-[mobile-active=true]:border-amber-500/60",
    },
    purple: {
      icon: "text-purple-500/80",
      hoverBorder: "hover:border-purple-500/60 data-[mobile-active=true]:border-purple-500/60",
    },
    rose: {
      icon: "text-rose-500/80",
      hoverBorder: "hover:border-rose-500/60 data-[mobile-active=true]:border-rose-500/60",
    },
    blue: {
      icon: "text-blue-500/80",
      hoverBorder: "hover:border-blue-500/60 data-[mobile-active=true]:border-blue-500/60",
    },
    emerald: {
      icon: "text-emerald-500/80",
      hoverBorder: "hover:border-emerald-500/60 data-[mobile-active=true]:border-emerald-500/60",
    },
    indigo: {
      icon: "text-indigo-500/80",
      hoverBorder: "hover:border-indigo-500/60 data-[mobile-active=true]:border-indigo-500/60",
    },
  };

  const theme = themes[color] || themes.cyan;
  const tag = url ? "a" : "div";
  const linkProps = url ? { href: url } : {};

  let elementRef: HTMLElement | undefined = $state();

  $effect(() => {
    if (!elementRef) return;

    const isMobile = window.matchMedia("(hover: none)").matches;
    if (!isMobile) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            elementRef?.setAttribute("data-mobile-active", "true");
          } else {
            elementRef?.removeAttribute("data-mobile-active");
          }
        });
      },
      {
        rootMargin: "-40% 0px -40% 0px", // Trigger when in middle 20% of screen
        threshold: 0,
      }
    );

    observer.observe(elementRef);

    return () => observer.disconnect();
  });
</script>

<svelte:element
  this={tag}
  bind:this={elementRef}
  class="group relative flex flex-col h-full w-full bg-[#0d1117] p-8 rounded-lg border border-[#30363d] transition-colors duration-300 {theme.hoverBorder} overflow-hidden block {className}"
  {...linkProps}
>
  <div class="relative z-10 flex flex-col h-full">
    <h3 class="text-xl font-semibold text-white mb-3 tracking-tight flex items-center gap-3">
      <svelte:component this={icon} size={22} strokeWidth={2} class="{theme.icon} transition-transform group-hover:scale-110 group-data-[mobile-active=true]:scale-110 duration-300" color="currentColor" />
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
