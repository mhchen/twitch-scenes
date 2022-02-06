const TOKEN_URL = 'https://id.twitch.tv/oauth2/token';
const BROADCASTER_ID = '114371750';
const CHANNEL_URL = `https://api.twitch.tv/helix/channels?broadcaster_id=${BROADCASTER_ID}`;
const REVOKE_URL = 'https://id.twitch.tv/oauth2/revoke';
const CLIENT_ID = 'mp2kn94enta5szcv16f97rkpq1e5wp';

async function getAccessToken() {
  const secret = process.env.TWITCH_SECRET;

  const { access_token: accessToken } = (await fetch(TOKEN_URL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      client_id: CLIENT_ID,
      client_secret: secret,
      grant_type: 'client_credentials',
    }),
  }).then((res) => res.json())) as { access_token: string };

  return accessToken;
}

async function revokeAccessToken(token: string) {
  return fetch(REVOKE_URL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      client_id: CLIENT_ID,
      token,
    }),
  }).then((res) => res.json());
}
interface ChannelInformation {
  broadcaster_id: string;
  broadcaster_login: string;
  broadcaster_name: string;
  broadcaster_language: string;
  game_id: string;
  game_name: string;
  title: string;
  delay: number;
}

interface ChannelInformationResponse {
  data: ChannelInformation[];
}

async function getChannelInformation() {
  const accessToken = await getAccessToken();
  const response = (await fetch(CHANNEL_URL, {
    method: 'GET',
    headers: {
      'Client-ID': CLIENT_ID,
      Authorization: `Bearer ${accessToken}`,
    },
  }).then((res) => res.json())) as ChannelInformationResponse;

  await revokeAccessToken(accessToken);
  console.log(response);
  return response.data[0];
}

export default async function getChannelServerSideProps() {
  const channelInformation = await getChannelInformation();
  return {
    props: {
      title: channelInformation.title,
    },
  };
}
