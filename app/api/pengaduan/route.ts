import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req: Request) {
  try {
    // 1. Terima Data sebagai FormData (Bukan JSON lagi)
    const formData = await req.formData();
    
    const name = formData.get("name") as string;
    const noHp = formData.get("noHp") as string;
    const category = formData.get("category") as string;
    const urgency = formData.get("urgency") as string;
    const message = formData.get("message") as string;
    const isAnonymous = formData.get("isAnonymous") === "true";
    const file = formData.get("file") as File | null;

    let imagePath = null;

    // 2. Proses Upload Foto (Kalau ada)
    if (file && file.size > 0) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Buat nama file unik (biar gak bentrok)
      const filename = `${Date.now()}-${file.name.replace(/\s/g, "_")}`;
      
      // Simpan ke folder public/uploads
      const uploadDir = path.join(process.cwd(), "public", "uploads");
      const filePath = path.join(uploadDir, filename);
      
      await writeFile(filePath, buffer);
      imagePath = `/uploads/${filename}`; // Ini yang disimpan di DB
    }

    // 3. Simpan ke Database
    const laporan = await db.pengaduan.create({
      data: {
        name: isAnonymous ? "ANONIM" : name,
        noHp: isAnonymous ? "-" : noHp,
        category,
        urgency,
        message,
        // @ts-ignore
        image: imagePath, // <--- Baris ini yang kita paksa biar gak error
      },
    });

    return NextResponse.json({ success: true, data: laporan });

  } catch (error) {
    console.error("Error Server:", error);
    return NextResponse.json(
      { success: false, message: "Gagal memproses data" },
      { status: 500 }
    );
  }
}