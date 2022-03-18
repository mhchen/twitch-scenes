import type { NextPage } from 'next';
import Link from 'next/link';

const Home: NextPage = () => {
  return (
    <main className="layout">
      <h1 className="heading-1 stack-16">Twitch Scenes</h1>

      <ul>
        <li>
          <Link href="/scenes/countdown/">
            <a>Countdown</a>
          </Link>
        </li>
        <li>
          <Link href="scenes/one-guest-no-code/">
            <a>One Guest (no code)</a>
          </Link>
        </li>
        <li>
          <Link href="scenes/one-guest/">
            <a>One Guest</a>
          </Link>
        </li>
        <li>
          <Link href="/scenes/solo/">
            <a>Solo</a>
          </Link>
        </li>
      </ul>
    </main>
  );
};

export default Home;
