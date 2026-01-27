import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { v2 as cloudinary } from "cloudinary";

const prisma = new PrismaClient();

// Konfigurasi Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    
    // Ambil data text
    const category = formData.get("category") as string;
    const urgency = formData.get("urgency") as string;
    const message = formData.get("message") as string;
    
    // Ambil file gambar
    const file = formData.get("image") as File;
    
    let imageUrl = "";

    // --- BAGIAN PENTING: UPLOAD LANGSUNG (TANPA SIMPAN LOKAL) ---
    if (file) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      // Kita pakai Promise biar Next.js nunggu upload selesai
      const uploadResponse: any = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: "pengaduan-sekolah" }, // Nama folder di Cloudinary
          (error: any, result: any) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        ).end(buffer); // <--- Kirim buffer langsung, bukan path file!
      });

      imageUrl = uploadResponse.secure_url;
      console.log("Upload ke Cloudinary Sukses:", imageUrl);
    }
    // ------------------------------------------------------------

    // Simpan ke Database (Kolom image wajib sudah ada di schema.prisma & database)
    const newPengaduan = await prisma.pengaduan.create({
      data: {
        category,
        urgency,
        message,
        image: imageUrl,
      },
    });

    return NextResponse.json({ success: true, data: newPengaduan });

  } catch (error) {
    console.error("Error backend:", error);
    return NextResponse.json(
      { success: false, error: "Gagal memproses data" },
      { status: 500 }
    );
  }
}