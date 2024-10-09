<script lang="ts">
    import Circles from "$lib/assets/Circles.svelte";
    import Corner from "$lib/assets/Corner.svelte";
    import LeftDotGrid from "$lib/assets/LeftDotGrid.svelte";
    import LeftLinesThingy from "$lib/assets/LeftLinesThingy.svelte";
    import MiddleCircleThingy from "$lib/assets/MiddleCircleThingy.svelte";
    import OuterCircleThingy from "$lib/assets/OuterCircleThingy.svelte";
    import RightSquaresThing from "$lib/assets/RightSquaresThing.svelte";
    import ScatteredLines from "$lib/assets/ScatteredLines.svelte";
    import ScatteredSquares from "$lib/assets/ScatteredSquares.svelte";
    import Button from "$lib/components/ui/button/button.svelte";
    import { horizontalLoop } from "$lib/helpers/horizontalLoop";
    import { currentTheme } from "$lib/stores/stores";
    import { onMount } from "svelte";
    import gsap from "gsap";

    // const InertiaPlugin = require("https://s3-us-west-2.amazonaws.com/s.cdpn.io/16327/InertiaPlugin.min.js");

    // gsap.registerPlugin(InertiaPlugin);

    let floatingThings: gsap.TweenTarget[];
    onMount(() => {
        currentTheme.subscribe((value) => {
            document.getElementsByTagName("html")[0].dataset.theme = value;
        });

        // border text animation --------------------------------------

        const leftBorderWords = gsap.utils.toArray(".border-word-left");
        const rightBorderWords = gsap.utils.toArray(".border-word-right");

        const leftLoop = horizontalLoop(leftBorderWords, {
            paused: false,
            repeat: -1,
            speed: 0.5,
            reversed: true,
        });

        const rightLoop = horizontalLoop(rightBorderWords, {
            paused: false,
            repeat: -1,
            speed: 0.5,
            // reversed: true,
        });

        // -------------------------------------------------------------

        // floating things animation -----------------------------------

        floatingThings = gsap.utils.toArray(".floating-thing");

        // const floatingTl = gsap.timeline({
        //     repeat: -1,
        //     // yoyo: true,
        //     defaults: { duration: 3, ease: "power1.inOut" },
        //     repeatRefresh: true,
        // });

        floatingThings.forEach((thing) => {
            gsap.to(thing, {
                x: "random(-10, 10)",
                y: "random(-10, 10)",
                rotation: "random(-5, 5)",
                duration: 3,
                ease: "power1.inOut",
                repeatRefresh: true,
                repeat: -1,
                position: "start",
            });
        });

        gsap.to(".heading-text", {
            x: "random(-10, 10)",
            y: "random(-10, 10)",
            duration: 3,
            ease: "power1.inOut",
            repeatRefresh: true,
            repeat: -1,
            position: "start",
        });

        // -------------------------------------------------------------
    });
</script>

<svelte:window
    on:mousemove={(event) =>
        gsap.to(".floating-thing-wrapper", {
            // inertia: {
                x: - event.clientX / 100,
                y: - event.clientY / 100,
            // },
        })}
/>

<main
    class="w-screen h-screen {$currentTheme === 'blue'
        ? 'bg-[linear-gradient(180deg,_#3651A2_68%,_#009BAA_100%)]'
        : 'bg-theme-bg'} flex items-center justify-center"
>
    <Corner class="fixed top-4 left-4 fill-theme-main" />
    <Corner class="fixed -rotate-90 bottom-4 left-4 fill-theme-main" />
    <Corner class="fixed rotate-90 top-4 right-4 fill-theme-main" />
    <Corner class="fixed rotate-180 bottom-4 right-4 fill-theme-main" />

    <span
        class="border-text origin-top-left rotate-90 fixed top-14 left-6 w-[40vh] whitespace-nowrap"
    >
        <span class="border-word-left">CULTURE </span>
        <span class="border-word-left">CLUB </span>
        <span class="border-word-left">友達 </span>
        <span class="border-word-left">EXPLORE </span>
        <span class="border-word-left">楽しい </span>
        <span class="border-word-left">時間 </span>
        <span class="border-word-left pr-3">アイスブレーカー</span>
    </span>
    <span
        class="border-text text-right origin-bottom-right rotate-90 fixed bottom-14 right-7 w-[40vh] whitespace-nowrap"
    >
        <span class="border-word-right">CULTURE </span>
        <span class="border-word-right">CLUB </span>
        <span class="border-word-right">友達 </span>
        <span class="border-word-right">EXPLORE </span>
        <span class="border-word-right">楽しい </span>
        <span class="border-word-right">時間 </span>
        <span class="border-word-right">アイスブレーカー</span>
    </span>

    <LeftDotGrid
        class="fixed lg:top-10 lg:left-10 -top-14 -left-2 lg:scale-100 scale-50"
    />

    <LeftLinesThingy class="fixed top-1/3 left-7" />

    <div
        class="flex w-screen fixed -top-1 left-20 justify-center "
    >
        <ScatteredSquares class="fixed lg:scale-100 scale-50" />
    </div>

    <div
        class="flex w-screen fixed top-1/3 lg:top-1/2 md:top-1/2 left-12 justify-center"
    >
        <ScatteredLines class="scale-[200%] lg:scale-100 md:scale-100" />
    </div>

    <div
        class="fixed origin-center outer-spin -bottom-52 -left-56 lg:-bottom-[9vh] lg:left-[3vw]"
    >
        <OuterCircleThingy
            class="lg:h-[70vh] lg:w-[70vh] scale-50 lg:scale-100"
        />
    </div>
    <div
        class="fixed origin-center inner-spin bottom-4 left-1 lg:bottom-[11vh] lg:left-[16vw]"
    >
        <MiddleCircleThingy
            class="lg:h-[30vh] lg:w-[30vh] scale-50 lg:scale-100"
        />
    </div>
    <!-- <div
        class="fixed hidden bottom-40 left-[9.3rem] lg:bottom-[20rem] lg:left-[22rem] md:bottom-[20rem] md:left-[22rem]"
    >
        <iframe
            scrolling="no"
            frameborder="no"
            allow="autoplay"
            class="rounded-lg w-16 h-16 lg:w-32 lg:h-32 md:w-32 md:h-32"
            title="Soundcloud"
            src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1735105293&color=%23ff5500&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
        ></iframe>
    </div> -->
    <!-- <iframe style="border-radius:12px" src="https://open.spotify.com/embed/album/3i3lIKOwRrgjqXE4szznpN?utm_source=generator" width="100%" height="300" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe> -->
    <!-- <iframe class="rounded-lg" width="300" height="300" src="https://www.youtube-nocookie.com/embed/RJUvNVCqtpI?si=vMKTeZdj54ChSMMz&autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> -->

    <div
        class="fixed lg:bottom-[10vh] lg:right-[10vw] md:bottom-32 md:right-32 right-6 bottom-16 floating-thing-wrapper"
    >
        <RightSquaresThing
            class="lg:scale-100 scale-75 lg:h-[50vh] floating-thing right-squares"
        />
    </div>
    <div
        class="fixed lg:top-[10vh] lg:right-[10vw] md:top-32 top-16 right-8 md:right-40 floating-thing-wrapper"
    >
        <Circles class="lg:scale-100 scale-90 lg:h-[30vh] floating-thing" />
    </div>

    <div
        class="fixed lg:top-12 top-14 lg:left-[10vw] left-12 font-rampartOne w-fit z-50 floating-thing-wrapper"
    >
        <div
            class="lg:text-[18vh] text-7xl text-theme-main relative leading-tight heading-text"
        >
            <span
                class="uppercase lg:text-2xl md:text-2xl text-base absolute -rotate-[5deg] lg:left-6 md:left-6"
                >japanese</span
            >
            <span
                class="uppercase lg:text-2xl md:text-2xl text-base absolute -rotate-[5deg] lg:left-1/2 md:left-1/2 lg:top-0 md:top-0 top-1/3"
                >culture</span
            >
            <span
                class="uppercase lg:text-2xl md:text-2xl text-base absolute -rotate-[5deg] lg:top-1/2 md:top-1/2 top-2/3 lg:left-6 md:left-6"
                >club</span
            >

            日本<br class="lg:hidden md:hidden" />文化<br />クラブ
        </div>
    </div>

    <div
        class="rounded-r rounded-bl-xl border border-theme-obj desc text-theme-main lg:w-[32vw] w-[50vw] h-[13vh] lg:h-fit overflow-scroll lg:p-4 p-2 fixed lg:right-72 right-32 font-notoSerifJP font-bold lg:text-xl text-sm lg:top-1/2"
    >
        2024 年 10 月 18 日 (金) 午後 5 時から午後 8
        時まで開催される毎年恒例のアイスブレイク イベントにぜひご参加ください。
        <br /> <br />
        Join us in our annual ice breaking event on October 18, 2024 (Friday) 5:00pm
        to 8:00pm.
    </div>

    <div class="fixed top-12 right-12 z-10 hidden">
        <Button
            on:click={() => {
                $currentTheme === "default"
                    ? currentTheme.set("pink")
                    : $currentTheme === "pink"
                      ? currentTheme.set("blue")
                      : currentTheme.set("default");
            }}>e</Button
        >
    </div>
</main>

<style type="postcss">
    .border-text {
        @apply font-jsmath text-xs italic font-semibold tracking-[0.25em] text-theme-main flex items-center gap-3 overflow-hidden;
    }

    .inner-spin {
        animation: spin 20s linear infinite;
    }

    .outer-spin {
        animation: outer-spin 30s linear infinite;
    }

    .heading-text {
        /* border: 2px solid #FCF1FD; */
        /* -webkit-text-stroke: 2px #FCF1FD; */
    }

    .desc {
    }

    @keyframes spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }

    @keyframes outer-spin {
        from {
            transform: rotate(360deg);
        }
        to {
            transform: rotate(0deg);
        }
    }
</style>
