import express from "express";
import {
    createPartner,
    updatePartner,
    deletePartner,
    getAllPartners,
    singlePartner
} from "../controllers/partner.controller.js";
// import { verifyToken, verifyAdmin } from "../utils/varifyUser.js"; // Uncomment if needed

const router = express.Router();



// Create Partner
router.post("/", createPartner);

// Update Partner
router.put("/:id", updatePartner);

// Delete Partner
router.delete("/:id", deletePartner);

// Get All Partners
router.get("/", getAllPartners);

// Get Single Partner
router.get("/:id", singlePartner);

export default router;
