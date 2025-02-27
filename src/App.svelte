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
  
	<div class="content" in:fade={{duration: 1000}}>
	  <Project 
		title="EOCV-Sim" 
		description="Develop, test, and tune your EasyOpenCV pipelines directly on your computer with a simple GUI!"
		gifSrc="/eocvsim.png"
		href="https://docs.deltacv.org/eocv-sim"
	  />
  
	  <Project 
		title="PaperVision" 
		description="Create your custom OpenCV algorithms using a user-friendly node editor interface inspired by Blender and Unreal Engine blueprints."
		gifSrc="/papervision.gif"
		href="https://docs.deltacv.org/papervision"
	  />
	</div>
  
	<!-- Footer Section -->
	<footer class="footer">
	  <div class="contact-info">
		<p>Contact us at: <a href="mailto:dev@deltacv.org">dev@deltacv.org</a>. Follow us on GitHub: <a href="https://github.com/deltacv" target="_blank">deltacv</a></p>
	  </div>
	</footer>
  </div>
  {/if}
  
  <style>
	:global(body) {
	  margin: 0;
	  padding: 0;
	  background-color: #000;
	  font-family: Arial, sans-serif;
	  height: 100%; /* Ensure body takes full height */
	}
  
	.container {
	  display: flex;
	  flex-direction: column;
	  min-height: 100vh; /* Ensure container takes full height */
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
      margin-top: 20vh; /* Default space for larger screens */
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap; /* Allow cards to wrap to the next line */
      gap: 30px; /* Add space between cards */
  	  flex: 1; /* Make sure content takes up remaining space */
	}

	/* Footer styling */
	.footer {
	  width: 100%;
	  background-color: #0D1117;
	  color: #fff;
	  padding: 20px 0;
	  display: flex;
	  justify-content: center;
	  align-items: center;
	  position: relative;
	}
  
	.contact-info {
	  text-align: center;
	}
  
	.contact-info a {
	  color: #58a6ff; /* Link color */
	  text-decoration: none;
	}
  
	.contact-info a:hover {
	  text-decoration: underline;
	}
  
	@media (max-width: 768px) {
  	  .header {
    	height: max(30vw, 30vh);
  	  }

    .content {
       margin-top: 35vh; /* Increase the margin for smaller screens */
       gap: 10px; /* Smaller gap on smaller screens */
    }

    .footer {
      padding: 15px 0;
    }
  }
</style>
