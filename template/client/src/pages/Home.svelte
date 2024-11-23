<script>
    import SearchBar from '../components/SearchBar.svelte';
    import Filters from '../components/Filter.svelte';
    import Artworks from "../components/Artworks.svelte";

</script>

<div class="main-container">
    <Filters />
</div>

<main class="home">
    <SearchBar />
</main>

<section>
    <Artworks />
</section>

<style>
    .main-container {
        display: flex;
        padding: 20px;
    }

    section {
        padding: 1.5em 1.25em;
        margin-top: 350px;
    }

</style>
