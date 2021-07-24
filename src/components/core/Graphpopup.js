import { React, useEffect, useState } from 'react';
import { withStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from 'recharts';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const {
    children,
    classes,
    onClose,
    ...other
  } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function CustomizedDialogs(props) {
  const { graphopen, setOpenPopup } = props;
  const [data, setData] = useState();
  useEffect(() => {
    const apiUrl = 'https://api.spacexdata.com/v3/landpads';
    axios.get(apiUrl).then((repos) => {
      const allRepos = repos;
      const resultdata = [];
      console.log('allRepos', allRepos.data);
      for (let i = 0; i < allRepos.data.length; i++) {
        resultdata.push({
          id: allRepos.data[i].id,
          name: allRepos.data[i].full_name,
          attempted_landings: allRepos.data[i].attempted_landings,
          successful_landings: allRepos.data[i].successful_landings,
          amt: 30
        });
      }
      console.log('resultdata', resultdata);
      setData(resultdata);
    });
  }, []);
  return (
    <div>
      <Dialog maxWidth="lg" aria-labelledby="customized-dialog-title" open={graphopen}>
        <DialogTitle id="customized-dialog-title">
          LAUNCH SITES
        </DialogTitle>
        <DialogContent dividers>
          <BarChart
            width={800}
            height={400}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="id" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="attempted_landings" fill="#8884d8" />
            <Bar dataKey="successful_landings" fill="#82ca9d" />
          </BarChart>
        </DialogContent>
        <DialogActions>
          <Button autoFocus color="primary" onClick={() => { setOpenPopup(false); }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
