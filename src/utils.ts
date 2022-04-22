interface Config {
  guestName: string;
  guestHandle: string;
  subtitle: string;
}

const GIST_URL =
  'https://gist.githubusercontent.com/mhchen/d57692c3a871ed6c2e6fe6342cd8d00a/raw/1112468935cdcb514e9563304ecf40ae4249245e/twitch-scene.json';

export async function fetchConfig() {
  return fetch(GIST_URL).then((res) => res.json()) as Promise<Config>;
}
