<script>
  /**
   * @type {Array<{id: string, text: string, tagName: string}>}
   */
  export let headings = [];
  export let activeHeadingId = "";
</script>

<nav class="toc">
  <h4>On this page</h4>
  <ul>
    {#each headings as heading}
      <li class={heading.tagName}>
        <!-- use Svelte interpolation correctly -->
        <a
          href={"#" + heading.id}
          class:active={heading.id === activeHeadingId}
        >
          {heading.text}
        </a>
      </li>
    {/each}
  </ul>
</nav>

<style>
  .toc { width: 220px; }

  h4 {
    font-size: 0.9rem;
    font-weight: 600;
    text-transform: uppercase;
    color: #a0a0a0;
    margin: 0 0 0.5rem 0;
  }

  ul { list-style: none; padding: 0; margin: 0; }
  li { margin-bottom: 0.5rem; }
  a {
    color: #adadad;
    text-decoration: none;
    font-size: 0.95rem;
    transition: color 0.1s ease;
    line-height: 1.4;
  }

  a:hover,
  a.active {
    color: #ffffff;
    font-weight: 500;
  }

  li.h2 a { padding-left: 1rem; font-size: 0.9rem; color: #9e9e9e; }
  li.h2 a:hover,
  li.h2 a.active { color: #ffffff; }
</style>
