import { EmptyState, InfoCard } from '@backstage/core-components';
import { useApi, discoveryApiRef } from '@backstage/core-plugin-api';
import {
  Tool,
  HomePageToolkit,
  ComponentAccordion,
} from '@backstage/plugin-home';
import { makeStyles } from '@material-ui/core';
import CircularProgress from '@mui/material/CircularProgress';
import React, { useState } from 'react';
import useAsync from 'react-use/lib/useAsync';

type QuickAccessLinks = {
  title: string;
  isExpanded?: boolean;
  links: (Tool & { iconUrl: string })[];
};

const useQuickAccessStyles = makeStyles({
  img: {
    height: '40px',
    width: 'auto',
  },
});

function request<TResponse>(
  url: string,
  config: RequestInit = {},
): Promise<TResponse> {
  return fetch(url, config)
    .then(response => response.json())
    .then(data => data as TResponse);
}

const containerStyle = { width: '100%', height: '100vh' };

export function QuickAccess() {
  const classes = useQuickAccessStyles();
  const discoveryApi = useApi(discoveryApiRef);
  const [quickAccess, setQuickAccess] = useState<QuickAccessLinks[]>([]);

  const { error, loading, value } = useAsync(async () => {
    const quickaccessUrl = `${await discoveryApi.getBaseUrl(
      'proxy',
    )}/quickaccess`;
    const data = (await request(`${quickaccessUrl}`)) as QuickAccessLinks[];
    setQuickAccess(data);

    return data;
  });
  if (loading) {
    return <CircularProgress />;
  }

  if (error || value?.length === undefined) {
    return (
      <div style={containerStyle}>
        <EmptyState
          missing="data"
          title="Unable to Load QuickAccess."
          description="Please try again later, if the problem persist, please contact Alejandria's Admins."
        />
      </div>
    );
  }

  return (
    <InfoCard title="Quick Access" noPadding>
      {quickAccess.map(item => (
        <HomePageToolkit
          key={item.title}
          title={item.title}
          tools={item.links.map(link => ({
            ...link,
            icon: (
              <img
                className={classes.img}
                src={link.iconUrl}
                alt={link.label}
              />
            ),
          }))}
          Renderer={
            item.isExpanded
              ? props => <ComponentAccordion expanded {...props} />
              : props => <ComponentAccordion {...props} />
          }
        />
      ))}
    </InfoCard>
  );
}
