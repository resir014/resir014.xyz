export interface TwitchOAuthResponse {
  access_token: string
  refresh_token: string
  expires_in: number
  scope: string[]
  token_type: string
}

export interface HelixUsersData {
  id: number
  login: number
  display_name: number
  type: number
  broadcaster_type: number
  description: number
  profile_image_url: number
  offline_image_url: number
  view_count: number
  email: number
}

export interface HelixUsersResponse {
  data: HelixUsersData[]
}

export interface HelixStreamsData {
  id: string
  user_id: string
  user_name: string
  game_id: string
  game_name: string
  type: string
  title: string
  viewer_count: number
  started_at: string
  language: string
  thumbnail_url: string
  tag_ids: string[]
}

export interface HelixStreamsResponse {
  data: HelixStreamsData[]
  pagination: {
    cursor?: string
  }
}
