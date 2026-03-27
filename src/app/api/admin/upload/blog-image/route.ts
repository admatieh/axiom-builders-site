import { NextResponse } from "next/server";
import path from "path";
import crypto from "crypto";
import { promises as fs } from "fs";

export const runtime = "nodejs";

const ALLOWED_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
]);

const EXTENSION_BY_MIME: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
  "image/svg+xml": "svg",
};

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const uploaded = formData.get("file");

    if (!uploaded || !(uploaded instanceof File)) {
      return NextResponse.json(
        { success: false, message: "No file was uploaded." },
        { status: 400 }
      );
    }

    if (uploaded.size === 0) {
      return NextResponse.json(
        { success: false, message: "Uploaded file is empty." },
        { status: 400 }
      );
    }

    if (!ALLOWED_MIME_TYPES.has(uploaded.type)) {
      return NextResponse.json(
        { success: false, message: "Only image files are allowed (jpg, png, webp, gif, svg)." },
        { status: 400 }
      );
    }

    if (uploaded.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { success: false, message: "Image is too large. Max size is 5MB." },
        { status: 400 }
      );
    }

    const extension = EXTENSION_BY_MIME[uploaded.type] || "png";
    const fileName = `blog-${Date.now()}-${crypto.randomUUID()}.${extension}`;

    const uploadDirectory = path.join(process.cwd(), "public", "images", "blog");
    await fs.mkdir(uploadDirectory, { recursive: true });

    const filePath = path.join(uploadDirectory, fileName);
    const fileBuffer = Buffer.from(await uploaded.arrayBuffer());

    await fs.writeFile(filePath, fileBuffer);

    return NextResponse.json(
      {
        success: true,
        path: `/images/blog/${fileName}`,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error?.message || "Failed to upload image.",
      },
      { status: 500 }
    );
  }
}
