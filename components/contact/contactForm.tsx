"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SITE } from "@/lib/site";
import { contactSchema, type ContactInput } from "@/lib/validation/contact.validation";

function FieldError({ message }: { message?: string }) {
    return message ? (
        <p role="alert" className="mt-1 text-xs text-red-500">
            {message}
        </p>
    ) : null;
}

export default function ContactForm() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<ContactInput>({
        resolver: zodResolver(contactSchema),
        defaultValues: { name: "", email: "", subject: "", message: "" },
    });

    // Backend-e contact endpoint nai, tai validated message email app-e khule dey
    const onSubmit = (values: ContactInput) => {
        const body = `${values.message}\n\n${values.name}\n${values.email}`;
        const href = `mailto:${SITE.email}?subject=${encodeURIComponent(values.subject)}&body=${encodeURIComponent(body)}`;
        toast.success("Opening your email app. Press send there to deliver your message.");
        window.location.assign(href);
        reset();
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
            <div>
                <label htmlFor="name" className="mb-1 block text-sm font-medium">Your name</label>
                <Input id="name" autoComplete="name" {...register("name")} />
                <FieldError message={errors.name?.message} />
            </div>
            <div>
                <label htmlFor="email" className="mb-1 block text-sm font-medium">Email</label>
                <Input id="email" type="email" autoComplete="email" {...register("email")} />
                <FieldError message={errors.email?.message} />
            </div>
            <div>
                <label htmlFor="subject" className="mb-1 block text-sm font-medium">Subject</label>
                <Input id="subject" {...register("subject")} />
                <FieldError message={errors.subject?.message} />
            </div>
            <div>
                <label htmlFor="message" className="mb-1 block text-sm font-medium">Message</label>
                <textarea
                    id="message"
                    rows={5}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    {...register("message")}
                />
                <FieldError message={errors.message?.message} />
            </div>
            <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-emerald-600 text-white hover:bg-emerald-700"
            >
                Send message
            </Button>
        </form>
    );
}