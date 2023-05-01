import { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';

export const reqAuth = async (context: NextPageContext) => {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    };
  }
};
