<script>
  import Footer from "$lib/footer/Footer.svelte";
  import deltacv_logo from "$lib/assets/deltacv.svg";
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";

  let headerEl; // This will be bound to your <header> element

  // This function updates the CSS variable
  function setHeaderHeight(height) {
    document.documentElement.style.setProperty(
      "--header-height",
      `${height}px`,
    );
  }

  onMount(() => {
    if (!headerEl) return;

    // A ResizeObserver is the most efficient way
    // to detect size changes.
    const observer = new ResizeObserver((entries) => {
      // This gives us the new height, including padding and borders
      const height = entries[0].contentRect.height;
      setHeaderHeight(height);
    });

    // Start observing the header element
    observer.observe(headerEl);

    // Set the initial height just in case
    setHeaderHeight(headerEl.offsetHeight);

    // Clean up the observer when the component is destroyed
    return () => observer.disconnect();
  });
</script>

<div class="container">
  <!-- Header -->
  <header class="header" bind:this={headerEl} in:fade={{ duration: 200 }}>
    <!-- Logo + Blog Title -->
    <a href="/" class="skip-link">
      <div class="logo">
        <img src={deltacv_logo} alt="deltacv logo" />
      </div>
      <h1 class="header-title">deltacv</h1>
    </a>

    <!-- Buttons -->
    <div class="nav-buttons">
      <a href="/" class="nav-button">Home Page</a>
      <a href="/blog" class="nav-button">Blog</a>
    </div>
  </header>

  <!-- Main Content -->
  <main class="content" in:fade={{ duration: 500 }}>
    <slot />
  </main>

  <!-- Footer -->
  <Footer />
</div>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    background-color: #0d1117;
    font-family: "Inter", sans-serif;
    color: #c9d1d9;
    line-height: 1.6;
  }

  /* Container to push footer to bottom */
  .container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  /* Header */
  .header {
    display: flex;
    justify-content: space-between; /* logo left, button right */
    align-items: center;
    gap: 1rem;
    padding: 0 2rem;
    height: 12vh;
    background-color: #0d1117;
    position: sticky;
    top: 0;
    z-index: 10;
  }

  /* Logo + Title Link */
  .skip-link {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    text-decoration: none;
    color: inherit;
  }

  .skip-link:hover {
    opacity: 0.8;
  }

  .header .logo {
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .header .logo img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    display: block;
  }

  .header-title {
    font-family: "Noto Sans", sans-serif;
    font-size: clamp(1.5rem, 2.5vw, 2rem);
    font-weight: 700;
    color: #c9d1d9;
    margin: 0;
  }

  /* Home Button */
  .home-button {
    padding: 0.5rem 1rem;
    background-color: #21262d;
    color: #c9d1d9;
    border-radius: 6px;
    text-decoration: none;
    font-weight: 600;
    transition: background-color 0.2s;
  }

  .home-button:hover {
    background-color: #30363d;
  }

  /* Main content */
  .content {
    flex: 1; /* grows to push footer down */
    max-width: 750px;
    width: 90%;
    margin: 0 auto;
    padding: 2rem 0 4rem 0;
    display: flex;
    flex-direction: column;
  }

  /* Images inside posts */
  :global(main) img {
    max-width: 100%;
    border-radius: 8px;
    margin: 1rem 0;
  }

  /* Responsive */
  @media (max-width: 768px) {
    .header {
      height: 15vh;
      padding: 0 1rem;
    }

    .header-title {
      font-size: clamp(1.2rem, 4vw, 1.5rem);
    }

    .content {
      padding: 1.5rem 1rem 3rem 1rem;
    }
  }

  /* Nav Buttons */
  .nav-buttons {
    display: flex;
    gap: 0.75rem;
  }

  .nav-button {
    padding: 0.5rem 1rem;
    background-color: #21262d;
    color: #c9d1d9;
    border-radius: 6px;
    text-decoration: none;
    font-weight: 600;
    transition: background-color 0.2s;
  }

  .nav-button:hover {
    background-color: #30363d;
  }
</style>
