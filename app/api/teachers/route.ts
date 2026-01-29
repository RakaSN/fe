import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

// --- 🛠️ FIX MAGIC UNTUK BIGINT 🛠️ ---
// Kode ini memaksa BigInt (dari database) diubah jadi Number biasa
// supaya JSON tidak error saat kirim data ke frontend.
// @ts-ignore
BigInt.prototype.toJSON = function () { return Number(this) }
// -------------------------------------

const globalForPrisma = global as unknown as { prisma: PrismaClient };
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// 1. GET: Ambil Semua Data
export async function GET() {
  try {
    const teachers = await prisma.teachers.findMany({
      orderBy: { id: 'desc' }
    });
    
    // Sekarang aman karena BigInt sudah di-handle di atas
    return NextResponse.json(teachers);

  } catch (error) {
    console.error("❌ ERROR DATABASE (GET):", error);
    return NextResponse.json({ error: "Gagal mengambil data" }, { status: 500 });
  }
}

// 2. POST: Tambah Data Baru
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const newTeacher = await prisma.teachers.create({
      data: {
        name: body.name,
        role: body.role,
        subject: body.subject,
        experience: body.experience,
        level: body.level || "Beginner",
        image: body.image,
        theme_color: body.theme_color || "cyan",
        linkedin: body.linkedin,
        email: body.email
      },
    });
    return NextResponse.json(newTeacher, { status: 201 });
  } catch (error) {
    console.error("❌ ERROR DATABASE (POST):", error);
    return NextResponse.json({ error: "Gagal menyimpan data" }, { status: 500 });
  }
}

// 3. PUT: Update Data
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...updateData } = body;

    const updatedTeacher = await prisma.teachers.update({
      where: { id: Number(id) },
      data: updateData,
    });

    return NextResponse.json(updatedTeacher);
  } catch (error) {
    console.error("❌ ERROR DATABASE (PUT):", error);
    return NextResponse.json({ error: "Gagal update" }, { status: 500 });
  }
}

// 4. DELETE: Hapus Data
export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const { id } = body;

    await prisma.teachers.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({ message: "Berhasil dihapus" });
  } catch (error) {
    console.error("❌ ERROR DATABASE (DELETE):", error);
    return NextResponse.json({ error: "Gagal hapus" }, { status: 500 });
  }
}