import RootLayout from '@/components/layouts/layout';
import Banner from '@/components/netflix1/Banner';
import { NextPage } from 'next';

const MyList: NextPage = () => {
  return (
    <RootLayout>
      <Banner />
    </RootLayout>
  );
};

export default MyList;
