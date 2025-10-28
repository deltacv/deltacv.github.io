<script>
  import deltacv_logo from "$lib/assets/deltacv.svg";
  export let title = "deltacv"; // default title
</script>

<header class="header">
  <a href="/" class="skip-link">
    <div class="logo">
      <img src={deltacv_logo} alt="deltacv logo" />
    </div>
    <h1 class="header-title">{title}</h1>
  </a>

  <div class="nav-buttons">
    <a href="/" class="nav-button">Home Page</a>
    <a href="/blog" class="nav-button">Blog</a>
  </div>
</header>

<style>
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

.logo {
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.logo img {
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

@media (max-width: 768px) {
  .header {
    height: 15vh;
    padding: 0 1rem;
  }

  .header-title {
    font-size: clamp(1.2rem, 4vw, 1.5rem);
  }
}
</style>
