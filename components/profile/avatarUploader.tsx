"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const MAX_SIZE = 2 * 1024 * 1024;

export default function AvatarUploader({ name, imageUrl }: { name: string; imageUrl: string | null }) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  const src = preview ?? imageUrl;

  const onPick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const picked = e.target.files?.[0];
    if (!picked) return;
    if (!picked.type.startsWith("image/")) return toast.error("Please choose an image file");
    if (picked.size > MAX_SIZE) return toast.error("Image must be smaller than 2 MB");
    if (preview) URL.revokeObjectURL(preview);
    setFile(picked);
    setPreview(URL.createObjectURL(picked));
  };

  const upload = () => {
    if (!file) return;
    setUploading(true);
    setProgress(0);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/profile-image");
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) setProgress(Math.round((e.loaded / e.total) * 100));
    };
    xhr.onload = () => {
      setUploading(false);
      try {
        const json = JSON.parse(xhr.responseText);
        if (xhr.status < 300 && json.success) {
          toast.success(json.message ?? "Profile image updated");
          setFile(null);
          router.refresh();
        } else {
          toast.error(json.message ?? "Upload failed");
        }
      } catch {
        toast.error("Upload failed");
      }
    };
    xhr.onerror = () => {
      setUploading(false);
      toast.error("Network error. Please try again.");
    };

    const fd = new FormData();
    fd.append("file", file);
    xhr.send(fd);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative h-28 w-28 overflow-hidden rounded-full border bg-gray-100">
        {src ? (
          <Image
            src={src}
            alt={`${name} profile photo`}
            fill
            sizes="112px"
            className="object-cover"
            unoptimized={preview !== null}
          />
        ) : (
          <span className="flex h-full w-full items-center justify-center text-3xl font-bold text-gray-400">
            {name.charAt(0).toUpperCase()}
          </span>
        )}
      </div>

      <input ref={inputRef} type="file" accept="image/*" className="sr-only" onChange={onPick} aria-label="Choose profile image" />

      {uploading && (
        <div className="w-full" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
          <div className="h-2 overflow-hidden rounded-full bg-gray-200">
            <div className="h-full bg-emerald-600 transition-all" style={{ width: `${progress}%` }} />
          </div>
          <p className="mt-1 text-center text-xs text-gray-500">{progress}%</p>
        </div>
      )}

      <div className="flex gap-2">
        <Button type="button" variant="outline" size="sm" disabled={uploading} onClick={() => inputRef.current?.click()}>
          Choose photo
        </Button>
        {file && (
          <Button
            type="button"
            size="sm"
            disabled={uploading}
            onClick={upload}
            className="bg-emerald-600 text-white hover:bg-emerald-700"
          >
            {uploading ? "Uploading..." : "Upload"}
          </Button>
        )}
      </div>
    </div>
  );
}