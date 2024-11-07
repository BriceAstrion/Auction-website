<script>
    import SearchBar from '../components/SearchBar.svelte';
    import Filters from '../components/Filter.svelte';
    import { ArtworksFiltered } from "../stores/auth.js";

</script>

<div class="main-container">
    <Filters />
</div>

<main class="home">
    <SearchBar />

    <div class="artwork-listing">
        {#each $ArtworksFiltered as item}
            <div class="artwork">
                <img src={item.imageUrl} alt={item.title} />
                <h3>{item.title}</h3>
            </div>
        {/each}
    </div>

</main>

<style>
    .main-container {
        display: flex;
        padding: 20px;
    }

    .content {
        flex-grow: 1;
        margin-left: 20px;
    }

    .artwork-listing {
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
        justify-content: space-between;
        margin-top: 20px;
    }

    .artwork {
        width: calc(33.33% - 20px);
        padding: 10px;
        box-sizing: border-box;
        border: 1px solid #ccc;
        border-radius: 5px;
        background-color: #f8efe4;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
    }

    .artwork img {
        max-width: 100%;
        height: auto;
    }
</style>
