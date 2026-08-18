<script>
  import Footer from "$lib/footer/Footer.svelte";
  import Navbar from "$lib/header/Navbar.svelte";
  import { page } from "$app/stores";

  let scrollY = $state(0);
  let innerHeight = $state(1000);

  // Check if the current page has declared a hero section in its load function
  let hasHero = $derived($page.data.hasHero === true);
  // Show after scrolling 85% of the viewport height if there's a hero, else always show
  let navbarVisible = $derived(hasHero ? scrollY > innerHeight * 0.85 : true);
</script>

<svelte:window bind:scrollY bind:innerHeight />

<div class="container">
  <Navbar visible={navbarVisible} />

  <main class="content">
    <slot />
  </main>

  <Footer />
</div>

<style>
  :global(html, body) {
    margin: 0;
    padding: 0;
    width: 100%;
    min-width: 100%;
    background-color: #000;
    font-family: Inter, sans-serif;
    color: #c9d1d9;
    min-height: 100%;
    box-sizing: border-box;
  }

  :global(*, *::before, *::after) {
    box-sizing: border-box;
  }

  .container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
  }

  .content {
    flex: 1 0 auto;
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
  }

  :global(footer) {
    width: 100%;
    background-color: #0d1117;
    padding: 1rem 0;
    flex-shrink: 0;
  }

  @media (max-width: 768px) {
    /* No padding here, each page handles it */
  }
</style>
