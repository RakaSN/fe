import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { v2 as cloudinary } from "cloudinary";

// Konfigurasi Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    // Ambil data text
    const category = formData.get("category") as string;
    const urgency = formData.get("urgency") as string;
    const message = formData.get("message") as string;
    const name = formData.get("name") as string;
    const noHp = formData.get("noHp") as string;
    
    // Ambil file gambar (Key-nya harus "image", sesuai Frontend)
    const file = formData.get("image") as File;
    
    let imageUrl = "";

    // 1. PROSES UPLOAD KE CLOUDINARY (Jika ada file)
    if (file) {
      console.log("📸 Mulai upload gambar:", file.name);
      
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      // Upload via Promise agar bisa ditunggu (await)
      const uploadResult: any = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: "pengaduan-sekolah" }, // Nama folder di Cloudinary
          (error, result) => {
            if (error) {
              console.error("❌ Cloudinary Error:", error);
              reject(error);
            } else {
              resolve(result);
            }
          }
        ).end(buffer);
      });

      imageUrl = uploadResult.secure_url;
      console.log("✅ Gambar sukses diupload:", imageUrl);
    } else {
      console.log("ℹ️ User tidak mengupload gambar.");
    }

    // 2. SIMPAN KE DATABASE (Aiven MySQL)
    const newPengaduan = await prisma.pengaduan.create({
      data: {
        category,
        urgency,
        message,
        name: name || "Anonim", // Jaga-jaga kalau kosong
        noHp: noHp || "-",
        image: imageUrl, // Simpan link gambar (atau string kosong jika tidak ada)
      },
    });

    console.log("✅ Data tersimpan di DB ID:", newPengaduan.id);

    return NextResponse.json({ success: true, data: newPengaduan });

  } catch (error) {
    console.error("🔥 ERROR BACKEND:", error);
    return NextResponse.json(
      { success: false, error: "Gagal memproses data di server" },
      { status: 500 }
    );
  }
}