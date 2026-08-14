export interface TelegramUser {
  id: number;
  is_bot: boolean;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  can_join_groups?: boolean;
  can_read_all_group_messages?: boolean;
  supports_inline_queries?: boolean;
  is_premium?: boolean;
  added_to_attachment_menu?: boolean;
  can_connect_to_business?: boolean;
  has_main_web_app?: boolean;
}

export interface TelegramApiResponse<T> {
  ok: boolean;
  result?: T;
  error_code?: number;
  description?: string;
}

export interface PhotoSize {
  file_id: string;
  file_unique_id: string;
  width: number;
  height: number;
  file_size?: number;
}

export interface UserProfilePhotos {
  total_count: number;
  photos: PhotoSize[][];
}

export interface TelegramFile {
  file_id: string;
  file_unique_id: string;
  file_size?: number;
  file_path?: string;
}

export interface BotInfo {
  id: number;
  firstName: string;
  username: string;
  description: string;
  shortDescription: string;
  photoUrl: string | null;
}

export interface FetchBotRequest {
  token: string;
}

export interface FetchBotResponse {
  success: boolean;
  data?: BotInfo;
  error?: string;
}

export interface UpdateBotRequest {
  token: string;
  name: string;
  description: string;
  shortDescription: string;
}

export interface UpdateBotResponse {
  success: boolean;
  error?: string;
}

export interface BotDescription {
  description: string;
}

export interface BotShortDescription {
  short_description: string;
}
