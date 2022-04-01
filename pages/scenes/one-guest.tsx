import type { GetServerSideProps, NextPage } from 'next';
import { useEffect, useState } from 'react';
import Footer from '../../src/components/Footer';
import HostCard from '../../src/components/HostCard';
import getChannelServerSideProps from '../../src/getChannelServerSideProps';
import { ChannelProps } from '../../src/types';
import dynamic from 'next/dynamic';
import { fetchConfig } from '../../src/utils';

const Chat = dynamic(() => import('../../src/components/Chat'), { ssr: false });

export const getServerSideProps: GetServerSideProps<
  ChannelProps
> = async () => {
  return getChannelServerSideProps();
};

const OneGuest: NextPage<ChannelProps> = ({ title }) => {
  const [guestName, setGuestName] = useState('');
  const [guestHandle, setGuestHandle] = useState('');

  useEffect(() => {
    void (async () => {
      const { guestName, guestHandle } = await fetchConfig();
      setGuestName(guestName);
      setGuestHandle(guestHandle);
    })();
  }, []);
  return (
    <>
      <section className="source chroma" data-grid-area="main"></section>
      <section data-grid-area="host">
        <HostCard name="Mike Chen" handle="genericmikechen" />
        <HostCard name={guestName} handle={guestHandle} />
        <Chat />
      </section>
      <Footer title={title} />
    </>
  );
};

export default OneGuest;
