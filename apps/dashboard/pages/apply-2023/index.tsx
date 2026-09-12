import React, { useEffect } from 'react';
import Hackerform from '../../components/hackerform/hackform/hackform';
import { formMetadata2023HackerApps } from '../../common/hackform.metadata';
import { useHackform } from '../../hooks/use-hackform/use-hackform';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import useNextNexusUser from '../../hooks/use-nextnexus-user/use-nextnexus-user';
import { H3, Link } from '@nextnexus/ui';
import { Button } from '@nextnexus/ui-kit-2023';
import styled from 'styled-components';
import { isHackerPostAppStatus } from '../../common/utils';
import { GetServerSideProps } from 'next';
import { get } from '@vercel/edge-config';

interface ServerSideProps {
  appsOpen: boolean;
}

NProgress.configure({ showSpinner: false, trickle: false, minimum: 0.05 });

export function Index({ appsOpen }: ServerSideProps) {
  const { currentQuestionIndex: cqi, ...hackformUtils } = useHackform();
  const { user } = useNextNexusUser();

  useEffect(() => {
    const numQuestionsTotal =
      hackformUtils.getHackformMetadata().questions.length;
    if (cqi === -1) {
      NProgress.remove();
      return;
    }
    const progress = (cqi + 1) / (numQuestionsTotal + 1);
    NProgress.set(progress);
    return () => {
      NProgress.remove();
    };
  }, [cqi]);

  if (user === null) {
    return (
      <Container>
        <CenterContainer>
          <H3>Loading...</H3>
        </CenterContainer>
      </Container>
    );
  }

  if (isHackerPostAppStatus(user.applicationStatus)) {
    return (
      <Container>
        <CenterContainer>
          <H3>You have already applied!</H3>
          <Link
            href={'/'}
            passHref
            anchortagpropsoverride={{ target: '_self' }}
          >
            <Button color="black">Go back to home</Button>
          </Link>
        </CenterContainer>
      </Container>
    );
  }

  if (!appsOpen) {
    return (
      <Container>
        <CenterContainer>
          <H3>Apps for NextNexus 2023 has closed!</H3>
          <Link
            href={'/'}
            passHref
            anchortagpropsoverride={{ target: '_self' }}
          >
            <Button color="black">Go back to home</Button>
          </Link>
        </CenterContainer>
      </Container>
    );
  }

  return <Hackerform formMetadata={formMetadata2023HackerApps} />;
}

export default Index;

const Container = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CenterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const appsOpen = await get('appsOpen');
  return {
    props: {
      appsOpen,
    } as ServerSideProps,
  };
};
