import { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
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

  return (
    <div>
      <Box align="left" pb={1}>
        <Button
          variant="contained"
          onClick={(e) => handleClickLaunchpads(e)}
        >
          LAUNCH SITES
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
                      Event date unix
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography style={{ fontWeight: 600 }}>
                      Event date utc
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
                        {customer.title}
                      </TableCell>
                      <TableCell>
                        {customer.flight_number}
                      </TableCell>
                      <TableCell href={customer.links.reddit}>
                        <Box
                          sx={{
                            alignItems: 'center',
                          }}
                        >
                          <Box
                            color="textPrimary"
                          >
                            <Tooltip title="Open link in new tab" onMouseEnter={(e) => preventDefault(e)}>
                              <a href={customer.links.reddit} rel="noopener noreferrer" target="_blank" onClick={(e) => preventDefault(e)}>Reddit</a>
                            </Tooltip>
                          </Box>
                          <Box
                            color="textPrimary"
                          >
                            <Tooltip title="Open link in new tab" onMouseEnter={(e) => preventDefault(e)}>
                              <a href={customer.links.article} rel="noopener noreferrer" target="_blank" onClick={(e) => preventDefault(e)}>Article</a>
                            </Tooltip>
                          </Box>
                          <Box
                            color="textPrimary"
                          >
                            <Tooltip title="Open link in new tab" onMouseEnter={(e) => preventDefault(e)}>
                              <a href={customer.links.wikipedia} rel="noopener noreferrer" target="_blank" onClick={(e) => preventDefault(e)}>Wiki</a>
                            </Tooltip>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        {moment(customer.event_date_unix).format('DD-MMM-YYYY')}
                      </TableCell>
                      <TableCell>
                        {moment(customer.event_date_utc).format('DD-MMM-YYYY')}
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
