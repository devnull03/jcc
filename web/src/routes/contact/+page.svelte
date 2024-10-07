<script lang="ts">
    
    import { PUBLIC_COMPANY_NAME } from "$env/static/public";

    export let form;

    let name: string;
    let email: string;
    let phone: string;
    let message: string;

</script>

<svelte:head>
    <title> {PUBLIC_COMPANY_NAME} - Contact</title> 
</svelte:head>

<div class="flex justify-center items-center h-full">
    <form method="POST" class="flex flex-col gap-4">
        <div>
            <label for="name">Name</label>
            <input type="text" id="name" bind:value={name} name="name" />
        </div>

        <div>
            <label for="email">Email</label>
            <input type="email" id="email" bind:value={email} name="email" />
        </div>

        <div>
            <label for="phone">Phone</label>
            <input type="tel" id="phone" bind:value={phone} name="phone" />
        </div>

        <div>
            <label for="message">Message</label>
            <textarea id="message" bind:value={message} name="message" />
        </div>

        <input type="submit" value="Submit" class="cursor-pointer" />
    </form>
</div>

<style type="postcss">
    form div {
        @apply bg-gray-400 p-4 rounded-lg flex items-center gap-4;
    }

    input,
    textarea {
        @apply bg-gray-200 p-2 rounded-lg outline-none;
    }
</style>
