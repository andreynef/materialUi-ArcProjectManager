import React from 'react';
import {makeStyles, useTheme} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
// import dog from "../assets/dog.jpg";
// import infinity from "../assets/infinityWhite.svg";
// import businessCardCut from "../assets/businessCardCut.jpg";
import Link from "../src/ui/Link";
import Slider from "../src/ui/Slider";
import Book from "../src/ui/Book";
import Head from "next/head";


const useStyles = makeStyles(theme => ({
  firstContainer: {
    backgroundColor: theme.palette.common.brown,
  },
  firstTextContainer: {
    width: '60%',
    padding: '10% 0 0 0',
    color:'white',
    // textShadow: '2px 2px 1px black',
  },
  firstText: {
    fontSize: '3.8rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: '2.8rem'
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '1.7rem'
    },
  },
  secondText: {
    fontSize: '2.8rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.6rem'
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '1rem'
    },
  },
  firstDogContainer: {
    width: '40%',
  },
  dogImg: {
    width:'100%',
    height:'100%',
  },
  infinityImg: {
    width:'4em',
    color: 'white',
    [theme.breakpoints.down('sm')]: {
      width: '3em'
    },
    [theme.breakpoints.down('xs')]: {
      width: '2em'
    },
  },
  firstButton: {
    ...theme.typography.estimate,
    fontSize: '1.1rem',
    '&:hover': {
      backgroundColor: theme.palette.common.brown
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.8rem'
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '0.5rem'
    },

  },

  vehicleContainer: {
    backgroundImage: `url('/assets/dogCut.jpg')`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    height: 300,
  },

  extraBlockContainer: {
    overflow: 'hidden'
  },

  vehicle: {
    width: '400px',
    justifyContent:'center',
    margin:'0 0 0 4em',
    [theme.breakpoints.down('sm')]: {
      margin:'2em 0 0 0',
      width: '300px'
    },

  },
  vehicleImg: {
    width: '100%',
  },

  mainContainer: {
    backgroundColor: theme.palette.common.lightBrown,
  },



}));

export default function LandingPage(props) {
  const classes = useStyles();

  return (
    <Grid container direction={'column'} className={classes.mainContainer}>
      <Head>
        <title key={'title'}>
          Home | ADHD Movers
        </title>
        <meta
          name={'description'}
          key={'description'}
          content={"ADHD Movers. We can't stop moving"}
        />
        <meta property={'og:title'} content={"ADHD Movers. We can't stop moving | ADHD Movers"} key={'og:title'}/>{/*добавляем open graph превью для SEO. Подробности в www.ogp.me */}
        <meta property={'og:url'} content={'adhdmovers.com'} key={'og:url'}/>{/*добавляем ссылку на страницу сайта */}
        <link rel={'canonical'} key={'canonical'} href={'adhdmovers.com'}/>{/*дефолтный главный адрес страницы. Зависит от настроек DNS*/}
      </Head>
      {/*--------first Block--------*/}
      <Grid item container className={classes.firstContainer}>
        <Grid item container direction={"column"} alignItems={'center'} className={classes.firstTextContainer}>
          <Typography
            className={classes.firstText}
            variant={'h1'}
          >
            ADHD MOVERS
          </Typography>
          <Typography
            className={classes.secondText}
            variant={'h2'}
          >
            "WE CAN'T STOP MOVING"
          </Typography>
          <img src={"/assets/infinity.svg"} alt={'infinity pic'} className={classes.infinityImg}/>
          <Grid item style={{marginTop: '2em'}}>

            <Typography
              variant={'button'}
              className={classes.firstButton}
            >
              BOOK A MOVE
            </Typography>
            <Typography
              variant={'inherit'}
              className={classes.firstButton}
              style={{padding:'0 7px'}}
            >
              OR
            </Typography>
            <Typography
              variant={'button'}
              component={Link}
              href={'/shop'}
              className={classes.firstButton}
            >
              GRAB SOME GEAR!
            </Typography>
          </Grid>
        </Grid>
        <Grid className={classes.firstDogContainer}>
          <img src={'/assets/dog.jpg'} alt={'dog pic'} className={classes.dogImg}/>
        </Grid>
      </Grid>

      {/*--------Book Block--------*/}
      <Book/>
      {/*--------Tshirt Block--------*/}
      <Slider items={props.items}/>
      <img src={'/assets/businessCardCut.jpg'} alt={'roadPic'} style={{width:'100%', height:'100%'}}/>
    </Grid>
  )
}