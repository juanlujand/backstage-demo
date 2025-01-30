import {
  WelcomeTitle,
  HomePageCompanyLogo,
  ClockConfig,
  HeaderWorldClock,
  HomePageRecentlyVisited,
  HomePageTopVisited,
} from '@backstage/plugin-home';
import { Avatar, Content, Header, Page } from '@backstage/core-components';
import { HomePageSearchBar } from '@backstage/plugin-search';
import Grid from '@mui/material/Grid';
import React from 'react';
import { SearchContextProvider } from '@backstage/plugin-search-react';
import { QuickAccess } from './QuickAccess';
import { TimelineTwitter } from './TimelineTwitter';
import {
  UserSettingsMenu,
  useUserProfile,
} from '@backstage/plugin-user-settings';
import { Box } from '@mui/material';
import { makeStyles } from '@material-ui/core';
import LogoFull from '../Root/LogoFull';

const useStyles = makeStyles(theme => ({
    searchBarInput: {
      maxWidth: '60vw',
      margin: 'auto',
      backgroundColor: theme.palette.background.paper,
      borderRadius: '50px',
      boxShadow: theme.shadows[1],
    },
    searchBarOutline: {
      borderStyle: 'none'
    },
    svg: {
      width: 'auto',
      height: 80,
    },
    path: {
      fill: '#3d01a1',
    }
  }));

export const HomePage = () => {
  const classes = useStyles();
  const clockConfigs: ClockConfig[] = [
    {
      label: 'UTC',
      timeZone: 'UTC',
    },
    {
      label: 'PST/PDT',
      timeZone: 'America/Los_Angeles',
    },
    {
      label: 'EST/EDT',
      timeZone: 'America/New_York',
    },
    {
      label: 'CST/CDT',
      timeZone: 'America/Chicago',
    },
    {
      label: 'MST/MDT',
      timeZone: 'America/Denver',
    },
    {
      label: 'SANTIAGO',
      timeZone: 'America/Santiago',
    },
    {
      label: 'BOGOTA',
      timeZone: 'America/Bogota',
    },
  ];

  const timeFormat: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  };

  const { displayName } = useUserProfile();

  const languages = ['Spanish', 'English'];

  return (
    <SearchContextProvider>
      <Page themeId="home">
        <Header
          title={<WelcomeTitle language={languages} />}
          pageTitleOverride="Home"
        >
          <HeaderWorldClock
            clockConfigs={clockConfigs}
            customTimeFormat={timeFormat}
          />
          <Avatar
            displayName={displayName}
            customStyles={{ width: '50px', height: '50px', fontSize: '25px' }}
          />

          <UserSettingsMenu />
        </Header>
        <Content>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
            }}
          >
            {/* useStyles has a lower precedence over mui styles hence why we need to use css */}
            <HomePageCompanyLogo
              logo={<LogoFull />}
            />
            <HomePageSearchBar
                InputProps={{ classes: { root: classes.searchBarInput, notchedOutline: classes.searchBarOutline }}}
                placeholder="Search"
              />
            <Grid container>
              <Grid
                style={{ paddingBottom: 20, paddingLeft: 25, paddingTop: 15 }}
                item
                xs
              >
                <QuickAccess />
              </Grid>

              <Grid
                style={{ paddingBottom: 20, paddingLeft: 25, paddingTop: 15 }}
                item
                xs
              >
                <Grid
                  style={{ paddingBottom: 20, paddingLeft: 25, paddingTop: 15 }}
                  xs={12}
                  container
                  spacing={2}
                  justifyContent="space-between"
                >
                 
                </Grid>

                <Grid item xs={12}>
                  <TimelineTwitter />
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Content>
      </Page>
    </SearchContextProvider>
  );
};
