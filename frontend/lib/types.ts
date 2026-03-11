import { z } from "zod";

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  photo_url: string;
  linkedin_url?: string;
  github_url?: string;
}

export interface TeamMemberCreate {
  name: string;
  role: string;
  bio: string;
  photo_url: string;
  linkedin_url?: string;
  github_url?: string;
}

export interface TeamMemberUpdate {
  name?: string;
  role?: string;
  bio?: string;
  photo_url?: string;
  linkedin_url?: string;
  github_url?: string;
}

export const teamMemberSchema = z.object({
  name: z.string().min(2, "Name is required"),
  role: z.string().min(2, "Role is required"),
  bio: z.string().min(5, "Bio is required"),
  photo_url: z.string().url("Enter a valid URL").optional().or(z.literal("")),
  linkedin_url: z.string().optional(),
  github_url: z.string().optional(),
});

export type TeamMemberFormValues = z.infer<typeof teamMemberSchema>;