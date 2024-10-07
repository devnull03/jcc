<script>
    import { PUBLIC_COMPANY_NAME } from "$env/static/public";
    import Footer from "$lib/Footer.svelte";
    import Header from "$lib/Header.svelte";
    import "../app.css";
</script>

<svelte:head>
    <title>{PUBLIC_COMPANY_NAME}</title>
    <link
        href="https://fonts.cdnfonts.com/css/jsmath-cmmi10"
        rel="stylesheet"
    />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
        href="https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@200..900&family=Rampart+One&display=swap"
        rel="stylesheet"
    />
</svelte:head>


<!-- <div class="h-screen flex flex-col justify-between">
  <Header /> 
  <main class="h-full mt-16">
    <slot />
  </main>
  <Footer />
</div> -->

<slot />
