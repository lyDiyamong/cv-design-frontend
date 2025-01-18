import type { z } from "zod";
import type { User } from "./auth";
import type { UpdateSectionArray } from "./sections";

// Type for Resume
export interface ResumeType {
  _id: string;
  userId: User;
  title: string;
  previewImageUrl: string;
  sections: UpdateSectionArray;
}


export type CreateResumeType = z.infer<typeof createResumeSchema>;