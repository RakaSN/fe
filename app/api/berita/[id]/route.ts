import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { writeFile } from "fs/promises";
import path from "path";

const prisma = new PrismaClient();

// Helper
const serializePrisma = (data: any) => {
  return JSON.parse(
    JSON.stringify(data, (key, value) =>
      typeof value === "bigint" ? value.toString() : value
    )
  );
};

type Props = {
  params: Promise<{ id: string }>
}

// 1. GET DETAIL (Untuk Edit)
export async function GET(request: Request, props: Props) {
  const params = await props.params;
  try {
    const news = await prisma.news.findUnique({
      where: { id: Number(params.id) },
    });
    return NextResponse.json(serializePrisma(news));
  } catch (error) {
    return NextResponse.json({ error: "Error" }, { status: 500 });
  }
}


// 2. DELETE (Untuk Hapus)
export async function DELETE(request: Request, props: Props) {
  const params = await props.params;
  console.log(">>> API DELETE DITEMBAK! ID:", params.id);
  try {
    await prisma.news.delete({
      where: { id: Number(params.id) },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Gagal hapus" }, { status: 500 });
  }
}

// 3. PUT (Untuk Update)
export async function PUT(request: Request, props: Props) {
  const params = await props.params;
  try {
    const formData = await request.formData();
    // ... Logika update (bisa dicopy dari jawaban sebelumnya) ...
    // Biar pendek, intinya update Prisma di sini:
    
    // (Simulasi update sederhana agar tidak error)
    const updated = await prisma.news.update({
        where: { id: Number(params.id) },
        data: { 
            title: formData.get("title") as string,
            // ... field lain ...
        }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Gagal update" }, { status: 500 });
  }
}