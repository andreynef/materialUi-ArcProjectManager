import React, {useState} from 'react';
import {makeStyles, useTheme} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {Paper} from "@material-ui/core";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import TextField from "@material-ui/core/TextField";
import Head from "next/head";

const useStyles = makeStyles(theme => ({

  shopMainContainer: {
    backgroundColor: theme.palette.common.lightBrown,
    padding:'2em',
    [theme.breakpoints.down('sm')]: {
      padding: '2em 0',
    },

  },
  shopPaperContainer:{
    width:'300px',
    padding: '10px',
    margin: '20px 20px 0 0',
    // backgroundColor: theme.palette.common.brown,
    [theme.breakpoints.down('xs')]: {
      width: 'unset',
      margin: '20px 0 0 0'
    },

  },
  button: {
    padding:0,
    width:'100%',
  },
  img :{
    width:'100%',
    borderRadius:'5px',
  },
  ShopViewDescriptionContainer: {
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
  // quickViewText: {
  //   fontSize: '2rem',
  // },
  shopDescriptionContainer:{
    padding: '20px',
    backgroundColor: 'transparent',
  },
  shopDescriptionText:{
    fontSize: '16px',
    color: theme.palette.common.brown,
  },
  bestSellerContainer: {
    position: 'absolute',
    top:0,
    left:0,
    padding:'5px',
    margin: 0,
    // width: '25%',
    color:'white',
    fontSize: '0.7rem',
    backgroundColor: theme.palette.common.brown,
    // opacity: 0.8,
  },

  dialogMainContainer: {
    backgroundColor: theme.palette.common.lightBrown,
    padding:'2em',
  },

  dialogDescriptionContainer:{
    padding: '20px 0',
    width: '70%',
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.9rem',
      padding: '0',
    },
  },
  dialogDescriptionTitle:{
    fontSize: '1rem',
    marginTop: '30px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.9rem',
    },
  },
  dialogDescriptionText:{
    fontSize: '0.8rem',
    marginTop: '5px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.7rem',
    },
  },
  dialogAddContainer:{
    padding: '20px',
    width: '30%',
    [theme.breakpoints.down('sm')]: {
      // width: '40%',
      padding:0,
    },
  },
  addButton: {
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.7rem',
      padding: '5px 10px',
    },
  },
  quantityInput:{
    width: '100px',
    backgroundColor: 'white',
    marginTop: '30px',
    // fontSize: '1rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.1rem',
      padding: 0,
    },
  },


}))

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Shop(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [quantity, setQuantity] = useState('');
  const [openedItem, setOpenedItem]=useState({});

  const onChange = e => {
    setQuantity(e.target.value);
  };

  function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  const handleClickAdd = () => {//нажатие на кнопку 'add'
    const price = parseInt(openedItem.price.slice(2,-3));
    const total= price*quantity;
    const newCartItemsArr = [...props.cartItems, {...openedItem, quantity:quantity, total:total}];
    props.setCartItems(newCartItemsArr);
    setOpen(false);
    setQuantity('');

  };

  const handleClickOpen = (item) => {
    setOpenedItem(item);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const Item = (props) =>{

    return (
      <Paper className={classes.shopPaperContainer}>
        <Button
          className={classes.button}
          onClick={()=>handleClickOpen(props.itemObj)}
        >
          <img src={props.itemObj.imgUrl} className={classes.img}/>
          <Grid container justify={'center'} alignContent={'flex-end'} className={classes.ShopViewDescriptionContainer}>
            <Grid item>
              <p>
                view description
              </p>
            </Grid>
          </Grid>
          {props.itemObj.name==='PURPLE T-SHIRT' &&(
            <p className={classes.bestSellerContainer}>
              best seller
            </p>
          )}
        </Button>
        <Grid container direction={'column'} className={classes.shopDescriptionContainer}>
          <Typography className={classes.shopDescriptionText}>
            {props.itemObj.name}
          </Typography>
          <Typography style={{marginTop: '10px'}} className={classes.shopDescriptionText}>
            {props.itemObj.price}
          </Typography>
        </Grid>
      </Paper>
    )
  }


  return (
    <Grid container className={classes.shopMainContainer} justify={'center'}>
      <Head>
        <title key={'title'}>
          Shop | ADHD Movers
        </title>
        <meta
          name={'description'}
          key={'description'}
          content={'Grab some gear!'}
        />
        <meta property={'og:title'} content={'Grab some gear| Shop'} key={'og:title'}/>
        <meta property={'og:url'} content={'adhdmovers.com/shop'} key={'og:url'}/>
        <link rel={'canonical'} key={'canonical'} href={'adhdmovers.com/shop'}/>
      </Head>

      {props.items.map( (itemObj, i) => <Item key={i} itemObj={itemObj} setSelectedItem={props.setSelectedItem}/> )}

      {/*dialog block*/}

      <Dialog//не важно где
        open={open}
        TransitionComponent={Transition}
        // keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        maxWidth={"md"}
        scroll={"body"}
        // style={{margin:0}}
      >
        <DialogTitle id="alert-dialog-slide-title">{openedItem.name}</DialogTitle>
        <DialogContent >
          <Grid container className={classes.dialogMainContainer} justify={'center'}>
            <img src={openedItem.imgUrl} className={classes.img}/>
            <Grid item container >
              <Grid container item direction={'column'} className={classes.dialogDescriptionContainer}>
                <Grid item>
                  <Typography className={classes.dialogDescriptionTitle}>
                    PRODUCT INFO
                  </Typography>
                  <Typography className={classes.dialogDescriptionText}>
                    {openedItem.info}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography className={classes.dialogDescriptionTitle}>
                    REFUND POLICY
                  </Typography>
                  <Typography className={classes.dialogDescriptionText}>
                    No refund
                  </Typography>
                </Grid>
              </Grid>
              <Grid item container direction={'column'} className={classes.dialogAddContainer}>
                <Typography className={classes.dialogDescriptionTitle}>
                  {openedItem.price}
                </Typography>
                <TextField
                  variant="outlined"
                  className={classes.quantityInput}
                  label={'Quantity'}
                  id={'quantity'}
                  value={quantity}
                  onChange={onChange}
                  size="small"
                />
                <Grid item container style={{marginTop: '2em'}}>
                  <Button
                    color={'primary'}
                    variant={'contained'}
                    className={classes.addButton}
                    onClick={handleClickAdd}
                    disabled={!isNumber(quantity)}
                  >
                    Add to Cart
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            exit
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  )
}