"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { uploadImage } from "@/actions/upload-image";
import { Viewer } from "./viewer";
import { toast } from "@/hooks/use-toast";

export function UploadImageButton() {
  const [file, setFile] = useState<File | null>(null);
  const previewUrl = file ? URL.createObjectURL(file) : null;
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);

  const handleUpload = async () => {
    if (!file) return;

    const { fields, url } = await uploadImage(file);
    const formData = new FormData();
    Object.entries(fields).forEach(([fields, value]) => {
      formData.append(fields, value);
    });
    formData.append("file", file);
    // submit
    try {
      await fetch(url, {
        method: "POST",
        body: formData,
      });
      setUploadedImageUrl(`https://s3.shokujin.com/${fields.key}`);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCopy = () => {
    if (!uploadedImageUrl) return;
    navigator.clipboard.writeText(`![](${uploadedImageUrl})`);
    toast({
      title: "コピーしました",
    });
  };

  const handleReset = () => {
    setFile(null);
    setUploadedImageUrl(null);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">画像アップロード</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>画像アップロード</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        {uploadedImageUrl ? (
          <div className="overflow-hidden">
            <Viewer>
              <p>アップロードが完了しました。</p>
              <pre>
                <code>{`![](${uploadedImageUrl})`}</code>
              </pre>
            </Viewer>
            <div className="mt-4 space-x-4">
              <Button variant="secondary" onClick={handleCopy}>
                コピー
              </Button>
              <Button variant="outline" onClick={handleReset}>
                別の画像をアップロード
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4 pt-4">
            <Input
              name="file"
              type="file"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {previewUrl && <img src={previewUrl} alt="" />}
          </div>
        )}
        {!uploadedImageUrl && (
          <DialogFooter className="mt-4">
            <Button type="button" disabled={!file} onClick={handleUpload}>
              アップロード
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
