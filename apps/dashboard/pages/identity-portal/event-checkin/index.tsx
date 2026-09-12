import { Colors2023 } from '@nextnexus/styles';
import { BoldText } from '@nextnexus/ui';
import { Text } from '@nextnexus/ui';
import { GlowSpan } from '@nextnexus/ui-kit-2023';
import styled from 'styled-components';
import { BackButton } from '../../../components/identity-portal/back-button/back-button';
import { NextNexusRole } from '@nextnexus/types';
import useNextNexusUser from '../../../hooks/use-nextnexus-user/use-nextnexus-user';
import router from 'next/router';
import { ScrollableListBox } from '../../../components/identity-portal/scrollable-list-box/scrollable-list-box';
import { useEffect, useState } from 'react';
import searchEvent from '../../../common/search-event';
import { useNextNexusSupabase } from '@nextnexus/nextnexus-supabase-context';
import { SearchUserBox } from 'apps/dashboard/components/identity-portal/search-user-box/search-user-box';
import Select from 'react-select';

export function Index() {
  const { user: authUser } = useNextNexusUser();
  const { supabase } = useNextNexusSupabase();

  //search for all events in supabase table
  const [searchRes, setSearchRes] = useState(null);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    search();
  }, []);

  if (authUser == null) {
    return <>Loading</>;
  }
  // Limit access to only volunteer role
  if (
    authUser?.role !== NextNexusRole.VOLUNTEER &&
    authUser?.role !== NextNexusRole.SPONSOR
  ) {
    router.push('/');
    return <></>;
  }

  async function search() {
    setSearchRes(await searchEvent(supabase));
  }

  return (
    <>
      <div className="flex flex-col p-[40px]">
        <p className="mb-[64px]">Select an event!</p>

        <div className="flex flex-col gap-[10px]">
          <h2 className="m-0 text-xl text-theme-redward">Select an event!</h2>
          <Select
            isSearchable={true}
            isDisabled={searchRes == null}
            isLoading={searchRes == null}
            options={searchRes}
            getOptionLabel={(option) => option.name}
            getOptionValue={(option) => option.id}
            onChange={(option) => setSelected(option.id)}
            className="w-[250px]"
            classNamePrefix="select"
          />

          <button
            onClick={() =>
              router.push(`/identity-portal/attendee-event-scan?id=${selected}`)
            }
            disabled={selected == null}
            className="w-fit bg-red-300 hover:bg-theme-redward disabled:bg-gray-300 border-black border-[1px] border-solid rounded-[8px] text-xs px-[20px] py-[8px]"
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
}

export default Index;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  align-items: center;
  justify-items: center;
  min-height: 100%;
`;

const ColumnCenter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ColumnSpacedCenter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
`;
