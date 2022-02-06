import React from 'react';

export type HostCardProps = {
  name: string;
  handle: string;
};

export default function HostCard({ name, handle }: HostCardProps) {
  return (
    <figure className="host-card">
      <div className="host-img chroma"></div>
      <figcaption className="nameplate">
        <div>{name}</div>
        <div>@{handle}</div>
      </figcaption>
    </figure>
  );
}
