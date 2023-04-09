import type { GetServerSideProps, NextPage } from 'next';

import Loader from '@/components/loading/Loader';

const Index: NextPage = () => {
  return (
    <div>
      <Loader />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  const acceptLanguage = context.req.headers['accept-language'];
  const browserLang = acceptLanguage?.split(',')[0]?.trim();

  if (browserLang && browserLang.includes('de')) {
    return {
      redirect: {
        destination: '/de-DE',
        permanent: false
      }
    };
  }
  if (browserLang && browserLang.includes('en')) {
    return {
      redirect: {
        destination: '/en-US',
        permanent: false
      }
    };
  }

  return {
    redirect: {
      destination: '/en-US',
      permanent: false
    }
  };
};

export default Index;
