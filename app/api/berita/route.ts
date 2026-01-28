import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { writeFile } from "fs/promises";
import path from "path";

const prisma = new PrismaClient();

// Helper untuk menangani error BigInt di JSON
const serializePrisma = (data: any) => {
  return JSON.parse(
    JSON.stringify(data, (key, value) =>
      typeof value === "bigint" ? value.toString() : value
    )
  );
};

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const category = formData.get("category") as string;
    const author = formData.get("author") as string;
    const file = formData.get("image") as File;

    let imageUrl = "";

    if (file && file.size > 0) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const filename = Date.now() + "_" + file.name.replaceAll(" ", "_");
      const uploadPath = path.join(process.cwd(), "public/uploads", filename);
      
      await writeFile(uploadPath, buffer);
      imageUrl = `/uploads/${filename}`;
    }

    const news = await prisma.news.create({
      data: {
        title,
        content,
        category,
        author: author || "Admin",
        image: imageUrl,
        slug: title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, ""),
        is_published: true, // Sesuai schema Laravel
        is_featured: false,  // Sesuai schema Laravel
      },
    });

    return NextResponse.json({ success: true, data: serializePrisma(news) });
  } catch (error) {
    console.error("Error creating news:", error);
    return NextResponse.json({ success: false, error: "Gagal membuat berita" }, { status: 500 });
  }
}