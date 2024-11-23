import express from "express";
import ArtworksController from "../controllers/artworks.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import { isAdmin } from "../middlewares/isAdmin.js";

const router = express.Router();
const artworkController = new ArtworksController();

router.get("/", artworkController.getAllArtworks);
router.get("/:id", artworkController.getOneArtwork);
router.get("/search/:title", artworkController.getArtworkByTitle);

router.put('/:id', isLoggedIn, isAdmin, artworkController.updateArtwork);

router.delete('/:id',isLoggedIn, isAdmin, (req, res) => artworkController.deleteArtwork(req, res));

export default router;