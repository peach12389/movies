import Meta from '../../components/Meta';
import RestaurantLayout from '../../layouts/restaurant';
import { RestaurantOverView } from '../../containers/RestaurantOverView';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { GET_STORE } from '../../gql/seller/query';
import { useQuery } from '@apollo/client';
import { RestaurantMenu } from '../../containers/RestaurantMenu';
import { Tabs, TabPanel, TabList, Tab, resetIdCounter } from 'react-tabs';
import { useState } from 'react';
import Restaurant404 from '../../containers/Restaurant404';
import FSL from '../../components/Loading/fullScreen';

resetIdCounter();
export default function Restaurant({ query }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const tab = query.tab;
  const tabs = ['overview', 'menu'];
  const selectedTab = tabs.includes(tab) ? tab : 'overview';
  const [tabIndex, setTabIndex] = useState(tabs.indexOf(selectedTab));
  const { data, loading, error } = useQuery(GET_STORE, { variables: { id: query.id } });
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Meta title="...loading" />
        <FSL />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Meta title="Oooops" />
        <div>Oooops</div>
        <div>{JSON.stringify({})}</div>
      </div>
    );
  }

  if (data?.getStore._id) {
    return (
      <RestaurantLayout data={data?.getStore} tabs={tabs} tabIndex={tabIndex} setTabIndex={setTabIndex}>
        <Tabs selectedIndex={tabIndex} onSelect={() => true}>
          <TabList>
            <Tab> </Tab>
            <Tab> </Tab>
          </TabList>
          <TabPanel>
            <RestaurantOverView data={data?.getStore} />
          </TabPanel>
          <TabPanel>
            <RestaurantMenu data={data?.getStore} />
          </TabPanel>
        </Tabs>
      </RestaurantLayout>
    );
  } else {
    return <Restaurant404 />;
  }
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const tab = query.tab ? query.tab : 'overview';
  return {
    props: {
      query: {
        id: query.id,
        tab,
      },
    },
  };
};
