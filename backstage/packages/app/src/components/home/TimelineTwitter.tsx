import { Progress } from '@backstage/core-components';
import React from 'react';
import { Timeline } from 'react-twitter-widgets';
import { useAsync } from 'react-use';

export function TimelineTwitter() {
  const { loading } = useAsync(async () => {});

  if (loading) {
    return <Progress />;
  }

  return (
    <Timeline
      dataSource={{
        sourceType: 'profile',
        screenName: 'CloudNativeFdn',
      }}
      options={{
        height: '1000',
      }}
    />
  );
}
