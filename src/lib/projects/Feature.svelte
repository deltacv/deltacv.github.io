<script lang="ts">
  import type { SvelteComponent } from 'svelte';

  export let icon: typeof SvelteComponent;
  export let title: string;
  export let desc: string;
  export let url: string | undefined = undefined; // <-- 1. Añade la prop opcional

  // 2. Decide qué etiqueta usar
  const tag = url ? 'a' : 'div';

  // 3. Prepara los atributos del enlace si existe la URL
  const linkProps = url
    ? {
        href: url,
      }
    : {};
</script>

<svelte:element
  this={tag}
  class="bg-gray-900 p-6 rounded-xl border border-gray-800 transition-all hover:border-cyan-600/50 hover:shadow-lg hover:shadow-cyan-900/20 hover:-translate-y-1 {url
    ? 'block'
    : ''}"
  {...linkProps}
>
  <div
    class="w-12 h-12 rounded-lg bg-cyan-600/10 text-cyan-400 flex items-center justify-center border border-cyan-600/30"
  >
    <svelte:component this={icon} class="w-6 h-6" />
  </div>
  <h3 class="mt-4 text-xl font-semibold text-white">{title}</h3>
  <p class="mt-2 text-gray-400">{desc}</p>
</svelte:element>