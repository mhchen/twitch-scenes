import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <main className="layout">
      <h1 className="heading-1 stack-16">Twitch Scenes</h1>

      <ul>
        <li>
          <a href="/scenes/countdown/">Countdown</a>
        </li>
        <li>
          <a href="/scenes/one-guest/">One Guest</a>
        </li>
        <li>
          <a href="/scenes/solo/">Solo</a>
        </li>
      </ul>
    </main>
  );
};

export default Home;
