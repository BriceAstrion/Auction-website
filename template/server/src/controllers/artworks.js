import items from "../data/artworks.js";

class ArtworksController {
    getAllArtworks(req, res) {
        try {
            return res.status(200).json(items);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Internal server error." });
        }
    }

    getOneArtwork(req, res) {
        const artworkId = parseInt(req.params.id);
        const artwork = items.find(artwork => artwork.id === artworkId);

        if (artwork) {
            res.status(200).json({ artwork });
        } else {
            res.status(404).json({ error: "Artwork not found!" });
        }
    }

    getArtworkByTitle (req, res) {
        const artworkTitle = req.params.title.toLowerCase();
        const artworkArr = [];
        items.forEach((artwork,index) => {
            if(artwork.title.toLowerCase().includes(artworkTitle)){
                artworkArr.push(artwork);
            }
        });

        if (artworkArr.length > 0) {
            res.status(200).json({ artwork: artworkArr });
        } else {
            res.status(404).json({ Error: "Artwork not found!" });
        }
    }

    updateArtwork(req, res) {
        const artworkId = parseInt(req.params.id);
        const artwork = items.find(artwork => artwork.id === artworkId);

        if (artwork) {
            const updates = req.body;

            // Dynamically update fields
            Object.keys(updates).forEach(field => {
                if (field in artwork) {
                    artwork[field] = updates[field];
                }
            });

            res.status(200).json({ message: "Artwork successfully updated", artwork });
        } else {
            res.status(404).json({ error: "Artwork not found!" });
        }
    }

    deleteArtwork(req, res) {
        const artworkId = parseInt(req.params.id);
        const index = items.findIndex(artwork => artwork.id === artworkId);

        if (index !== -1) {
            items.splice(index, 1);
            res.status(200).json({ message: "Artwork successfully deleted" });
        } else {
            res.status(404).json({ error: "Artwork not found!" });
        }
    }
}

export default ArtworksController;