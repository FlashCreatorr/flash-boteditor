import { NextRequest, NextResponse } from "next/server";
import {
  validateToken,
  getBotInfo,
  getBotDescription,
  getBotShortDescription,
  getBotProfilePhotoUrl,
} from "@/lib/telegram";
import type { FetchBotResponse } from "@/types/telegram";

export const runtime = "edge";

export async function POST(request: NextRequest): Promise<NextResponse<FetchBotResponse>> {
  try {
    const body = await request.json();
    const token: string = (body?.token ?? "").trim();

    if (!token) {
      return NextResponse.json({ success: false, error: "Bot token is required." }, { status: 400 });
    }

    if (!validateToken(token)) {
      return NextResponse.json(
        { success: false, error: "Invalid token format. Please check your Bot Token and try again." },
        { status: 400 }
      );
    }

    const [meRes, descRes, shortDescRes] = await Promise.all([
      getBotInfo(token),
      getBotDescription(token),
      getBotShortDescription(token),
    ]);

    if (!meRes.ok || !meRes.result) {
      return NextResponse.json(
        {
          success: false,
          error: meRes.description ?? "Failed to fetch bot information. Please verify your token.",
        },
        { status: 400 }
      );
    }

    const bot = meRes.result;
    const photoUrl = await getBotProfilePhotoUrl(token, bot.id);

    return NextResponse.json({
      success: true,
      data: {
        id: bot.id,
        firstName: bot.first_name,
        username: bot.username ?? "",
        description: descRes.ok && descRes.result ? descRes.result.description : "",
        shortDescription: shortDescRes.ok && shortDescRes.result ? shortDescRes.result.short_description : "",
        photoUrl,
      },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "An unexpected error occurred.";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
