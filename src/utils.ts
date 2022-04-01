interface Config {
  guestName: string;
  guestHandle: string;
  subtitle: string;
}

const GIST_URL =
  'https://gist.githubusercontent.com/mhchen/d57692c3a871ed6c2e6fe6342cd8d00a/raw/26b0e37330ec824c4bc3a5e9331db88fe0f18915/twitch-scene.json';

export async function fetchConfig() {
  return fetch(GIST_URL).then((res) => res.json()) as Promise<Config>;
}
