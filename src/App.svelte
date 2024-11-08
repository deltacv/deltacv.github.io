<script>
	import AnimatedLogoText from './animation/AnimatedLogoText.svelte';
	import { onMount } from 'svelte';
    import { fade } from 'svelte/transition';
  	import Project from './projects/Project.svelte';

	let ready = false;
	onMount(() => setTimeout(() => ready = true, 500));
</script>

{#if ready}
<div class="container">
  <div class="header">
	<div class="logo">
	  <AnimatedLogoText/>
	</div>
  </div>
  
  <div class="content" in:fade="{{duration: 1000}}">
	<Project 
	  title="EOCV-Sim" 
	  description="Develop, test, and tune your EasyOpenCV pipelines directly on your computer with a simple GUI !"
	  gifSrc="/eocvsim.png",
	  href="https://docs.deltacv.org/eocv-sim"
	/>

	<Project 
	  title="PaperVision" 
	  description="Create your custom OpenCV algorithms using a user-friendly node editor interface inspired by Blender and Unreal Engine blueprints."
	  gifSrc="/papervision.gif"
	  href="https://github.com/deltacv/PaperVision"
	/>
  </div>
</div>
{/if}

<style>
  :global(body) {
	  margin: 0;
	  padding: 0;
	  background-color: #000;
	  font-family: Arial, sans-serif;
  }
  
  .container {
	  display: flex;
	  flex-direction: column;
	  align-items: center;
	  padding-top: 15vh; /* Space for the header */
  }

  .header { 
	  width: 100%;
	  height: max(15vw, 15vh); 
	  background-color: #0D1117;
	  display: flex;
	  justify-content: center;
	  align-items: center;
	  position: fixed; /* Keep the header at the top */
	  top: 0;
	  left: 0;
	  z-index: 10; /* Make sure it's above other content */
  }

  .logo {
	  display: flex;
	  justify-content: center;
	  align-items: center;
	  width: 100%;
  }

  .content {
    margin-top: 20vh; /* Add some space between the header and the content */
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap; /* Allow cards to wrap to the next line */
    gap: 30px; /* Add space between cards */
  }

  @media (max-width: 768px) {
    .header {
      height: max(30vw, 30vh);
    }
    .content {
      gap: 10px; /* Smaller gap on smaller screens */
    }
  }
</style>