<script>
  import { error } from "@sveltejs/kit";
  import { onMount } from "svelte";
  import TableOfContents from "$lib/blog/TableOfContents.svelte";

  // --- Load Post ---
  const modules = import.meta.glob("../../../../posts/*.svx", { eager: true });
  export let params;
  const path = `../../../../posts/${params.slug}.svx`;
  const mod = modules[path];
  if (!mod) throw error(404, "Post not found");
  const PostComponent = mod.default;

  // --- Get Metadata ---
  const { title, date } = mod.metadata || {};

  // --- TOC and Scroll-Spy State ---
  let headings = [];
  let contentEl;
  let activeHeadingId = "";
  $: hasHeadings = headings.length > 0;

  onMount(() => {
    if (contentEl) {
      // Find all h1 and h2 tags inside the rendered content
      const headingNodes = contentEl.querySelectorAll("h1, h2");
      const extractedHeadings = [];

      headingNodes.forEach((node, index) => {
        // Generate an ID if one doesn't exist (from remark-slug)
        let id = node.id;
        if (!id) {
          id = node.textContent
            .toLowerCase()
            .replace(/[^a-z0-9 ]/g, "")
            .replace(/\s+/g, "-")
            .slice(0, 50);
          id = `${id}-${index}`;
          node.id = id;
        }

        extractedHeadings.push({
          id: id,
          text: node.textContent || "Missing text",
          tagName: node.tagName.toLowerCase(),
          // Store the heading's vertical position relative to the document
          top: node.getBoundingClientRect().top + window.scrollY,
        });

        // --- START: Add anchor link logic ---
        const anchorLink = document.createElement('a');
        anchorLink.className = 'heading-anchor-link';
        anchorLink.textContent = '#';
        anchorLink.href = `#${id}`;

        // Add the click-to-copy functionality
        anchorLink.addEventListener('click', (e) => {
          e.preventDefault(); // Stop page from jumping
          const url = `${window.location.origin}${window.location.pathname}#${id}`;
          navigator.clipboard.writeText(url).then(() => {
            // go to url
            window.location.hash = id;
          }).catch(err => {
            console.error('Failed to copy link: ', err);
          });
        });

        // Add the new link element inside the heading
        node.appendChild(anchorLink);
        // --- END: Add anchor link logic ---
      });
      headings = extractedHeadings;
    }
  });

  // --- Scroll Handler for Active Heading ---
  function handleScroll() {
    if (headings.length === 0) return;
    const triggerLine = window.scrollY + 120;
    let currentBestId = "";
    for (const heading of headings) {
      if (heading.top < triggerLine) {
        currentBestId = heading.id;
      } else {
        break;
      }
    }
    activeHeadingId = currentBestId;
  }
</script>

<svelte:window on:scroll={handleScroll} />

<div class="toc-container" class:visible={hasHeadings}>
  <TableOfContents {headings} {activeHeadingId} />
</div>

<article class="content-container" bind:this={contentEl}>
  {#if title}
    <p class="post-title">{title}</p>
  {/if}
  {#if date}
    <p class="date">{date}</p>
  {/if}

  <svelte:component this={PostComponent} />
</article>

<style>
  /* Fixes scrolling to anchors with a fixed header */
  :global(html) {
    scroll-padding-top: 90px; /* Adjust to your header height */
  }

  .toc-container {
    position: fixed;
    top: 150px; /* Adjust to clear your header */
    left: 2rem;
    display: none; /* Hidden by default */
  }
  .toc-container.visible {
    display: block;
  }
  .content-container {
    margin: 2rem auto;
    max-width: 800px;
    padding: 0 1rem;
    min-width: 0;
  }
  @media (max-width: 1200px) {
    .toc-container {
      display: none !important;
    }
  }

  /* --- Styles for Metadata --- */
  .post-title {
    font-size: 2.8rem;
    font-weight: 700;
    color: #f0f0f0;
    margin-bottom: 0.5rem;
    text-align: center;
  }
  .date {
    color: #a0a0a0;
    margin-top: 0;
    margin-bottom: 2rem;
    font-size: 1rem;
    text-align: center;
  }

  /* --- Global styles for post content --- */
  :global(.content-container h1) {
    color: #f0f0f0;
    border-bottom: 1px solid #444;
    padding-bottom: 0.5rem;
    font-size: 2rem;
    margin-top: 2.5rem;
    position: relative; /* /* NEW */ Required for positioning the link */
  }
  :global(.content-container h2) {
    color: #e0e0e0;
    font-size: 1.5rem;
    margin-top: 2rem;
    position: relative; /* /* NEW */ Required for positioning the link */
  }
  :global(.content-container p) {
    color: #ccc;
    line-height: 1.7;
  }

  :global(a.heading-anchor-link) {
    position: absolute;
    left: -1.2em; /* Position to the left of the heading */
    top: 0;
    
    font-size: 0.8em; /* Make it a bit smaller than the heading */
    font-weight: 500;
    text-decoration: none;
    color: #888;
    
    opacity: 0; /* Hide by default */
    transition: opacity 0.15s ease, color 0.15s ease;
  }

  /* Show the link on heading hover */
  :global(.content-container h1:hover a.heading-anchor-link),
  :global(.content-container h2:hover a.heading-anchor-link) {
    opacity: 1;
  }

  /* Style the link's hover state */
  :global(a.heading-anchor-link:hover) {
    color: #eee;
    text-decoration: underline;
  }
</style>