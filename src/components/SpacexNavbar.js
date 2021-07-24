import {
  AppBar,
  Box,
  Toolbar
} from '@material-ui/core';

function SpacexNavbar() {
  return (
    <AppBar
      elevation={0}
    >
      <Toolbar>
        <Box sx={{ flexGrow: 1 }} />
      </Toolbar>
    </AppBar>
  );
}

export default SpacexNavbar;
