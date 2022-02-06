import type { GetServerSideProps, NextPage } from 'next';
import type { ChannelProps } from '../../src/types';
import getChannelServerSideProps from '../../src/getChannelServerSideProps';
import Footer from '../../src/components/Footer';
import dynamic from 'next/dynamic';

const Chat = dynamic(() => import('../../src/components/Chat'), { ssr: false });

export const getServerSideProps: GetServerSideProps<
  ChannelProps
> = async () => {
  return getChannelServerSideProps();
};

const Countdown: NextPage<ChannelProps> = ({ title }) => {
  return (
    <>
      <section className="source" data-grid-area="main">
        <p className="heading-1">Starting Soon!</p>
        <p id="time">5:00</p>
      </section>
      <section data-grid-area="host">
        <Chat />
      </section>
      <Footer title={title} />
    </>
  );
};

export default Countdown;
