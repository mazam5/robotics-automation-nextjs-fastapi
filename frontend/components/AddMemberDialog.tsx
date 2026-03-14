"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { TeamMember } from "@/lib/types";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
    InputGroupText,
} from "@/components/ui/input-group";

const teamMemberSchema = z.object({
    name: z.string().min(2, "Name is required"),
    role: z.string().min(2, "Role is required"),
    bio: z.string().min(5, "Bio is required"),
    photo_url: z.url("Enter a valid URL").optional().or(z.literal("")),
    linkedin_url: z.string().optional(),
    github_url: z.string().optional(),
});

type FormValues = z.infer<typeof teamMemberSchema>;

const EMPTY_VALUES: FormValues = {
    name: "",
    role: "",
    bio: "",
    photo_url: "",
    linkedin_url: "",
    github_url: "",
};

interface AddMemberDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    memberToEdit?: TeamMember | null;
    onSave: (member: FormValues, id?: string) => Promise<void>;
}

export function AddMemberDialog({
    open,
    onOpenChange,
    memberToEdit,
    onSave,
}: AddMemberDialogProps) {
    // Stable initial values derived from memberToEdit
    const initialValues = useMemo<FormValues>(() => {
        if (!memberToEdit) return EMPTY_VALUES;
        return {
            name: memberToEdit.name || "",
            role: memberToEdit.role || "",
            bio: memberToEdit.bio || "",
            photo_url: memberToEdit.photo_url || "",
            linkedin_url:
                memberToEdit.linkedin_url?.replace("https://www.linkedin.com/in/", "") || "",
            github_url:
                memberToEdit.github_url?.replace("https://github.com/", "") || "",
        };
    }, [memberToEdit]);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<FormValues>({
        resolver: zodResolver(teamMemberSchema),
        defaultValues: EMPTY_VALUES,
    });

    // Populate / clear the form whenever the dialog opens or the target member changes
    useEffect(() => {
        if (open) {
            reset(initialValues);
        } else {
            // Always wipe the form when the dialog closes so stale values never bleed through
            reset(EMPTY_VALUES);
        }
    }, [open, initialValues, reset]);

    const handleCancel = () => {
        onOpenChange(false);
        // reset happens in the effect above when open → false
    };

    const onSubmit = async (data: FormValues) => {
        const payload = {
            ...data,
            linkedin_url: data.linkedin_url
                ? `https://www.linkedin.com/in/${data.linkedin_url}`
                : "",
            github_url: data.github_url
                ? `https://github.com/${data.github_url}`
                : "",
        };
        await onSave(payload, memberToEdit?.id);
        onOpenChange(false);
        // reset happens in the effect above when open → false
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="bg-zinc-900 border-white/10 text-white w-[95vw] sm:max-w-106.25">
                <DialogHeader>
                    <DialogTitle>
                        {memberToEdit ? "Edit Team Member" : "Add Team Member"}
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">

                    {/* Name */}
                    <div className="grid gap-2">
                        <Label>Name *</Label>
                        <Input {...register("name")} required className="bg-zinc-800 border-zinc-700 text-base" />
                        {errors.name && (
                            <p className="text-red-400 text-sm">{errors.name.message}</p>
                        )}
                    </div>

                    {/* Role */}
                    <div className="grid gap-2">
                        <Label>Role *</Label>
                        <Input {...register("role")} required className="bg-zinc-800 border-zinc-700" />
                        {errors.role && (
                            <p className="text-red-400 text-sm">{errors.role.message}</p>
                        )}
                    </div>

                    {/* Bio */}
                    <div className="grid gap-2">
                        <Label>Bio *</Label>
                        <Input {...register("bio")} required className="bg-zinc-800 border-zinc-700" />
                        {errors.bio && (
                            <p className="text-red-400 text-sm">{errors.bio.message}</p>
                        )}
                    </div>

                    {/* Photo URL */}
                    <div className="grid gap-2">
                        <Label>Photo URL (Optional)</Label>
                        <Input
                            placeholder="example.com/photo.jpg"
                            {...register("photo_url")}
                            className="bg-zinc-800 border-zinc-700"
                        />
                        {errors.photo_url && (
                            <p className="text-red-400 text-sm">{errors.photo_url.message}</p>
                        )}
                    </div>

                    {/* LinkedIn */}
                    <div className="grid gap-2">
                        <Label>LinkedIn</Label>
                        <InputGroup>
                            <InputGroupAddon>
                                <InputGroupText>linkedin.com/in/</InputGroupText>
                            </InputGroupAddon>
                            <InputGroupInput
                                placeholder="username"
                                {...register("linkedin_url")}
                                className="bg-zinc-800 border-zinc-700"
                            />
                        </InputGroup>
                    </div>

                    {/* GitHub */}
                    <div className="grid gap-2">
                        <Label>GitHub</Label>
                        <InputGroup>
                            <InputGroupAddon>
                                <InputGroupText>github.com/</InputGroupText>
                            </InputGroupAddon>
                            <InputGroupInput
                                placeholder="username"
                                {...register("github_url")}
                                className="bg-zinc-800 border-zinc-700"
                            />
                        </InputGroup>
                    </div>

                    <div className="flex gap-2">
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="mt-2 bg-white text-black hover:bg-zinc-200"
                        >
                            {isSubmitting
                                ? "Saving..."
                                : memberToEdit
                                    ? "Save Changes"
                                    : "Add Member"}
                        </Button>
                        <Button
                            disabled={isSubmitting}
                            variant="outline"
                            type="button"
                            className="mt-2 text-white hover:bg-zinc-200"
                            onClick={handleCancel}
                        >
                            Cancel
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}