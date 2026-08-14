import type {
  TelegramApiResponse,
  TelegramUser,
  UserProfilePhotos,
  TelegramFile,
  BotDescription,
  BotShortDescription,
} from "@/types/telegram";

const TELEGRAM_BASE = "https://api.telegram.org";

export function validateToken(token: string): boolean {
  return /^\d{6,12}:[A-Za-z0-9_-]{35,}$/.test(token.trim());
}

export async function getBotInfo(token: string): Promise<TelegramApiResponse<TelegramUser>> {
  const res = await fetch(`${TELEGRAM_BASE}/bot${token}/getMe`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`HTTP error: ${res.status}`);
  }
  return res.json();
}

export async function getBotDescription(token: string): Promise<TelegramApiResponse<BotDescription>> {
  const res = await fetch(`${TELEGRAM_BASE}/bot${token}/getMyDescription`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
  return res.json();
}

export async function getBotShortDescription(token: string): Promise<TelegramApiResponse<BotShortDescription>> {
  const res = await fetch(`${TELEGRAM_BASE}/bot${token}/getMyShortDescription`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
  return res.json();
}

export async function getBotProfilePhotoUrl(token: string, botId: number): Promise<string | null> {
  try {
    const photosRes = await fetch(
      `${TELEGRAM_BASE}/bot${token}/getUserProfilePhotos?user_id=${botId}&limit=1`,
      { cache: "no-store" }
    );
    if (!photosRes.ok) return null;

    const photosData: TelegramApiResponse<UserProfilePhotos> = await photosRes.json();
    if (!photosData.ok || !photosData.result || photosData.result.total_count === 0) return null;

    const photos = photosData.result.photos;
    if (!photos.length || !photos[0].length) return null;

    const largestPhoto = photos[0][photos[0].length - 1];
    const fileRes = await fetch(
      `${TELEGRAM_BASE}/bot${token}/getFile?file_id=${largestPhoto.file_id}`,
      { cache: "no-store" }
    );
    if (!fileRes.ok) return null;

    const fileData: TelegramApiResponse<TelegramFile> = await fileRes.json();
    if (!fileData.ok || !fileData.result?.file_path) return null;

    return `${TELEGRAM_BASE}/file/bot${token}/${fileData.result.file_path}`;
  } catch {
    return null;
  }
}

export async function setMyName(token: string, name: string): Promise<TelegramApiResponse<boolean>> {
  const res = await fetch(`${TELEGRAM_BASE}/bot${token}/setMyName`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
  return res.json();
}

export async function setMyDescription(token: string, description: string): Promise<TelegramApiResponse<boolean>> {
  const res = await fetch(`${TELEGRAM_BASE}/bot${token}/setMyDescription`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ description }),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
  return res.json();
}

export async function setMyShortDescription(token: string, short_description: string): Promise<TelegramApiResponse<boolean>> {
  const res = await fetch(`${TELEGRAM_BASE}/bot${token}/setMyShortDescription`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ short_description }),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
  return res.json();
}
