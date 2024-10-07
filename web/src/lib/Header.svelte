<script lang="ts">
  const navLinks = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "About",
      href: "/about",
    },
    {
      name: "Contact",
      href: "/contact",
    },
  ];

</script>

<nav class="">
  <div
    class="top-0 bg-gray-300 fixed h-16 w-full z-50 flex flex-row justify-between px-[15%]"
  >
    <!-- top fixed -->
    <div class="flex flex-row justify-evenly gap-8 items-center">
      <!-- nav links -->
      {#each navLinks as link}
        <a
          href={link.href}
          class="text-xs font-semibold uppercase text-white hover:text-opacity-80 transition-colors duration-300 ease-in-out"
        >
          {link.name}
        </a>
      {/each}
    </div>

    <div class="flex flex-row items-center gap-1.5">
      <!-- nav socials -->

    </div>
  </div>
</nav>
