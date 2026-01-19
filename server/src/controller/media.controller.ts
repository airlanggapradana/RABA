import {Response} from "express";
import prisma from "../../prisma/prisma";
import {AuthRequest} from "../middleware/auth";
import {uploadToCloudinary} from "../utils/cloudinary";

export const uploadAudio = async (req: AuthRequest, res: Response) => {
  const userId = req.auth!.userId;
  const {title, description} = req.body;
  const audioFile = (req as any).files?.audio as any;

  if (!title || !audioFile) {
    return res.status(400).json({message: "Title and audio file required"});
  }

  try {
    // Upload directly from buffer to Cloudinary (no temp file needed)
    const cloudinaryUrl = await uploadToCloudinary(audioFile.data, "audio", "video");

    // Create database record in Neon DB
    const audio = await prisma.audioFile.create({
      data: {
        title,
        description,
        audioUrl: cloudinaryUrl,
        createdBy: userId
      }
    });

    res.json(audio);
  } catch (error) {
    console.error("Upload audio error:", error);
    res.status(500).json({message: "Upload failed", error: String(error)});
  }
};

export const uploadImage = async (req: AuthRequest, res: Response) => {
  const userId = req.auth!.userId;
  const {title, description} = req.body;
  const imageFile = (req as any).files?.image as any;

  if (!title || !imageFile) {
    return res.status(400).json({message: "Title and image file required"});
  }

  try {
    // Upload directly from buffer to Cloudinary (no temp file needed)
    const cloudinaryUrl = await uploadToCloudinary(imageFile.data, "images", "image");

    // Create database record in Neon DB
    const image = await prisma.image.create({
      data: {
        title,
        description,
        imageUrl: cloudinaryUrl,
        createdBy: userId
      }
    });

    res.json(image);
  } catch (error) {
    console.error("Upload image error:", error);
    res.status(500).json({message: "Upload failed", error: String(error)});
  }
};

export const getImages = async (req: AuthRequest, res: Response) => {
  try {
    const images = await prisma.image.findMany({
      orderBy: {createdAt: "desc"}
    });
    res.json(images);
  } catch (error) {
    res.status(500).json({message: "Failed to fetch images"});
  }
};

export const deleteAudio = async (req: AuthRequest, res: Response) => {
  const {audioId} = req.params;
  try {
    await prisma.audioFile.delete({
      where: {id: String(audioId)}
    });
    res.json({message: "Audio deleted"});
  } catch (error) {
    res.status(500).json({message: "Failed to delete audio"});
  }
};

export const deleteImage = async (req: AuthRequest, res: Response) => {
  const {imageId} = req.params;
  try {
    await prisma.image.delete({
      where: {id: String(imageId)}
    });
    res.json({message: "Image deleted"});
  } catch (error) {
    res.status(500).json({message: "Failed to delete image"});
  }
};

