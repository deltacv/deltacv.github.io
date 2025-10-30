<script>
  import Footer from "$lib/footer/Footer.svelte";
  import deltacv_logo from "$lib/assets/deltacv.svg";
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";

  let headerEl;

  function setHeaderHeight(height) {
    document.documentElement.style.setProperty("--header-height", `${height}px`);
  }

  onMount(() => {
    if (!headerEl) return;

    const observer = new ResizeObserver((entries) => {
      const height = entries[0].contentRect.height;
      setHeaderHeight(height);
    });

    observer.observe(headerEl);
    setHeaderHeight(headerEl.offsetHeight);

    return () => observer.disconnect();
  });
</script>

<div class="container">
  <!-- Header -->
  <header class="header" bind:this={headerEl} in:fade={{ duration: 200 }}>
    <a href="/" class="skip-link">
      <div class="logo">
        <img src={deltacv_logo} alt="deltacv logo" />
      </div>
      <h1 class="header-title">deltacv</h1>
    </a>

    <div class="nav-buttons">
      <a href="/" class="nav-button">Home Page</a>

      <div class="nav-dropdown">
        <button class="nav-button">Projects ▾</button>
        <div class="dropdown-content">
          <a href="/eocv-sim" class="dropdown-item">EOCV-Sim</a>
          <a href="/papervision" class="dropdown-item">Papervision</a>
        </div>
      </div>

      <a href="/blog" class="nav-button">Blog</a>
    </div>
  </header>

  <!-- Main Content -->
  <main class="content" in:fade={{ duration: 500 }}>
    <slot />
  </main>

  <Footer />
</div>

<style>
  :global(html, body) {
    margin: 0;
    padding: 0;
    background-color: #0d1117;
    font-family: "Inter", sans-serif;
    color: #c9d1d9;
    line-height: 1.6;
    height: 100%;
    overflow-y: auto; /* ✅ only show scrollbar when needed */
  }

  .container {
    display: flex;
    flex-direction: column;
    min-height: 100dvh; /* ✅ dynamic viewport height (fixes 1px scrollbar bug) */
    overflow: hidden; /* ✅ prevent micro overflow causing scrollbars */
  }

  /* Header */
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    padding: 0 2rem;
    height: 12vh;
    background-color: #0d1117;
    position: sticky;
    top: 0;
    z-index: 10;
  }

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

  /* Main content */
  .content {
    flex: 1;
    max-width: 750px;
    width: 90%;
    margin: 0 auto;
    padding: 2rem 0 4rem 0;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
  }

  :global(main) img {
    max-width: 100%;
    border-radius: 8px;
    margin: 1rem 0;
  }

  /* Navigation Buttons */
  .nav-buttons {
    display: flex;
    gap: 0.75rem;
    align-items: center;
  }

  .nav-button {
    padding: 0.5rem 1rem;
    background-color: #21262d;
    color: #c9d1d9;
    border-radius: 6px;
    text-decoration: none;
    font-weight: 600;
    transition: background-color 0.2s, transform 0.15s;
    cursor: pointer;
  }

  .nav-button:hover {
    background-color: #30363d;
  }

  /* Dropdown Container */
  .nav-dropdown {
    position: relative;
    display: inline-block;
  }

  /* Dropdown Content */
  .dropdown-content {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    background-color: #161b22;
    min-width: 160px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
    border-radius: 6px;
    z-index: 20;
    overflow: hidden;
    transform: translateY(-10px);
    opacity: 0;
    transition: opacity 0.25s ease, transform 0.25s ease;
  }

  .dropdown-item {
    display: block;
    padding: 0.6rem 1rem;
    color: #c9d1d9;
    text-decoration: none;
    font-weight: 500;
    transition: background-color 0.2s;
  }

  .dropdown-item:hover {
    background-color: #30363d;
  }

  .nav-dropdown:hover .dropdown-content {
    display: block;
    opacity: 1;
    transform: translateY(0);
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
</style>
