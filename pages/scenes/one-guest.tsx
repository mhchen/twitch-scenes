import type { GetServerSideProps, NextPage } from 'next';
import Footer from '../../src/components/Footer';
import HostCard from '../../src/components/HostCard';
import getChannelServerSideProps from '../../src/getChannelServerSideProps';
import { ChannelProps } from '../../src/types';
import dynamic from 'next/dynamic';
import config from '../../src/config';

const Chat = dynamic(() => import('../../src/components/Chat'), { ssr: false });

export const getServerSideProps: GetServerSideProps<
  ChannelProps
> = async () => {
  return getChannelServerSideProps();
};

const OneGuest: NextPage<ChannelProps> = ({ title }) => {
  return (
    <>
      <section className="source chroma" data-grid-area="main"></section>
      <section data-grid-area="host">
        <HostCard name="Mike Chen" handle="genericmikechen" />
        <HostCard name={config.guestName} handle={config.guestHandle} />
        <Chat />
      </section>
      <Footer title={title} />
    </>
  );
};

export default OneGuest;
