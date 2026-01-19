import { Response } from "express";
import { AuthRequest } from "../middleware/auth";
export declare const uploadAudio: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const uploadImage: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getImages: (req: AuthRequest, res: Response) => Promise<void>;
export declare const deleteAudio: (req: AuthRequest, res: Response) => Promise<void>;
export declare const deleteImage: (req: AuthRequest, res: Response) => Promise<void>;
//# sourceMappingURL=media.controller.d.ts.map