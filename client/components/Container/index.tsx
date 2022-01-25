import Head from "next/head";

export const Container = ({ title, children }) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      <div>{children}</div>
    </div>
  );
};
