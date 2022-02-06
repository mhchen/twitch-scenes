import Document, {
  DocumentContext,
  Html,
  Head,
  Main,
  NextScript,
} from 'next/document';

class MyDocument extends Document<{ pathname: string }> {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);

    return { ...initialProps, pathname: ctx.pathname };
  }

  render() {
    const { pathname } = this.props;
    const bodyClassName = pathname.startsWith('/scenes/')
      ? pathname.replace('/scenes/', '')
      : '';

    return (
      <Html>
        <Head>
          <meta charSet="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>Genericmikechen Twitch streams</title>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="true"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Inria+Sans&display=swap"
            rel="stylesheet"
          />
          <script
            defer
            src="https://cdn.jsdelivr.net/npm/comfy.js@latest/dist/comfy.min.js"
          ></script>
        </Head>
        <body className={bodyClassName}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
