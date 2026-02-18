import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Сейчас просто логируем на сервере.
    // Позже можно заменить на отправку в Telegram/Email или сохранение в CMS.
    console.log("[LEAD]", {
      ...body,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    return new NextResponse("Bad Request", { status: 400 });
  }
}
