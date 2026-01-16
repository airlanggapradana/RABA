import { Response } from "express";
import prisma from "../../prisma/prisma";
import { AuthRequest } from "../middleware/auth";
import path from "path";
import fs from "fs";

const UPLOAD_DIR = path.join(__dirname, "../../uploads");

// Ensure upload directory exists
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

export const uploadAudio = async (req: AuthRequest, res: Response) => {
  const userId = req.auth!.userId;
  const { title, description } = req.body;
  const audioFile = (req as any).files?.audio as any;

  if (!title || !audioFile) {
    return res.status(400).json({ message: "Title and audio file required" });
  }

  try {
    // Save file
    const fileName = `${Date.now()}-${audioFile.name}`;
    const filePath = path.join(UPLOAD_DIR, "audio", fileName);
    
    // Create audio directory if not exists
    if (!fs.existsSync(path.join(UPLOAD_DIR, "audio"))) {
      fs.mkdirSync(path.join(UPLOAD_DIR, "audio"), { recursive: true });
    }

    await audioFile.mv(filePath);

    // Create database record
    const audio = await prisma.audioFile.create({
      data: {
        title,
        description,
        audioUrl: `/uploads/audio/${fileName}`,
        createdBy: userId
      }
    });

    res.json(audio);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Upload failed" });
  }
};

export const uploadImage = async (req: AuthRequest, res: Response) => {
  const userId = req.auth!.userId;
  const { title, description } = req.body;
  const imageFile = (req as any).files?.image as any;

  if (!title || !imageFile) {
    return res.status(400).json({ message: "Title and image file required" });
  }

  try {
    // Save file
    const fileName = `${Date.now()}-${imageFile.name}`;
    const filePath = path.join(UPLOAD_DIR, "images", fileName);
    
    // Create images directory if not exists
    if (!fs.existsSync(path.join(UPLOAD_DIR, "images"))) {
      fs.mkdirSync(path.join(UPLOAD_DIR, "images"), { recursive: true });
    }

    await imageFile.mv(filePath);

    // Create database record
    const image = await prisma.image.create({
      data: {
        title,
        description,
        imageUrl: `/uploads/images/${fileName}`,
        createdBy: userId
      }
    });

    res.json(image);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Upload failed" });
  }
};

export const getImages = async (req: AuthRequest, res: Response) => {
  try {
    const images = await prisma.image.findMany({
      orderBy: { createdAt: "desc" }
    });
    res.json(images);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch images" });
  }
};

export const deleteAudio = async (req: AuthRequest, res: Response) => {
  const audioId = req.params.audioId;
  const userId = req.auth!.userId;

  if (!audioId) {
    return res.status(400).json({ message: "Audio ID required" });
  }

  try {
    const audio = await prisma.audioFile.findUnique({ where: { id: audioId } });
    if (!audio) return res.status(404).json({ message: "Audio not found" });

    // Only creator can delete
    if (audio.createdBy !== userId) {
      return res.status(403).json({ message: "Forbidden" });
    }

    // Delete file from storage
    if (audio.audioUrl.startsWith("/uploads/")) {
      const filePath = path.join(UPLOAD_DIR, audio.audioUrl.replace("/uploads/", ""));
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    // Delete from database
    await prisma.audioFile.delete({ where: { id: audioId } });

    res.json({ message: "Audio deleted" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed" });
  }
};

export const deleteImage = async (req: AuthRequest, res: Response) => {
  const imageId = req.params.imageId;
  const userId = req.auth!.userId;

  if (!imageId) {
    return res.status(400).json({ message: "Image ID required" });
  }

  try {
    const image = await prisma.image.findUnique({ where: { id: imageId } });
    if (!image) return res.status(404).json({ message: "Image not found" });

    // Only creator can delete
    if (image.createdBy !== userId) {
      return res.status(403).json({ message: "Forbidden" });
    }

    // Delete file from storage
    if (image.imageUrl.startsWith("/uploads/")) {
      const filePath = path.join(UPLOAD_DIR, image.imageUrl.replace("/uploads/", ""));
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    // Delete from database
    await prisma.image.delete({ where: { id: imageId } });

    res.json({ message: "Image deleted" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed" });
  }
};