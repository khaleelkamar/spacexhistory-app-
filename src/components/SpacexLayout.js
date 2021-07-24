import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { experimentalStyled } from '@material-ui/core';
import SpacexNavbar from './SpacexNavbar';
import SpacexSidebar from './SpacexSidebar';

const SpacexLayoutRoot = experimentalStyled('div')(
  ({ theme }) => ({
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%'
  })
);

const SpacexLayoutWrapper = experimentalStyled('div')(
  ({ theme }) => ({
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
    paddingTop: 64,
    [theme.breakpoints.up('lg')]: {
      paddingLeft: 256
    }
  })
);

const SpacexLayoutContainer = experimentalStyled('div')({
  display: 'flex',
  flex: '1 1 auto',
  overflow: 'hidden'
});

const SpacexLayoutContent = experimentalStyled('div')({
  flex: '1 1 auto',
  height: '100%',
  overflow: 'auto'
});

const SpacexLayout = () => {
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <SpacexLayoutRoot>
      <SpacexNavbar onMobileNavOpen={() => setMobileNavOpen(true)} />
      <SpacexSidebar
        onMobileClose={() => setMobileNavOpen(false)}
        openMobile={isMobileNavOpen}
      />
      <SpacexLayoutWrapper>
        <SpacexLayoutContainer>
          <SpacexLayoutContent>
            <Outlet />
          </SpacexLayoutContent>
        </SpacexLayoutContainer>
      </SpacexLayoutWrapper>
    </SpacexLayoutRoot>
  );
};

export default SpacexLayout;
