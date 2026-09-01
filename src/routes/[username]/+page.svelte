<script lang="ts">
    import { page } from "$app/state";

    const authorModules = import.meta.glob(
        "/src/routes/**/people/*/author.ts",
        { eager: true }
    );

    const authors = Object.entries(authorModules).map(([path, mod]: [string, any]) => {
        const folder = path.split("/").slice(-2, -1)[0];
        return { ...mod.author, href: `/people/${folder}` };
    });

    const match = $derived(authors.find((a) => a.shortSlash === page.params.username));
    const targetUrl = $derived(match ? `https://deltacv.org${match.href}` : "https://deltacv.org/people");
</script>

<svelte:head>
    <link rel="canonical" href={targetUrl} />
</svelte:head>

<!-- Never rendered: load() in +page.ts always redirects or throws 404 -->

