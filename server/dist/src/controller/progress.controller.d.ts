import { Response } from "express";
import { AuthRequest } from "../middleware/auth";
export declare const myProgress: (req: AuthRequest, res: Response) => Promise<void>;
export declare const teacherChildrenProgress: (req: AuthRequest, res: Response) => Promise<void>;
export declare const parentChildrenProgress: (req: AuthRequest, res: Response) => Promise<void>;
export declare const getAudioFiles: (req: any, res: Response) => Promise<void>;
export declare const assignAudioToStudent: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const removeAudioAssignment: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const markAudioOpened: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const markAudioDownloaded: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getAllStudents: (req: AuthRequest, res: Response) => Promise<void>;
export declare const getTeacherAssignments: (req: AuthRequest, res: Response) => Promise<void>;
export declare const getParentLinks: (req: AuthRequest, res: Response) => Promise<void>;
export declare const linkParentToStudent: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteParentLink: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getAllParents: (req: AuthRequest, res: Response) => Promise<void>;
//# sourceMappingURL=progress.controller.d.ts.map