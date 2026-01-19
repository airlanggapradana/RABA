"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../prisma/prisma"));
const audioData = [
    { title: "1", description: "Letter 1", audioUrl: "/assets/1.mp3" },
    { title: "2", description: "Letter 2", audioUrl: "/assets/2.mp3" },
    { title: "3", description: "Letter 3", audioUrl: "/assets/3.mp3" },
    { title: "4", description: "Letter 4", audioUrl: "/assets/4.mp3" },
    { title: "5", description: "Letter 5", audioUrl: "/assets/5.mp3" },
    { title: "6", description: "Letter 6", audioUrl: "/assets/6.mp3" },
    { title: "A", description: "Letter A", audioUrl: "/assets/A.mp3" },
    { title: "B", description: "Letter B", audioUrl: "/assets/B.mp3" },
    { title: "C", description: "Letter C", audioUrl: "/assets/C.mp3" },
    { title: "D", description: "Letter D", audioUrl: "/assets/D.mp3" },
    { title: "E", description: "Letter E", audioUrl: "/assets/E.mp3" },
    { title: "F", description: "Letter F", audioUrl: "/assets/F.mp3" },
    { title: "Anjing", description: "Dog sound", audioUrl: "/assets/anjing.mp3" },
    { title: "Ayam", description: "Chicken sound", audioUrl: "/assets/ayam.mp3" },
    { title: "Kucing", description: "Cat sound", audioUrl: "/assets/kucing.mp3" },
    { title: "Gajah", description: "Elephant sound", audioUrl: "/assets/gajah.mp3" },
    { title: "Harimau", description: "Tiger sound", audioUrl: "/assets/harimau.mp3" },
    { title: "Angsa", description: "Swan sound", audioUrl: "/assets/angsa.mp3" },
];
async function seed() {
    try {
        // Clear existing audio files
        await prisma_1.default.audioFile.deleteMany({});
        console.log("Cleared existing audio files");
        // Create audio files
        for (const audio of audioData) {
            await prisma_1.default.audioFile.create({
                data: {
                    title: audio.title,
                    description: audio.description,
                    audioUrl: audio.audioUrl,
                }
            });
        }
        console.log(`✅ Seeded ${audioData.length} audio files`);
    }
    catch (error) {
        console.error("❌ Seeding failed:", error);
    }
    finally {
        await prisma_1.default.$disconnect();
    }
}
seed();
//# sourceMappingURL=seed.js.map