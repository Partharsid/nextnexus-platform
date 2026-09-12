import React from 'react';
import Image from 'next/image';
import { H3, Text, Link } from '@nextnexus/ui';
import { Colors2023 } from '@nextnexus/styles';

function RSVPClosedPlaceholder() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <Image
        src="/hackform-illustrations/purple-planet.svg"
        width={200}
        height={200}
        priority
        alt="Purple planet"
      />
      <H3>RSVP for NextNexus X has closed!</H3>
      <Text>
        We have closed RSVPs for NextNexus X. If you think this is a mistake, let
        us know at{' '}
        <Link
          href="mailto:team@nextnexus.com"
          passHref
          underline
          anchortagpropsoverride={{
            style: { color: Colors2023.BLUE.STANDARD },
          }}
        >
          team@nextnexus.com
        </Link>{' '}
      </Text>
      <Text>
        NextNexus is committed to providing participants with the best experience
        possible. If there’s anything we can do to improve your time at our
        event, please let us know!
      </Text>
    </div>
  );
}

export default RSVPClosedPlaceholder;
