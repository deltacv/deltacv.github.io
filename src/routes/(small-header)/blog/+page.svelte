<script>
    import { onMount } from "svelte";
    import BlogCard from "$lib/blog/BlogCard.svelte";

    // Dynamically import all blog posts (.svx files)
    const modules = import.meta.glob("../../../posts/*.svx", { eager: true });

    // Prepare a list of blog posts with title, description, and slug
    // Assuming each post exports a `metadata` object
    let blogPosts = Object.entries(modules).map(([path, mod]) => {
        const slug = path.split("/").pop().replace(".svx", "");
        return {
            slug,
            title: mod.metadata?.title || slug,
            description: mod.metadata?.description || "",
            date: mod.metadata?.date || "", // <-- 2. ADDED DATE
        };
    });

    let ready = false;
    let imagesLoaded = 0;

    // Optional: If you want to preload images per post, add them here
    const imageSources = [];

    function checkImagesLoaded() {
        imagesLoaded++;
        if (imagesLoaded === imageSources.length) {
            ready = true;
        }
    }

    onMount(() => {
        if (imageSources.length === 0) ready = true;
        imageSources.forEach((src) => {
            const img = new Image();
            img.src = src;
            img.onload = checkImagesLoaded;
            img.onerror = checkImagesLoaded;
        });
    });
</script>

{#if ready}
  <div class="content">
    <h1>the deltacv blog</h1>
    <p>insights & learnings our development process</p>

    <div class="cards">
      {#each blogPosts as post}
        <BlogCard
          title={post.title}
          date={post.date}
          description={post.description}
          href={`/blog/${post.slug}`}
        />
      {/each}
    </div>
  </div>
{/if}

<style>
:global(body) {
  margin: 0;
  padding: 0;
  background-color: #000;
  font-family: Arial, sans-serif;
  height: 100%;
}

.content {
  width: 100%;
  display: flex;
  flex-direction: column; /* Stack title + cards vertically */
  align-items: center; /* Center the whole block horizontally */
  flex: 1;
  padding: 5vh 0;
  max-width: 1600px;
  margin: 0 auto;
  box-sizing: border-box;
}

.cards {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 30px;
  width: 100%;
  margin-top: 3vh; /* space between title and cards */
}

@media (max-width: 768px) {
  .content {
    padding: 10vh 10px;
  }

  .cards {
    gap: 10px;
    margin-top: 2vh;
  }
}

h1 {
  font-family: "Noto Sans", sans-serif;
  font-size: clamp(1.5rem, 2.5vw, 2rem);
  font-weight: 700;
  color: #c9d1d9;
  margin: 0;
  text-align: center; /* Center text */
}
</style>
