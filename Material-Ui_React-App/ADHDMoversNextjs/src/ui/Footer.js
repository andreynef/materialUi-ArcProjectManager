import React from 'react';
import {makeStyles} from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {useTheme} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";


const useStyles = makeStyles(theme => ({
  footer: {
    backgroundColor: theme.palette.common.brown,
    padding: '20px 0'
  },

}));

export default function Footer(props) {
  const classes = useStyles();
  const theme = useTheme();
  const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));


  return (
    <footer className={classes.footer}>
      <Grid container justify={'center'} >
        <Grid item>
          <Typography variant={'body1'} align={'center'} style={{color: theme.palette.common.blue, fontSize: '1rem'}}>
            <a href={'tel: +14154497888'} style={{textDecoration: 'none', color: 'white'}}>+1(415)449-7888</a>
          </Typography>
          <Typography variant={'body1'} align={'center'} style={{fontSize: '1rem'}}>
            <a href={'mailto: adhdmovers@gmail.com'}
               style={{textDecoration: 'none', color: 'white'}}> adhdmovers@gmail.com</a>
          </Typography>
          <Typography style={{color: 'white', fontSize: matchesXS?'0.7rem':'0.8rem'}}>
            ADHD MOVERS "We Can't Stop Moving" . LLC
          </Typography>
          <Typography variant={'body1'} align={'center'} style={{color: 'white', fontSize: matchesXS?'0.7rem':'0.8rem'}}>
            YELP BAY AREA
          </Typography>
        </Grid>
      </Grid>
    </footer>
  )
}