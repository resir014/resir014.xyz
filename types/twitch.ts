export interface TwitchOAuthResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  scope: string[];
  token_type: string;
}

export interface HelixUsersData {
  id: string;
  login: string;
  display_name: string;
  type: string;
  broadcaster_type: string;
  description: string;
  profile_image_url: string;
  offline_image_url: string;
  view_count: number;
  email: string;
}

export interface HelixFollowerData {
  user_id: string;
  user_name: string;
  user_login: string;
  followed_at: string;
}

export interface HelixUsersResponse {
  data: HelixUsersData[];
}

export interface HelixStreamsData {
  id: string;
  user_id: string;
  user_name: string;
  game_id: string;
  game_name: string;
  type: string;
  title: string;
  viewer_count: number;
  started_at: string;
  language: string;
  thumbnail_url: string;
  tag_ids: string[];
}

export interface HelixGetChannelFollowersResponse {
  total: number;
  data: HelixFollowerData[];
  pagination: {
    cursor?: string;
  };
}

export interface HelixStreamsResponse {
  data: HelixStreamsData[];
  pagination: {
    cursor?: string;
  };
}

export type TwitchAPIUserResponse = HelixUsersData & { followers: number };
