"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteImage = exports.deleteAudio = exports.getImages = exports.uploadImage = exports.uploadAudio = void 0;
const prisma_1 = __importDefault(require("../../prisma/prisma"));
const cloudinary_1 = require("../utils/cloudinary");
const uploadAudio = async (req, res) => {
    const userId = req.auth.userId;
    const { title, description } = req.body;
    const audioFile = req.files?.audio;
    if (!title || !audioFile) {
        return res.status(400).json({ message: "Title and audio file required" });
    }
    try {
        // Upload directly from buffer to Cloudinary (no temp file needed)
        const cloudinaryUrl = await (0, cloudinary_1.uploadToCloudinary)(audioFile.data, "audio", "video");
        // Create database record in Neon DB
        const audio = await prisma_1.default.audioFile.create({
            data: {
                title,
                description,
                audioUrl: cloudinaryUrl,
                createdBy: userId
            }
        });
        res.json(audio);
    }
    catch (error) {
        console.error("Upload audio error:", error);
        res.status(500).json({ message: "Upload failed", error: String(error) });
    }
};
exports.uploadAudio = uploadAudio;
const uploadImage = async (req, res) => {
    const userId = req.auth.userId;
    const { title, description } = req.body;
    const imageFile = req.files?.image;
    if (!title || !imageFile) {
        return res.status(400).json({ message: "Title and image file required" });
    }
    try {
        // Upload directly from buffer to Cloudinary (no temp file needed)
        const cloudinaryUrl = await (0, cloudinary_1.uploadToCloudinary)(imageFile.data, "images", "image");
        // Create database record in Neon DB
        const image = await prisma_1.default.image.create({
            data: {
                title,
                description,
                imageUrl: cloudinaryUrl,
                createdBy: userId
            }
        });
        res.json(image);
    }
    catch (error) {
        console.error("Upload image error:", error);
        res.status(500).json({ message: "Upload failed", error: String(error) });
    }
};
exports.uploadImage = uploadImage;
const getImages = async (req, res) => {
    try {
        const images = await prisma_1.default.image.findMany({
            orderBy: { createdAt: "desc" }
        });
        res.json(images);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to fetch images" });
    }
};
exports.getImages = getImages;
const deleteAudio = async (req, res) => {
    const { audioId } = req.params;
    try {
        await prisma_1.default.audioFile.delete({
            where: { id: String(audioId) }
        });
        res.json({ message: "Audio deleted" });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to delete audio" });
    }
};
exports.deleteAudio = deleteAudio;
const deleteImage = async (req, res) => {
    const { imageId } = req.params;
    try {
        await prisma_1.default.image.delete({
            where: { id: String(imageId) }
        });
        res.json({ message: "Image deleted" });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to delete image" });
    }
};
exports.deleteImage = deleteImage;
//# sourceMappingURL=media.controller.js.map