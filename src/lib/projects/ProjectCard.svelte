<script>
    import { quintOut } from 'svelte/easing'; // We'll use this for transitions
    
    // PROPS
    export let title = "Card Title";
    export let description = "This is the description that appears on hover.";
    
    // We now have two image props:
    // 1. imgSrc: The static image shown by default.
    // 2. gifSrc: The animated GIF shown only on hover.
    export let staticSrc = "/path/to/static-image.jpg"; 
    export let hoverSrc = "/path/to/your.gif"; 
    export let href = "#"; 

    // STATE
    let currentSrc = staticSrc;
    let isHovering = false;

    // Use isHovering to control the GIF, which is cleaner
    // for Svelte's reactivity.
    $: currentSrc = isHovering ? hoverSrc : staticSrc;

</script>

<a 
    href={href} 
    class="card" 
    on:mouseenter={() => isHovering = true}
    on:mouseleave={() => isHovering = false}
    aria-label={title}
>
    <div class="image-container">
        <img src={currentSrc} alt={title} loading="lazy" />
        
        <div class="overlay">
            <p>{description}</p>
        </div>
    </div>
    
    <div class="footer">
        <h2>{title}</h2>
    </div>
</a>

<style>
    /* Import a clean, modern font */
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap');

    .card {
        font-family: 'Inter', sans-serif;
        position: relative;
        width: 300px;
        border-radius: 16px; /* Slightly softer radius */
        overflow: hidden;
        cursor: pointer;
        display: flex;
        flex-direction: column;
        
        background-color: #1a1a1a;
        
        /* A subtle border for a "glass" effect */
        border: 1px solid rgba(255, 255, 255, 0.1); 
        
        /* Softer, more layered shadow */
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
        
        /* Smooth transitions for all animated properties */
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        text-decoration: none; /* Remove underline from link */
    }

    .card:hover {
        transform: scale(1.03); /* Slightly more subtle scale */
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.6);
    }
    
    /* New container to group image and overlay */
    .image-container {
        position: relative;
        width: 100%;
        overflow: hidden; /* Ensures overlay blur doesn't leak */
    }

    .card img {
        display: block; /* Removes bottom space */
        width: 100%;
        height: auto;
        /* This is much more robust than height: 60% */
        aspect-ratio: 16 / 9; 
        object-fit: cover;
        background-color: #333; /* Placeholder color while image loads */
    }

    .overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        
        /* Darker, more readable overlay */
        background: rgba(0, 0, 0, 0.7);
        color: white;
        
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 1rem;
        box-sizing: border-box;
        
        backdrop-filter: blur(0.5px);

        /* --- Animation --- */
        /* Start fully transparent and "down" (off-screen) */
        opacity: 0;
        transform: translateY(100%); 
        transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    }

    .card:hover .overlay {
        /* On hover, become visible and slide "up" into view */
        opacity: 1;
        transform: translateY(0);
    }

    .overlay p {
        margin: 0;
        font-size: 0.95rem;
        line-height: 1.5;
        text-align: center;
        
        /* --- Text Animation --- */
        /* Start transparent and slightly down */
        opacity: 0;
        transform: translateY(20px);
        
        /* Note the transition-delay: 
           This animation only starts *after* the overlay has started sliding in. 
        */
        transition: all 0.3s ease-out 0.15s;
    }

    .card:hover .overlay p {
        /* On hover, text fades and slides in */
        opacity: 1;
        transform: translateY(0);
    }

    .footer {
        width: 100%;
        background: #131313;
        color: white;
        text-align: center;
        padding: 1rem; /* More balanced padding */
        box-sizing: border-box;
        /* Let height be flexible for longer titles */
        min-height: 50px; 
        
        display: flex;
        justify-content: center;
        align-items: center;
        
        /* This separates footer from the image-container's border-radius */
        border-top: 1px solid rgba(255, 255, 255, 0.1); 
    }

    .footer h2 {
        color: white;
        margin: 0;
        font-size: 1.1rem;
        font-weight: 600;
        word-wrap: break-word;
        max-width: 100%;
        transition: color 0.2s ease;
    }

    /* Add feedback by changing title color on hover */
    .card:hover .footer h2 {
        color: #4fc3f7; /* Example accent color */
    }
</style>