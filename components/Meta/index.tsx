import Head from "next/head";

type TProps = {
  title: string;
  keywords: string;
};

const Meta = ({ title, keywords }: TProps) => {
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="keywords" content={keywords} />
      <meta charSet="utf-8" />
      <link rel="icon" href="/favicon.ico" />
      <title>{title}</title>
    </Head>
  );
};

Meta.defaultProps = {
  title: "Katch",
  keywords: "restaurant, pickup, delivery, food",
};

export default Meta;
