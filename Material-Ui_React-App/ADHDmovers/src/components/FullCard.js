import React, {useState} from 'react';
import {makeStyles, useTheme} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";
// import airplane from '../assets/send.svg';
import purpleTshirt from '../assets/purpleTshirt.jpg';
import pinkSweater from '../assets/pinkSweater.jpg';
import blackHoodie from '../assets/blackHoodie.jpg';
import greyThirt from '../assets/greyTshirt.jpg';
import tieDie from '../assets/tieDie.jpg';
import Button from "@material-ui/core/Button";
import Carousel from "react-material-ui-carousel";
import {Paper} from "@material-ui/core";
import ava from "../assets/ava.webp";
import Link from "@material-ui/core/Link";
import Popover from "@material-ui/core/Popover";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";


const useStyles = makeStyles(theme => ({

  template: {
    ...theme.typography.estimate,
    fontSize: '1rem',
    backgroundColor: theme.palette.common.orange,
    '&:hover': {
      backgroundColor: theme.palette.secondary.light
    },
    [theme.breakpoints.down('sm')]: {
      height: 40,
    },
  },
  mainContainer: {
    backgroundColor: theme.palette.common.lightBrown,
    padding:'2em',
  },

  img :{
    width:'100%',
  },

  // quickViewText: {
  //   fontSize: '2rem',
  // },
  descriptionContainer:{
    padding: '20px',
    backgroundColor: 'transparent',
  },
  descriptionText:{
    fontSize: '16px',

  },



}))

export default function FyllCard(props) {
  const classes = useStyles();
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));//вызываем библиотеку для адаптива

 const item =
    {
      name: "ADHD GREY T-SHIRT",
      price: "$22.00",
      imgUrl:greyThirt,
    };
  const [quantity, setQuantity] = useState('');

  const onChange = e => {
    setQuantity(e.target.value);
  };

  const onAdd = () => {//нажатие на кнопку 'add'
    setQuantity('');//сброс полей
  };

  return (
    <Grid container className={classes.mainContainer} justify={'center'}>
        <img src={props.item.imgUrl} className={classes.img}/>

      <Grid item container direction={'column'} className={classes.descriptionContainer}>
        <Typography className={classes.descriptionText}>
          {props.item.name}
        </Typography>
        <Typography style={{marginTop: '10px'}} className={classes.descriptionText}>
          {props.item.price}
        </Typography>
      </Grid>
      <Grid item container direction={'column'} className={classes.addContainer}>
        <Typography style={{marginTop: '10px'}} className={classes.descriptionText}>
          {props.item.price}
        </Typography>
        <TextField
          label={'Quantity'}
          id={'quantity'}
          value={quantity}
          onChange={onChange}
          fullWidth
        />
        <Grid item container justify={'center'} style={{marginTop: '2em'}}>
          <Button
            variant={'contained'}
            className={classes.addButton}
            onClick={onAdd}//для диалога
          >
            <span>Add</span>
          </Button>
        </Grid>

      </Grid>

    </Grid>


  )
}