<script>
    import AnimatedLogoText from "$lib/header/DeltaCVAnimatedLogoAndText.svelte";
    import { onMount } from "svelte";
    import { fade } from "svelte/transition";
    import Project from "$lib/projects/ProjectCard.svelte";

    import eocvsim_img from "$lib/assets/eocvsim.png";

    import papervision_img from "$lib/assets/papervision.png";
    import papervision_gif from "$lib/assets/papervision.gif";
    import Footer from "$lib/footer/Footer.svelte";
    import BlogLinkCard from "$lib/projects/BlogLinkCard.svelte";

    let ready = false;
    let imagesLoaded = 0;

    const imageSources = [eocvsim_img, papervision_gif];

    function checkImagesLoaded() {
        imagesLoaded++;
        if (imagesLoaded === imageSources.length) {
            ready = true;
        }
    }

    onMount(() => {
        imageSources.forEach((src) => {
            const img = new Image();
            img.src = src;
            img.onload = checkImagesLoaded;
            img.onerror = checkImagesLoaded;
        });
    });
</script>

{#if ready}
    <div class="container">
        <div class="header">
            <div class="logo">
                <AnimatedLogoText />
            </div>
        </div>

        <div class="content" in:fade={{ duration: 300 }}>
            <Project
                title="EOCV-Sim"
                description="Develop, test, and tune your EasyOpenCV pipelines directly on your computer with a simple interface!"
                staticSrc={eocvsim_img}
                hoverSrc={eocvsim_img}
                href="./eocv-sim"
            />

            <Project
                title="PaperVision"
                description="Create your custom OpenCV algorithms using a user-friendly node editor interface inspired by Blender and Unreal Engine blueprints."
                hoverSrc={papervision_img}
                staticSrc={papervision_gif}
                href="./papervision"
            />

            <BlogLinkCard />
        </div>
        <Footer/>
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

    .container {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
    }

    .header {
        width: 100%;
        height: max(15vw, 15vh);
        background-color: #0d1117;
        display: flex;
        justify-content: center;
        align-items: center;
        position: sticky;
        top: 0;
        z-index: 10;
    }

    .logo {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
    }

    .content {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        gap: 30px;
        flex: 1;
        padding: 5vh 0; /* un poco de aire alrededor */
    }

    @media (max-width: 768px) {
        .header {
            height: max(30vw, 30vh);
        }

        .content {
            gap: 10px;
            padding: 10vh 0;
        }
    }
</style>
