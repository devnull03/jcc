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
    import { currentTheme } from "$lib/stores";
    import { onMount } from "svelte";

    onMount(() => {
        currentTheme.subscribe((value) => {
            document.getElementsByTagName("html")[0].dataset.theme = value;
        });
    });
</script>

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
        class="border-text origin-top-left rotate-90 fixed top-14 left-6 text-theme-main w-[100vh]"
        >CULTURE　CLUB　友達　EXPLORE　楽しい　時間　アイスブレーカー
    </span>
    <span
        class="border-text text-right origin-bottom-right rotate-90 fixed bottom-14 right-7 text-theme-main w-[100vh]"
        >CULTURE　CLUB　友達　EXPLORE　楽しい　時間　アイスブレーカー
    </span>

    <LeftDotGrid class="fixed lg:top-10 lg:left-10 -top-14 -left-2 lg:scale-100 scale-50" />

    <LeftLinesThingy class="fixed top-1/3 left-7" />

    <div class="flex w-screen fixed -top-1 left-20 justify-center">
        <ScatteredSquares class="fixed lg:scale-100 scale-50" />
    </div>

    <div
        class="flex w-screen fixed top-1/3 lg:top-1/2 md:top-1/2 left-12 justify-center"
    >
        <ScatteredLines class="scale-[200%] lg:scale-100 md:scale-100" />
    </div>

    <div
        class="fixed origin-center outer-spin -bottom-52 -left-56 lg:-bottom-16 lg:left-8"
    >
        <OuterCircleThingy class="scale-50 lg:scale-100" />
    </div>
    <div
        class="fixed origin-center inner-spin bottom-4 left-1 lg:bottom-40 lg:left-64"
    >
        <MiddleCircleThingy class="scale-50 lg:scale-100" />
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

    <RightSquaresThing
        class="fixed lg:bottom-32 lg:right-32 md:bottom-32 md:right-32 right-6 bottom-16 lg:scale-125 md:scale-125 scale-75"
    />
    <Circles
        class="fixed lg:top-32 lg:right-40 md:top-32 top-16 right-8 md:right-40 lg:scale-125 md:scale-125 scale-90"
    />

    <div
        class="fixed lg:top-12 md:top-12 top-14 lg:left-40 md:left-40 left-12 font-rampartOne w-fit z-50"
    >
        <div
            class="lg:text-[10rem] md:text-[10rem] text-7xl text-theme-main relative leading-tight heading-text"
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

    <div class="fixed top-12 right-12 z-10">
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
        @apply font-jsmath text-xs italic font-semibold tracking-[0.25em];
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
