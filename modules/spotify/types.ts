export interface SpotifyExternalUrls {
  spotify: string;
}

export interface SpotifyArtist {
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  name: string;
  type: 'artist';
  uri: string;
}

export interface SpotifyAlbumImage {
  height: number;
  url: string;
  width: number;
}

export interface SpotifyAlbum {
  album_type: string;
  artists: SpotifyArtist[];
  available_markets: string[];
  external_urls: SpotifyExternalUrls;
  href: string;
  id: string;
  images: SpotifyAlbumImage[];
  name: string;
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
  type: 'album';
  uri: string;
}

export interface SpotifyTrack {
  album: SpotifyAlbum;
  artists: SpotifyArtist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_urls: SpotifyExternalUrls;
  href: string;
  id: string;
  is_local: boolean;
  name: string;
  popularity: 40;
  preview_url: string;
  track_number: 2;
  type: 'track';
  uri: string;
}

export interface SpotifyCurrentlyPlaying {
  timestamp: number;
  context: {
    external_urls: SpotifyExternalUrls;
    href: string;
    type: string;
    uri: string;
  };
  progress_ms: number;
  item: SpotifyTrack;
  currently_playing_type: string;
  is_playing: boolean;
}

export interface SpotifyTopTracks {
  items: SpotifyTrack[];
}

export interface TrackResponseItem {
  album: string;
  albumImageUrl: string;
  artist: string;
  songUrl: string;
  title: string;
  id: string;
}

export interface TopTracksResponse {
  tracks: TrackResponseItem[];
}

export interface CurrentlyPlayingResponse extends TrackResponseItem {
  isPlaying: boolean;
}
