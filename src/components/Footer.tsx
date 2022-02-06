import React from 'react';
import config from '../config';

export type FooterProps = {
  title: string;
};

export default function Footer({ title }: FooterProps) {
  return (
    <footer className="footer" data-grid-area="footer">
      <div className="flex-row">
        <div className="logo">
          <img src="/images/logo.svg" alt="" />
        </div>
        <div>
          <h1 className="heading-1 stack-xs">{title}</h1>
          <h2 className="heading-2">{config.subtitle}</h2>
        </div>
      </div>
    </footer>
  );
}
