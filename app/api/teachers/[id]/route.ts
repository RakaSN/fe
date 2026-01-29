import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

// 🛠️ FIX BIGINT (Wajib ada)
// @ts-ignore
BigInt.prototype.toJSON = function () { return Number(this) }

const prisma = new PrismaClient();

// Perhatikan tipe data props di sini untuk Next.js 15+
export async function GET(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  try {
    // ⚠️ WAJIB AWAIT PARAMS DI NEXT.JS TERBARU
    const params = await props.params; 
    const idString = params.id;
    const id = Number(idString);

    console.log(`[API CHECK] Menerima Request ID: ${idString} -> Parsed: ${id}`);

    if (!id || isNaN(id)) {
      return NextResponse.json({ error: "ID tidak valid" }, { status: 400 });
    }

    const teacher = await prisma.teachers.findUnique({
      where: { id: id },
    });

    if (!teacher) {
      console.log(`[API] Guru ID ${id} tidak ditemukan di DB.`);
      return NextResponse.json({ error: "Data tidak ditemukan" }, { status: 404 });
    }

    return NextResponse.json(teacher);

  } catch (error) {
    console.error("[API ERROR] Detail:", error);
    return NextResponse.json({ error: "Server Error", details: String(error) }, { status: 500 });
  }
}