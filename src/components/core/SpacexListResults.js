import { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/styles';

import {
  Box,
  Button,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  Typography
} from '@material-ui/core';
import Popup from './Popups';
import Graphpopup from './Graphpopup';
import wiki from './static/img/wiki.png';
import reddit from './static/img/reddit.png';
import spacex from './static/img/spacex.jpg';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));
const SpacexListResults = () => {
  const [open, setOpen] = useState(false);
  const [graphopen, setGraphopen] = useState(false);
  const [details, setDetails] = useState(0);
  const [data, setData] = useState({ hits: [] });

  useEffect(() => {
    const apiUrl = 'https://api.spacexdata.com/v3/history';
    axios.get(apiUrl).then((repos) => {
      const allRepos = repos;
      setData({ hits: allRepos.data });
    });
  }, []);

  const handleClickOpen = (value) => {
    setDetails(value);
    setOpen(true);
  };
  /* button click */
  const handleClickLaunchpads = (e, id) => {
    e.stopPropagation();
    setGraphopen(true);
    console.log(id);
  };

  const preventDefault = (e) => {
    e.stopPropagation();
  };
  const classes = useStyles();

  return (
    <div>
      <Box align="left" pb={1}>
        <Button
          variant="contained"
          onClick={(e) => handleClickLaunchpads(e)}
        >
          Launch Pads
        </Button>
      </Box>
      <Card>
        <PerfectScrollbar>
          <Box sx={{ minWidth: 800 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography style={{ fontWeight: 600 }}>
                      ID
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography style={{ fontWeight: 600 }}>
                      Title
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography style={{ fontWeight: 600 }}>
                      Flight Number
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography style={{ fontWeight: 600 }}>
                      Links
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography style={{ fontWeight: 600 }}>
                      Date and Time
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.hits.map((customer) => (
                  <Tooltip title="Click on row for details">
                    <TableRow
                      hover
                      key={customer.id}
                      onClick={() => handleClickOpen(customer.details)}
                      style={{ cursor: 'pointer' }}
                    >
                      <TableCell>
                        {customer.id}
                      </TableCell>
                      <TableCell>
                        {customer.title}
                      </TableCell>
                      <TableCell>
                        {customer.flight_number}
                      </TableCell>
                      <TableCell href={customer.links.reddit}>
                        <div className={classes.root}>
                          <Tooltip title="Reddit link">
                            <a href={customer.links.reddit} rel="noopener noreferrer" target="_blank" onClick={(e) => preventDefault(e)}>
                              <Avatar alt="Reddit" src={reddit} className={classes.small} />
                            </a>
                          </Tooltip>
                          <Tooltip title="Sapcex article">
                            <a href={customer.links.article} rel="noopener noreferrer" target="_blank" onClick={(e) => preventDefault(e)}>
                              <Avatar alt="Article" src={spacex} className={classes.small} />
                            </a>
                          </Tooltip>
                          <Tooltip title="Wiki">
                            <a href={customer.links.wikipedia} rel="noopener noreferrer" target="_blank" onClick={(e) => preventDefault(e)}>
                              <Avatar alt="Wiki" src={wiki} className={classes.small} />
                            </a>
                          </Tooltip>
                        </div>
                      </TableCell>
                      <TableCell>
                        {moment(customer.event_date_utc).format('DD-MMM-YYYY h:mm:ss a')}
                      </TableCell>
                    </TableRow>
                  </Tooltip>
                ))}
              </TableBody>
            </Table>
          </Box>
        </PerfectScrollbar>
        <Popup
          open={open}
          setOpenPopup={setOpen}
          title={details}
        />
        <Graphpopup
          graphopen={graphopen}
          setOpenPopup={setGraphopen}
        />
      </Card>
    </div>
  );
};
export default SpacexListResults;
