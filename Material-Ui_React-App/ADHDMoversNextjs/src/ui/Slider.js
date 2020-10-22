import React from 'react';
import {makeStyles, useTheme} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Button from "@material-ui/core/Button";
import Carousel from "react-material-ui-carousel";
import {Paper} from "@material-ui/core";
import Link from "./Link";


const useStyles = makeStyles(theme => ({

  mainContainer: {
    backgroundColor: theme.palette.common.brown,
  },
  paperContainer:{
    backgroundColor: 'transparent',
  },
  button: {
    padding:0,
    width:'100%',
  },
  img :{
    width:'100%',
    borderRadius:'20px',
  },
  quickViewContainer: {
    position: 'absolute',
    top:0,
    left:0,
    width:'100%',
    height:'100%',
    color: 'white',
    backgroundColor: `black`,
    opacity: 0,
    '&:hover': {
      opacity: 0.5,
      transition: 'all 0.5s ease 0s'
    },
  },

  descriptionContainer:{
    padding: '20px',
    backgroundColor:theme.palette.common.brown,
    color: 'white',
  },
  carouselContainer: {
    width:'50%',
    padding:'20px',
    // border: '1px solid red',
    [theme.breakpoints.down('sm')]: {
      width:'100%',
    },

  },
  exampleContainer: {
    width:'50%',
    padding:'40px',
    [theme.breakpoints.down('sm')]: {
      width:'100%',
      marginBottom: '30px'
    },

  },
  avaImg: {
    borderRadius: '50%',
    width:'50%',
  }
}))

export default function Slider(props) {
  const classes = useStyles();
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));//вызываем библиотеку для адаптива

  const Item = (props) =>{

    return (
      <Paper className={classes.paperContainer}>
        <Button
          className={classes.button}
          component={Link}
          href={'/shop'}
        >
          <img src={props.item.imgUrl} className={classes.img}/>
          <Grid container justify={'center'} alignContent={'flex-end'} className={classes.quickViewContainer}>
            <Grid item>
              <p>
                to shop
              </p>
            </Grid>
          </Grid>
        </Button>
        <Grid container direction={'column'} className={classes.descriptionContainer}>
          <Typography>
            {props.item.name}
          </Typography>
          <Typography style={{marginTop: '10px'}}>
            {props.item.price}
          </Typography>
        </Grid>
      </Paper>
    )
  }


  return (
    <Grid container direction={matchesSM?'column':null} className={classes.mainContainer}>
      <Grid item container className={classes.exampleContainer} >
        <Grid item container direction={'column'} alignItems={'center'} >
          <Typography variant={'h4'} style={{color: 'white'}}>
            ADHD GEAR
          </Typography>
          <Typography variant={'h5'} style={{color: 'white', marginTop: '10px', marginBottom: '5%'}}>
            OWN YOUR ADHD
          </Typography>
          <img src={"/assets/ava.webp"} className={classes.avaImg} />
        </Grid>
      </Grid>
      <Grid item className={classes.carouselContainer}>
        <Carousel
          next={ () => {/* Do stuff */} }
          prev={ () => {/* Do other stuff */} }
          autoPlay={true}
          interval={5000}
          indicators={false}
          // animation={'slide'}
          navButtonsAlwaysVisible={true}
        >
          {props.items.map( (item, i) => <Item key={i} item={item} id={item.name}/> )}
        </Carousel>
      </Grid>
    </Grid>


  )
}