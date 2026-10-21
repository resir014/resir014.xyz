import { google } from 'googleapis';

export async function getYouTubeChannelStatistics(channelId?: string[]) {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n') ?? '',
    },
    scopes: ['https://www.googleapis.com/auth/youtube.readonly'],
  });

  const youtube = google.youtube({
    auth,
    version: 'v3',
  });

  const response = await youtube.channels
    .list({
      id: channelId,
      part: ['statistics'],
    })
    .then(res => res.data);

  return response;
}
