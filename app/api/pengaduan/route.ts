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

    // Logika Upload ke Cloudinary
    if (file) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      // Upload process
      const uploadResponse: any = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: "pengaduan-sekolah" },
          (error: any, result: any) => { // <--- INI PERBAIKANNYA (Kasih : any)
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        ).end(buffer);
      });

      imageUrl = uploadResponse.secure_url;
      console.log("Upload Sukses:", imageUrl);
    }

    // Simpan ke Database
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
    console.error("Error upload:", error);
    return NextResponse.json(
      { success: false, error: "Gagal memproses data" },
      { status: 500 }
    );
  }
}