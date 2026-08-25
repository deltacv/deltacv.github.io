<script lang="ts">
    import ProjectHero from "$lib/projects/ProjectHero.svelte";
    import Feature from "$lib/projects/Feature.svelte";

    import { m } from "$lib/media";
    import MediaElement from "$lib/ui/MediaElement.svelte";

    // 2. IMPORTAMOS SVELTESPLIDE (El carrusel)
    import { Splide, SplideSlide } from "@splidejs/svelte-splide";

    // Importamos el tema por defecto (esto añade los círculos)
    import "@splidejs/svelte-splide/css";

    import {
        Eye,
        Code2,
        SlidersHorizontal,
        Zap,
        Tag,
        Video,
        MonitorPlay,
        Download,
        Camera,
        Image as ImageIcon,
        ArrowRight,
    } from "lucide-svelte";
    import NodeConnection from "$lib/icons/NodeConnection.svelte";

    const productName = "VisionGraph";

    // 4. OPCIONES DEL CARRUSEL
    const splideOptions = {
        type: "loop",
        perPage: 1,
        autoplay: "pause" as "pause",
        interval: 4000,
        pauseOnHover: true,
        gap: "1rem",
        arrows: false,
    };

    let splideRef: any = $state(null);

    function playWhenVisible(node: HTMLElement) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const autoplay = splideRef?.splide?.Components?.Autoplay;
                    if (!autoplay) return;

                    if (entry.isIntersecting) {
                        autoplay.play();
                    } else {
                        autoplay.pause();
                    }
                });
            },
            { threshold: 0.2 },
        );

        observer.observe(node);

        // Sync with video duration
        if (splideRef?.splide) {
            splideRef.splide.on("active", (slide: any) => {
                const video = slide.slide.querySelector("video");
                const autoplay = splideRef.splide.Components.Autoplay;

                if (video) {
                    autoplay.pause();
                    video.onended = () => {
                        splideRef.splide.go(">");
                        autoplay.play();
                    };
                } else {
                    autoplay.play();
                }
            });
        }

        return {
            destroy() {
                observer.disconnect();
            },
        };
    }
</script>

<svelte:head>
    <title>{productName} - OpenCV Node Editor | deltacv</title>
    <meta
        name="description"
        content="{productName} is a node-based visual editor for OpenCV pipelines. Prototype, tune, and export complex computer vision algorithms without writing a single line of code."
    />
    <meta
        name="keywords"
        content="OpenCV node editor, Visual Pipeline Editor, OpenCV, Computer Vision, Node Editor, Visual Programming, Code Generation, Java, Python"
    />

    <!-- Open Graph / Social Media -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://deltacv.org/visiongraph" />
    <meta property="og:title" content="{productName} - OpenCV Node Editor" />
    <meta
        property="og:description"
        content="Prototype, tune, and export complex computer vision algorithms without writing a single line of code."
    />
    <meta property="og:image" content={m("/papervision-hero.mp4")} />

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content="https://deltacv.org/visiongraph" />
    <meta
        property="twitter:title"
        content="{productName} - OpenCV Node Editor"
    />
    <meta
        property="twitter:description"
        content="Prototype, tune, and export complex computer vision algorithms without writing a single line of code."
    />
    <meta property="twitter:image" content={m("/papervision.png")} />

    <link rel="canonical" href="https://deltacv.org/visiongraph" />

    <!-- Structured Data -->
    <!-- eslint-disable-next-line svelte/no-at-html-tags -->
    {@html `<script type="application/ld+json">
        {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "${productName}",
            "operatingSystem": "Windows, macOS, Linux",
            "applicationCategory": "DeveloperApplication",
            "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
            },
            "description": "${productName} is a node-based visual editor for OpenCV pipelines. Prototype, tune, and export complex computer vision algorithms.",
            "author": {
                "@type": "Organization",
                "name": "deltacv",
                "url": "https://deltacv.org"
            }
        }
    </script>`}
</svelte:head>

<div class="project-page-wrapper">
    <ProjectHero
        title={productName}
        titleGradient="linear-gradient(to right, #fbbf24, #f59e0b, #ea580c)"
        videoSrc={m("/papervision-hero.mp4")}
        typingWords={["create", "prototype", "tune", "export"]}
        introPreText="Visually"
        introPostText="your computer vision pipelines."
        scrollIndicatorColorClass="text-amber-400"
        videoFit="contain"
        bannerText="PaperVision is now VisionGraph"
    >
        {#snippet actions()}
            <div class="flex flex-col gap-4 w-full sm:w-fit">
                <!-- Top Download Button -->
                <a
                    href="#integration"
                    onclick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        window.dispatchEvent(new Event("pause-hero-scroll"));
                        document.getElementById("integration")?.scrollIntoView({
                            behavior: "smooth",
                            block: "center",
                        });
                    }}
                    class="w-full px-8 py-3.5 font-bold text-gray-900 bg-amber-500 rounded-xl hover:bg-amber-400 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2.5"
                >
                    <Download size={20} />
                    Download
                </a>

                <!-- Bottom Buttons Row -->
                <div class="flex flex-col sm:flex-row gap-4 w-full">
                    <a
                        href="https://docs.deltacv.org/papervision/"
                        class="flex-1 px-8 py-3.5 font-semibold text-white bg-gray-800/80 backdrop-blur border border-gray-700/80 rounded-xl hover:bg-gray-700/80 hover:border-gray-500/50 transition-all transform hover:-translate-y-1 text-center shadow-lg whitespace-nowrap"
                    >
                        Read the Docs
                    </a>
                    <a
                        href="https://github.com/deltacv/PaperVision"
                        class="flex-1 px-8 py-3.5 font-semibold text-white bg-gray-800/80 backdrop-blur border border-gray-700/80 rounded-xl hover:bg-gray-700/80 hover:border-gray-500/50 transition-all transform hover:-translate-y-1 text-center shadow-lg whitespace-nowrap"
                    >
                        View Source
                    </a>
                </div>
            </div>
        {/snippet}
    </ProjectHero>

    <main class="container mx-auto max-w-6xl px-6 py-24 text-gray-100">
        <section class="my-32 relative">
            <div
                class="rounded-xl p-8 md:p-14 border border-gray-800 bg-[#0d1117] max-w-5xl mx-auto relative overflow-hidden group"
            >
                <div
                    class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10"
                >
                    <div>
                        <h2
                            class="text-3xl md:text-5xl font-extrabold text-white tracking-tight"
                        >
                            It's powerful.
                        </h2>
                        <p
                            class="mt-6 text-lg md:text-xl text-gray-300 leading-relaxed"
                        >
                            {productName} is a visual node editor built for
                            <span class="text-amber-400 font-semibold"
                                >beginners and experts alike</span
                            >. It bridges the gap between conceptual design and
                            executed algorithms, letting you prototype complex
                            computer vision pipelines without writing endless
                            lines of boilerplate code.
                        </p>
                    </div>

                    <div class="flex flex-col gap-12 mt-2">
                        <div
                            class="pl-6 py-4 border-l-2 border-[#30363d] hover:border-amber-500/60 transition-colors duration-300"
                        >
                            <h4
                                class="text-xl text-white font-semibold tracking-tight mb-3 flex items-center gap-3"
                            >
                                <Zap
                                    size={22}
                                    strokeWidth={2}
                                    color="currentColor"
                                    class="text-amber-500/80"
                                />
                                Visual First Approach
                            </h4>
                            <p class="text-[#8b949e] leading-relaxed">
                                Connect nodes, tweak parameters natively, and
                                understand your pipeline's flow at a glance.
                            </p>
                        </div>
                        <div
                            class="pl-6 py-4 border-l-2 border-[#30363d] hover:border-blue-500/60 transition-colors duration-300"
                        >
                            <h4
                                class="text-xl text-white font-semibold tracking-tight mb-3 flex items-center gap-3"
                            >
                                <Code2
                                    size={22}
                                    strokeWidth={2}
                                    color="currentColor"
                                    class="text-blue-500/80"
                                />
                                Production Ready Export
                            </h4>
                            <p class="text-[#8b949e] leading-relaxed">
                                When you're happy with the vision prototype,
                                generate native Java & Python code instantly.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section
            class="max-w-4xl w-full mx-auto mt-16 mb-24"
            use:playWhenVisible
        >
            <Splide
                bind:this={splideRef}
                options={splideOptions}
                aria-label="{productName} Showcase"
            >
                <SplideSlide class="pb-12 text-center">
                    <figure
                        class="img-shimmer rounded-lg w-fit mx-auto inline-block"
                    >
                        <MediaElement
                            src={m("papervision-guidedtour.png")}
                            alt="{productName} Guided Tour in the editor"
                            class="rounded-lg shadow-2xl shadow-amber-900/20 border border-gray-700 max-h-[450px] w-auto object-contain"
                        />
                    </figure>
                    <p class="mt-4 text-sm text-gray-400 max-w-lg mx-auto">
                        Learn about {productName} in the integrated guided tour.
                    </p>
                </SplideSlide>

                <SplideSlide class="pb-12 text-center">
                    <figure
                        class="img-shimmer rounded-lg w-fit mx-auto inline-block"
                    >
                        <MediaElement
                            src={m("papervision-nodes.mp4")}
                            alt="{productName}'s variety of nodes"
                            class="rounded-lg shadow-2xl shadow-amber-900/20 border border-gray-700 max-h-[450px] w-auto object-contain"
                            loop={false}
                        />
                    </figure>
                    <p class="mt-4 text-sm text-gray-400 max-w-lg mx-auto">
                        A wide variety of nodes for image processing, computer
                        vision, and more.
                    </p>
                </SplideSlide>

                <SplideSlide class="pb-12 text-center">
                    <figure
                        class="img-shimmer rounded-lg w-fit mx-auto inline-block"
                    >
                        <MediaElement
                            src={m("papervision-tuner.mp4")}
                            alt="{productName}'s editor being used for fine tuning a pipeline"
                            class="rounded-lg shadow-2xl shadow-amber-900/20 border border-gray-700 max-h-[450px] w-auto object-contain"
                            loop={false}
                        />
                    </figure>
                    <p class="mt-4 text-sm text-gray-400 max-w-lg mx-auto">
                        Seamlessly visualize and tune your pipeline.
                    </p>
                </SplideSlide>

                <SplideSlide class="pb-12 text-center">
                    <figure
                        class="img-shimmer rounded-lg w-fit mx-auto inline-block"
                    >
                        <MediaElement
                            src={m("papervision-code.png")}
                            alt="{productName}'s code generation feature"
                            class="rounded-lg shadow-2xl shadow-amber-900/20 border border-gray-700 max-h-[450px] w-auto object-contain"
                        />
                    </figure>
                    <p class="mt-4 text-sm text-gray-400 max-w-lg mx-auto">
                        Generate clean, corresponding Java pipeline code.
                    </p>
                </SplideSlide>

                <SplideSlide class="pb-12 text-center">
                    <figure
                        class="img-shimmer rounded-lg w-fit mx-auto inline-block"
                    >
                        <MediaElement
                            src={m("papervision-code-python.png")}
                            alt="{productName}'s code generation feature in Python"
                            class="rounded-lg shadow-2xl shadow-amber-900/20 border border-gray-700 max-h-[450px] w-auto object-contain"
                        />
                    </figure>
                    <p class="mt-4 text-sm text-gray-400 max-w-lg mx-auto">
                        And Python too!
                    </p>
                </SplideSlide>
            </Splide>
        </section>

        <section class="my-24">
            <h2 class="text-center text-4xl font-bold tracking-tighter">
                A Modern Toolkit for CV
            </h2>
            <p class="text-center mt-3 text-lg text-gray-400">
                From visual editing to live simulation.
            </p>

            <div
                class="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
                <!-- 1. Visual Node Editor (amber, 2-cols) -->
                <Feature
                    icon={Zap}
                    title="Node-Based Pipeline Editor"
                    desc="Drag, drop, and connect nodes to intuitively build complex algorithms without manual boilerplate."
                    color="amber"
                    class="md:col-span-2 lg:col-span-2 group/pv flex flex-col"
                >
                    <div
                        class="mt-6 flex-1 min-h-[140px] border border-amber-500/20 bg-[#121016] rounded-xl overflow-hidden relative shadow-inner shadow-amber-900/20"
                    >
                        <div
                            class="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:16px_16px]"
                        ></div>
                        <NodeConnection />
                        <div
                            class="absolute inset-0 p-5 flex flex-col md:flex-row gap-6 md:gap-20 items-start z-10 w-full"
                        >
                            <div
                                class="bg-gray-800/90 border border-gray-700 p-3 rounded-xl min-w-[160px] shadow-2xl group-hover/pv:-translate-y-1 group-data-[mobile-active=true]/pv:-translate-y-1 transition-transform duration-500 backdrop-blur-md relative z-10"
                            >
                                <div
                                    class="hidden md:block absolute right-[-6px] top-[16px] w-2.5 h-2.5 bg-amber-500 rounded-full border border-gray-800"
                                ></div>
                                <div
                                    class="bg-amber-500/20 text-amber-400 text-[9px] uppercase font-bold tracking-wider px-2 py-1 rounded inline-block mb-3"
                                >
                                    Color Threshold
                                </div>
                                <div
                                    class="h-1.5 bg-gray-700 rounded-full w-full mb-2"
                                ></div>
                                <div
                                    class="h-1.5 bg-gray-700/50 rounded-full w-2/3"
                                ></div>
                            </div>
                            <div
                                class="bg-gray-800/90 border border-gray-700 p-3 rounded-xl min-w-[160px] shadow-2xl group-hover/pv:-translate-y-1 group-data-[mobile-active=true]/pv:-translate-y-1 transition-transform duration-500 delay-75 backdrop-blur-md relative z-10 ml-8 md:ml-0 md:mt-10"
                            >
                                <div
                                    class="hidden md:block absolute left-[-6px] top-[16px] w-2.5 h-2.5 bg-amber-500 rounded-full border border-gray-800 opacity-50 group-hover/pv:opacity-100 group-data-[mobile-active=true]/pv:opacity-100 transition-opacity"
                                ></div>
                                <div
                                    class="bg-emerald-500/20 text-emerald-400 text-[9px] uppercase font-bold tracking-wider px-2 py-1 rounded inline-block mb-3"
                                >
                                    Find Contours
                                </div>
                                <div
                                    class="h-1.5 bg-gray-700 rounded-full w-3/4 mb-2"
                                ></div>
                                <div
                                    class="h-1.5 bg-gray-700/50 rounded-full w-1/2"
                                ></div>
                            </div>
                        </div>
                    </div>
                </Feature>

                <!-- 2. Real-Time Node Previews (rose, 1-col) -->
                <Feature
                    icon={Eye}
                    title="Real-Time Previews"
                    desc="Instantly see the output of every single node in your pipeline to debug faster."
                    color="rose"
                    class="group/ui flex flex-col"
                >
                    <div class="mt-auto pt-6 flex justify-center">
                        <div
                            class="relative w-full max-w-[200px] bg-[linear-gradient(45deg,#1f2937_25%,transparent_25%,transparent_75%,#1f2937_75%,#1f2937),linear-gradient(45deg,#1f2937_25%,transparent_25%,transparent_75%,#1f2937_75%,#1f2937)] bg-[length:16px_16px] bg-[position:0_0,8px_8px] overflow-hidden rounded-xl border border-gray-700/50 shadow-inner h-32 flex items-center justify-center"
                        >
                            <div
                                class="relative w-16 h-16 border-2 border-rose-500 rounded-lg rotate-12 group-hover/ui:rotate-45 group-data-[mobile-active=true]/ui:rotate-45 transition-transform duration-1000 backdrop-blur-sm"
                            >
                                <div
                                    class="absolute inset-2 border border-blue-500/50 border-dashed rounded flex flex-col items-center justify-center bg-blue-500/10"
                                >
                                    <span
                                        class="text-blue-400 text-[8px] font-mono whitespace-nowrap group-hover/ui:scale-110 group-data-[mobile-active=true]/ui:scale-110 transition-transform"
                                        >Sides: 4</span
                                    >
                                </div>
                            </div>
                        </div>
                    </div>
                </Feature>

                <!-- 3. Live Parameter Tuning (cyan, 1-col) -->
                <Feature
                    icon={SlidersHorizontal}
                    title="Live Parameter Tuning"
                    desc="Allows you to adjust pipeline parameters in real-time."
                    color="cyan"
                    class="group/tune flex flex-col hover:border-cyan-500/50 data-[mobile-active=true]:border-cyan-500/50"
                >
                    <div class="mt-auto pt-6">
                        <div
                            class="border border-cyan-500/20 bg-gray-900/50 rounded-xl p-3.5 shadow-inner shadow-cyan-900/20 flex flex-col gap-3"
                        >
                            <div class="flex flex-col gap-1.5">
                                <div
                                    class="flex items-center justify-between text-[10px] font-mono uppercase font-bold text-gray-400"
                                >
                                    <span>blur_size</span>
                                    <span
                                        class="text-cyan-400 group-hover/tune:text-cyan-300 group-data-[mobile-active=true]/tune:text-cyan-300 transition-colors w-8 text-right"
                                        >3.5</span
                                    >
                                </div>
                                <div
                                    class="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden"
                                >
                                    <div
                                        class="h-full bg-cyan-500/60 w-[35%] group-hover/tune:w-[75%] group-data-[mobile-active=true]/tune:w-[75%] transition-all duration-1000 ease-out relative"
                                    >
                                        <div
                                            class="absolute right-0 top-0 bottom-0 w-1.5 bg-cyan-400 rounded-full"
                                        ></div>
                                    </div>
                                </div>
                            </div>
                            <div class="flex flex-col gap-1.5">
                                <div
                                    class="flex items-center justify-between text-[10px] font-mono uppercase font-bold text-gray-400"
                                >
                                    <span>threshold</span>
                                    <span
                                        class="text-rose-400 group-hover/tune:text-rose-300 group-data-[mobile-active=true]/tune:text-rose-300 transition-colors w-8 text-right"
                                        >128</span
                                    >
                                </div>
                                <div
                                    class="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden"
                                >
                                    <div
                                        class="h-full bg-rose-500/60 w-[60%] group-hover/tune:w-[25%] group-data-[mobile-active=true]/tune:w-[25%] transition-all duration-1000 ease-out relative"
                                    >
                                        <div
                                            class="absolute right-0 top-0 bottom-0 w-1.5 bg-rose-400 rounded-full"
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Feature>

                <!-- 4. One-Click Code Generation (emerald, 2-cols) -->
                <Feature
                    icon={Code2}
                    title="One-Click Code Generation"
                    desc={"Generates clean, corresponding Java & Python pipeline code for your project.\n\nInstantly transition from a visual prototype to production-ready code with zero manual transcription or translation errors."}
                    color="emerald"
                    class="md:col-span-2 lg:col-span-2 flex flex-col group/cg md:[&>div>p]:max-w-[45%] md:[&>div>h3]:max-w-[45%]"
                >
                    <div
                        class="hidden md:flex absolute right-0 bottom-0 w-[50%] max-w-sm h-full max-h-[145px] flex-col bg-gray-900 border-l border-t border-emerald-500/30 rounded-tl-xl rounded-br-[22px] shadow-2xl transition-all duration-500 group-hover/cg:-translate-x-3 group-data-[mobile-active=true]/cg:-translate-x-3 group-hover/cg:-translate-y-3 group-data-[mobile-active=true]/cg:-translate-y-3 group-hover/cg:border-emerald-400/50 group-data-[mobile-active=true]/cg:border-emerald-400/50 z-0 overflow-hidden pointer-events-none"
                    >
                        <div
                            class="bg-gray-800/80 px-3 py-1.5 flex items-center border-b border-gray-700"
                        >
                            <span
                                class="text-[8px] text-gray-400 font-mono tracking-widest uppercase"
                                >MyPipeline.java</span
                            >
                        </div>
                        <div
                            class="p-4 text-[10px] font-mono leading-loose text-gray-300 opacity-70 group-hover/cg:opacity-100 group-data-[mobile-active=true]/cg:opacity-100 transition-opacity"
                        >
                            <span class="text-rose-400">public class</span>
                            <span class="text-amber-300">MyPipeline</span>
                            <br />
                            &nbsp;&nbsp;<span class="text-rose-400"
                                >extends</span
                            >
                            <span class="text-emerald-300">OpenCvPipeline</span>
                            &#123;<br />
                            &nbsp;&nbsp;<span class="text-rose-400">public</span
                            >
                            Mat <span class="text-blue-300">process</span>(Mat
                            <span class="text-cyan-300">input</span>) &#123;<br
                            />
                            &nbsp;&nbsp;&nbsp;&nbsp;<span class="text-gray-500"
                                >/* Generated code... */</span
                            ><br />
                            &nbsp;&nbsp;&#125;<br />
                            &#125;
                        </div>
                    </div>
                </Feature>

                <!-- 5. Custom Detections (purple, 1-col) -->
                <Feature
                    icon={Tag}
                    title="Custom Detections"
                    desc="Includes pre-built nodes for blob detectors, color thresholding, and more."
                    color="purple"
                    class="md:col-span-1 lg:col-span-1 flex flex-col"
                >
                    <div class="mt-auto pt-6 flex gap-2 flex-wrap">
                        <span
                            class="px-2.5 py-1 bg-purple-500/10 border border-purple-500/20 text-purple-400 text-[10px] font-mono rounded shadow-sm"
                            >BlobDetector</span
                        >
                        <span
                            class="px-2.5 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-mono rounded shadow-sm"
                            >ColorSpace</span
                        >
                        <span
                            class="px-2.5 py-1 bg-gray-800 border border-gray-700 text-gray-400 text-[10px] font-mono rounded shadow-sm"
                            >ThresholdNode</span
                        >
                    </div>
                </Feature>

                <!-- 6. Supports All Input Sources (blue, 2-cols) -->
                <Feature
                    icon={Video}
                    title="Supports All Input Sources"
                    desc="View images, recorded videos, or stream from webcams seamlessly within the UI."
                    color="blue"
                    class="md:col-span-2 lg:col-span-2 flex flex-col group/ui md:[&>div>p]:max-w-[45%] md:[&>div>h3]:max-w-[45%]"
                >
                    <div
                        class="hidden md:flex absolute right-0 bottom-0 w-[50%] max-w-xs h-full max-h-[145px] flex-col bg-[#0b0e14] border-l border-t border-blue-500/30 rounded-tl-xl rounded-br-[22px] shadow-2xl transition-all duration-500 group-hover/ui:-translate-x-3 group-data-[mobile-active=true]/ui:-translate-x-3 group-hover/ui:-translate-y-3 group-data-[mobile-active=true]/ui:-translate-y-3 group-hover/ui:border-blue-400/50 group-data-[mobile-active=true]/ui:border-blue-400/50 z-0 overflow-hidden backdrop-blur-xl p-5 gap-3 justify-center"
                    >
                        <div
                            class="flex items-center gap-2 bg-blue-950/40 border border-blue-500/30 px-3 py-1.5 rounded-md text-blue-400 text-[9px] font-mono shadow-inner group-hover/ui:-translate-y-1 group-data-[mobile-active=true]/ui:-translate-y-1 transition-transform duration-300"
                        >
                            <Camera size={12} class="flex-shrink-0" />
                            <span class="truncate">LIVE_WEBCAM</span>
                        </div>
                        <div
                            class="flex items-center gap-2 bg-purple-950/40 border border-purple-500/30 px-3 py-1.5 rounded-md text-purple-400 text-[9px] font-mono shadow-inner group-hover/ui:-translate-y-1 group-data-[mobile-active=true]/ui:-translate-y-1 transition-transform duration-300 delay-75"
                        >
                            <Video size={12} class="flex-shrink-0" />
                            <span class="truncate">VIDEO_TEST.MP4</span>
                        </div>
                        <div
                            class="flex items-center gap-2 bg-emerald-950/40 border border-emerald-500/30 px-3 py-1.5 rounded-md text-emerald-400 text-[9px] font-mono shadow-inner group-hover/ui:-translate-y-1 group-data-[mobile-active=true]/ui:-translate-y-1 transition-transform duration-300 delay-150"
                        >
                            <ImageIcon size={12} class="flex-shrink-0" />
                            <span class="truncate">IMAGE_01.JPG</span>
                        </div>
                    </div>
                </Feature>
            </div>
        </section>
    </main>

    <!-- Full-Width Integration Banner -->
    <section
        id="integration"
        class="w-full bg-[#05070a] border-t border-gray-800/60 py-32 px-6 relative overflow-hidden"
    >
        <div
            class="container mx-auto max-w-4xl relative z-10 text-center flex flex-col items-center"
        >
            <div class="h-1 w-12 bg-amber-500 rounded-full mb-8"></div>
            <h2
                class="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-8"
            >
                Ready to build?
            </h2>
            <p
                class="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl text-center leading-relaxed text-balance"
            >
                {productName}'s main distribution is pre-bundled with
                <a
                    href="/visionbench"
                    class="text-amber-400 hover:text-amber-300 font-bold whitespace-nowrap transition-colors decoration-amber-400/30 hover:underline underline-offset-4"
                    >VisionBench</a
                >. Check the instructions below to get started.
            </p>
            <a
                href="https://docs.deltacv.org/papervision/downloading-papervision"
                class="inline-flex items-center gap-3 px-10 py-5 font-bold text-gray-900 bg-gradient-to-r from-amber-400 to-amber-500 rounded-2xl hover:-translate-y-1 transition-all w-fit text-lg"
            >
                Download Instructions
                <ArrowRight size={24} strokeWidth={2.5} />
            </a>
        </div>
    </section>
</div>

<style>
    .project-page-wrapper {
        min-height: 100vh;
        background-color: #05070a;
        background-image: radial-gradient(
                circle at 20% 30%,
                rgba(251, 191, 36, 0.035),
                transparent 30%
            ),
            radial-gradient(
                circle at 80% 70%,
                rgba(249, 115, 22, 0.02),
                transparent 30%
            ),
            linear-gradient(rgba(48, 54, 61, 0.45) 1px, transparent 2px),
            linear-gradient(90deg, rgba(48, 54, 61, 0.45) 1px, transparent 2px);
        background-size:
            100% 100%,
            100% 100%,
            80px 80px,
            80px 80px;
        background-attachment: fixed;
    }

    /* ESTILOS DEL CARRUSEL */
    :global(.splide__pagination__page.is-active) {
        background: #facc15 !important;
        transform: scale(1.2);
    }
    :global(.splide__pagination__page) {
        background: #4b5563; /* Gris */
        opacity: 0.7;
    }
    :global(.splide__track) {
        border-radius: 0.5rem;
    }

    /* Centra la paginación (círculos) */
    :global(.splide__pagination) {
        bottom: -1.5rem;
    }
</style>
