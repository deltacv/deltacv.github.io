<script lang="ts">
    import { onMount } from "svelte";
    import { ChevronDown } from "lucide-svelte";
    import { m } from "$lib/media";

    interface Props {
        title: string;
        titleGradient?: string;
        videoSrc: string;
        typingWords?: string[];
        introPreText?: string;
        introPostText?: string;
        scrollIndicatorColorClass?: string;
        videoFit?: "cover" | "contain";
        actions?: import('svelte').Snippet;
    }

    let {
        title,
        titleGradient = "linear-gradient(to right, #22d3ee, #0ea5e9)",
        videoSrc,
        typingWords = [],
        introPreText = "",
        introPostText = "",
        scrollIndicatorColorClass = "text-cyan-400",
        videoFit = "cover",
        actions
    }: Props = $props();

    let currentWord = $state("");
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 150;

    function type() {
        if (typingWords.length === 0) return;
        const fullWord = typingWords[wordIndex];

        if (isDeleting) {
            currentWord = fullWord.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 100;
        } else {
            currentWord = fullWord.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 150;
        }

        if (!isDeleting && charIndex === fullWord.length) {
            isDeleting = true;
            typeSpeed = 2000;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % typingWords.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }

    let pauseSnapUntil = 0;

    onMount(() => {
        if (typingWords.length > 0) {
            type();
        }

        let isSnapping = false;
        let animationFrameId: number;

        function animateScrollTo(targetY: number, duration: number) {
            const startY = window.scrollY;
            const distance = targetY - startY;
            const startTime = performance.now();

            function animation(currentTime: number) {
                const elapsedTime = currentTime - startTime;
                const progress = Math.min(elapsedTime / duration, 1);
                
                // EaseOutQuart: snappy start, very smooth finish
                const ease = 1 - Math.pow(1 - progress, 4);

                window.scrollTo(0, startY + distance * ease);

                if (progress < 1) {
                    animationFrameId = requestAnimationFrame(animation);
                } else {
                    setTimeout(() => { isSnapping = false; }, 50);
                }
            }

            animationFrameId = requestAnimationFrame(animation);
        }

        const handleWheel = (e: WheelEvent) => {
            if (Date.now() < pauseSnapUntil) return;
            if (isSnapping) return;

            const heroHeight = window.innerHeight;
            const scrollY = window.scrollY;

            // Snap down
            if (scrollY < 50 && e.deltaY > 15) {
                e.preventDefault();
                isSnapping = true;
                animateScrollTo(heroHeight, 500); // 500ms is fast but visible
            } 
            // Snap up
            else if (scrollY > 10 && scrollY < heroHeight + 50 && e.deltaY < -15) {
                if (scrollY < heroHeight + 10) {
                  e.preventDefault();
                  isSnapping = true;
                  animateScrollTo(0, 500);
                }
            }
        };

        const handlePause = () => {
            pauseSnapUntil = Date.now() + 1500;
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
            isSnapping = false;
        };

        window.addEventListener("wheel", handleWheel, { passive: false });
        window.addEventListener("pause-hero-scroll", handlePause);

        return () => {
            window.removeEventListener("wheel", handleWheel);
            window.removeEventListener("pause-hero-scroll", handlePause);
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
        };
    });
</script>

<section class="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#05070a]">
    <!-- Background Video -->
    <div class="absolute inset-0 z-0 animate-hero-bg">
        <video
            src={videoSrc}
            autoplay
            loop
            muted
            playsinline
            class="w-full h-full object-{videoFit}"
        ></video>
        <div class="absolute inset-0 bg-gradient-to-b from-[#05070a]/40 via-transparent to-[#05070a]"></div>
    </div>

    <div class="container mx-auto px-6 relative z-10">
        <div class="flex flex-col items-center gap-12">
            <!-- Left Side: Text -->
            <div class="max-w-4xl text-center">
                <h1 class="text-6xl md:text-8xl font-black tracking-tighter mb-6 animate-hero-title">
                    <span style="background: {titleGradient}; -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
                        {title}
                    </span>
                </h1>
                
                <p class="text-xl md:text-2xl text-gray-300 font-medium mb-8 leading-relaxed animate-hero-text" style="animation-delay: 0.1s;">
                    {introPreText}
                    <span class="inline-block min-w-[120px] text-white border-b-2 border-white/30 pb-1">
                        {currentWord}<span class="cursor-blink">|</span>
                    </span>
                    {introPostText}
                </p>

                <div class="flex flex-col sm:flex-row items-center justify-center gap-4 animate-hero-text" style="animation-delay: 0.2s;">
                    {#if actions}
                        {@render actions()}
                    {/if}
                </div>
            </div>
        </div>
    </div>

    <!-- Scroll Indicator -->
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce cursor-pointer z-10 {scrollIndicatorColorClass} animate-hero-text"
         style="animation-delay: 0.6s;"
         onclick={() => { 
            pauseSnapUntil = Date.now() + 1000;
            window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
         }}>
        <span class="text-[10px] font-bold tracking-[0.2em] uppercase opacity-50">Scroll</span>
        <ChevronDown size={24} />
    </div>
</section>

<style>
    :global(html) {
        scroll-behavior: auto;
    }

    .cursor-blink {
        animation: blink 1s step-end infinite;
    }

    @keyframes blink {
        0%, 100% { opacity: 1; }
        50% { opacity: 0; }
    }

    .animate-hero-bg {
        animation: hero-bg-in 2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }

    .animate-hero-text {
        opacity: 0;
        animation: hero-text-in 1.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }

    .animate-hero-title {
        opacity: 0;
        animation: hero-title-in 1.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }

    @keyframes hero-bg-in {
        from {
            opacity: 0;
            transform: scale(1.4);
            filter: blur(30px) brightness(0.2);
        }
        to {
            opacity: 0.4;
            transform: scale(1);
            filter: blur(0) brightness(1);
        }
    }

    @keyframes hero-text-in {
        from {
            opacity: 0;
            transform: translateY(60px) scale(0.95);
        }
        to {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
    }

    @keyframes hero-title-in {
        from {
            opacity: 0;
            transform: translateY(100px) scale(0.85);
            letter-spacing: 0.1em;
        }
        to {
            opacity: 1;
            transform: translateY(0) scale(1);
            letter-spacing: -0.05em;
        }
    }
</style>
