import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { v2 as cloudinary } from "cloudinary";

// 1. Konfigurasi Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const prisma = new PrismaClient();

// =================================================================
// 🔥 BAGIAN BARU: FITUR GET (Biar Dashboard Bisa Baca Data)
// =================================================================
export async function GET() {
  try {
    const data = await prisma.pengaduan.findMany({
      orderBy: {
        createdAt: "desc", // Urutkan dari yang paling baru
      },
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error("❌ Gagal ambil data:", error);
    return NextResponse.json(
      { error: "Gagal mengambil data dari database" },
      { status: 500 }
    );
  }
}

// =================================================================
// 📸 BAGIAN LAMA: FITUR POST (Kodingan Upload Abang yang Canggih)
// =================================================================
export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    // Ambil data text
    const category = formData.get("category") as string;
    const urgency = formData.get("urgency") as string;
    const message = formData.get("message") as string;
    const name = formData.get("name") as string;
    const noHp = formData.get("noHp") as string;
    
    // Ambil file gambar
    const file = formData.get("image") as File;
    
    let imageUrl = "";

    // PROSES UPLOAD KE CLOUDINARY (Jika ada file)
    if (file) {
      console.log("📸 Mulai upload gambar:", file.name);
      
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      // Upload via Promise
      const uploadResult: any = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: "pengaduan-sekolah" }, 
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

    // SIMPAN KE DATABASE
    const newPengaduan = await prisma.pengaduan.create({
      data: {
        category,
        urgency,
        message,
        name: name || "Anonim",
        noHp: noHp || "-",
        image: imageUrl, 
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