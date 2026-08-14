import { NextRequest, NextResponse } from "next/server";
import { validateToken, setMyName, setMyDescription, setMyShortDescription } from "@/lib/telegram";
import type { UpdateBotResponse } from "@/types/telegram";

export const runtime = "edge";

export async function POST(request: NextRequest): Promise<NextResponse<UpdateBotResponse>> {
  try {
    const body = await request.json();
    const token: string = (body?.token ?? "").trim();
    const name: string = (body?.name ?? "").trim();
    const description: string = (body?.description ?? "").trim();
    const shortDescription: string = (body?.shortDescription ?? "").trim();

    if (!token) {
      return NextResponse.json({ success: false, error: "Bot token is required." }, { status: 400 });
    }

    if (!validateToken(token)) {
      return NextResponse.json({ success: false, error: "Invalid bot token format." }, { status: 400 });
    }

    if (!name) {
      return NextResponse.json({ success: false, error: "Bot name cannot be empty." }, { status: 400 });
    }

    if (name.length > 64) {
      return NextResponse.json({ success: false, error: "Bot name must be 64 characters or less." }, { status: 400 });
    }

    if (description.length > 512) {
      return NextResponse.json({ success: false, error: "Description must be 512 characters or less." }, { status: 400 });
    }

    if (shortDescription.length > 120) {
      return NextResponse.json({ success: false, error: "Short description must be 120 characters or less." }, { status: 400 });
    }

    const [nameRes, descRes, shortDescRes] = await Promise.all([
      setMyName(token, name),
      setMyDescription(token, description),
      setMyShortDescription(token, shortDescription),
    ]);

    if (!nameRes.ok) {
      return NextResponse.json(
        { success: false, error: nameRes.description ?? "Failed to update bot name." },
        { status: 400 }
      );
    }

    if (!descRes.ok) {
      return NextResponse.json(
        { success: false, error: descRes.description ?? "Failed to update bot description." },
        { status: 400 }
      );
    }

    if (!shortDescRes.ok) {
      return NextResponse.json(
        { success: false, error: shortDescRes.description ?? "Failed to update short description." },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "An unexpected error occurred.";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
