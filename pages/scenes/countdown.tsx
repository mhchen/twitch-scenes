import type { GetServerSideProps, NextPage } from 'next';
import type { ChannelProps } from '../../src/types';
import getChannelServerSideProps from '../../src/getChannelServerSideProps';
import Footer from '../../src/components/Footer';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const Chat = dynamic(() => import('../../src/components/Chat'), { ssr: false });

export const getServerSideProps: GetServerSideProps<
  ChannelProps
> = async () => {
  return getChannelServerSideProps();
};

const MINUTES = 4;
const SECONDS = 50;

const timerLength = 1000 * 60 * MINUTES + 1000 * SECONDS;

const targetTime =
  Math.floor((new Date().getTime() + timerLength) / 1000) * 1000;

const Countdown: NextPage<ChannelProps> = ({ title }) => {
  const [timeString, setTimeString] = useState('4:50');
  useEffect(() => {
    function tick() {
      const timeRemaining = Math.max(0, targetTime - new Date().getTime());
      const minutes = Math.floor(
        (timeRemaining % (1000 * 60 * 60)) / (1000 * 60),
      );
      const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
      setTimeString(`${minutes}:${seconds.toString().padStart(2, '0')}`);
      const now = new Date().getTime();
      const nextSecond = (Math.floor(now / 1000) + 1) * 1000;
      setTimeout(tick, nextSecond - now);
    }
    tick();
  }, []);

  return (
    <>
      <section className="source" data-grid-area="main">
        <p className="heading-1">Starting Soon!</p>
        <p className="time">{timeString}</p>
      </section>
      <section data-grid-area="host">
        <Chat />
      </section>
      <Footer title={title} />
    </>
  );
};

export default Countdown;
