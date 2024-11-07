<script>
    import { ArtworksFiltered } from "../stores/auth.js";

    export let items = [];

    const  searchItem = async (artwork) => {
        if(artwork === "" || artwork == null){
            return;
        }

        const response =  await fetch('http://localhost:3000/artworks/search/' + artwork, {
            method: "GET",
        })

        items = await response.json()
        console.log("items", items)
        $ArtworksFiltered = items.artwork
    }
</script>


<div class="search-bar">
    <input
            type="text"
            placeholder="Search by title..."
            autocomplete="off"
            on:input = {e => searchItem(e.target.value)}
    />
</div>


<style>
    .search-bar {
        text-align: center;
        padding: 10px;
        margin-top: -390px;
    }

    input {
        width: 650px;
        padding: 5px;
        font-size: 16px;
        margin-left: 145px;
    }

</style>
