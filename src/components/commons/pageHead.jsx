import Head from 'next/head';

const PageHaead = ({ title }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="icon" href="/logo/logoIth.png" type="image/x-icon" />
    </Head>
  );
};
export default PageHaead;
