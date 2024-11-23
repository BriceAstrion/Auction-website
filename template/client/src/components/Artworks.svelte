<script>
    import { onMount } from "svelte";
    import { ArtworksFiltered } from "../stores/auth.js";
    import CountDown from "./CountDown.svelte";

    onMount(async () => {
        await fetchArtworks();
    });

    async function fetchArtworks() {
        try {
            const response = await fetch('http://localhost:3000/artworks', {
                method: "GET",
            });
            if (response.ok) {
                $ArtworksFiltered = await response.json();
            } else {
                console.error("Failed to fetch items from the server!");
            }
        } catch (error) {
            console.error("An error occurred while fetching items:", error);
        }
    }
</script>

<section>
    <div class="content">
        <div class="artwork-listing">
            {#each $ArtworksFiltered as artwork (artwork.id)}
                <div class="artwork">
                    <a href={`/ArtworkDetails/${artwork.id}`}>
                        <img src={artwork.imgSrc} alt={artwork.title} />
                    </a>
                    <h3>{artwork.title}</h3>
                    <h4>Worth: ${artwork.originalPrice}</h4>
                    <CountDown endDate={artwork.endDate} />
                </div>
            {/each}
        </div>
    </div>
</section>


<style>
    section {
        padding: 1.5em 1.25em;
        margin-right: 50px;

    }

    .content {
        flex: 2;
        padding: 80px;
        margin-right: -30px;
        width: 105%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .artwork-listing {
        width: calc(80% - 20px);
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        margin-top: -440px;
    }

    .artwork {
        width: calc(33.33% - 20px);
        margin-bottom: 20px;
        padding: 10px;
        box-sizing: border-box;
        border: 1px solid #ccc;
        border-radius: 5px;
        background-color: #e4f6f6;
        cursor: pointer;
        transition: transform 0.3s;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
    }

    .artwork:hover {
        transform: scale(1.05);
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
    }

    .artwork img {
        max-width: 90%;
        height: auto;
        display: block;
        margin: 0 auto;
    }

    h3 {
        font-size: 1.2rem;
        margin-top: 10px;
        color: #007bff;
    }

    h4 {
        font-size: 1.1rem;
        margin-top: 25px;
        color: #6006cd;
    }


    button {
        position: absolute;
        bottom: 10px;
        right: 10px;
        background-color: #0722c4;
        color: #fff;
        padding: 6px 12px;
        border: none;
        cursor: pointer;
        border-radius: 5px;
        font-size: 14px;
        font-weight: bold;
        transition: background-color 0.3s;
        opacity: 0;
    }

    button {
        opacity: 1;
    }

    button:hover {
        background-color: #0ebb0e;
    }

</style>
