import React, {useState} from 'react';
import {makeStyles, useTheme} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import axios from "axios";


const useStyles = makeStyles(theme => ({

  mainContainer: {
    backgroundColor: theme.palette.common.lightBrown,
    borderTop: `1px solid ${theme.palette.common.brown}`,
    padding: '2em',
    [theme.breakpoints.down('sm')]: {
      padding: '2em 0',
    },
  },
  itemContainer: {
    width:'100%',
    marginBottom: '2em',
  },
  itemContentContainer:{
  },
  imgDesContainer: {
    width: 'unset',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  imgContainer:{
    width:'150px',
    [theme.breakpoints.down('xs')]: {
      width:'30%',
    },
  },
  img :{
    borderRadius:'5px',
    width:'100%',
  },
  descriptionContainer:{
    width:'250px',
    paddingLeft:'2em',
    [theme.breakpoints.down('sm')]: {
      paddingLeft:'1em',
      width:'200px',
    },
    [theme.breakpoints.down('xs')]: {
      width:'70%',
    },
  },
  totalContainer:{
    width:'100px',
    [theme.breakpoints.down('xs')]: {
      width:'100%',
    },
  },
  descriptionTitle:{
    color: theme.palette.common.brown,
    fontWeight:700,
    fontSize: '0.9rem',
  },
  descriptionText:{
    color: theme.palette.common.brown,
    marginTop:'10px',
    fontSize: '0.9rem',
    [theme.breakpoints.down('xs')]: {
      fontSize:'0.8rem',
      marginTop:'0',
      width:'100%',
    },
  },
  cardContainer: {
    boxShadow: theme.shadows[10],
    borderRadius: 15,
    margin:'2em 0',
    width: '500px',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  sendButton: {
    ...theme.typography.estimate,
    borderRadius: 50,
    height: 45,
    width: 245,
    fontSize: '1rem',
    backgroundColor: theme.palette.common.brown,
    '&:hover': {
      backgroundColor: theme.palette.secondary.light
    },
    [theme.breakpoints.down('sm')]: {
      height: 40,
      width: 225,
    },
  },
  bookContainer: {
    width:'50%',
    padding: '0 20px',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  calculatedConfirmText:  {
    color: theme.palette.common.brown,
    margin: '10px 0',
    fontSize: '1rem',
  },
  titleCard: {
    lineHeight: 1,
    color:theme.palette.common.brown,
    padding: '0 40px 40px 40px',
    [theme.breakpoints.down('xs')]: {
      padding: '0 0 40px 0',
    },
  }
}))

export default function Cart(props) {
  const classes = useStyles();
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));//вызываем библиотеку для адаптива
  const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));//вызываем библиотеку для адаптива

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [emailHelper, setEmailHelper] = useState('');//ручная установка подсказки а не дефолт инпутовская
  const [phone, setPhone] = useState('');
  const [phoneHelper, setPhoneHelper] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({open: false, message: '', backgroundColor: ''})


  const onChange = e => {
    let valid;
    switch (e.target.id) {
      case 'email':
        setEmail(e.target.value);
        valid = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(e.target.value)//тру фолс тест рег вырвжения
        if (!valid) {
          setEmailHelper('invalid email')
        } else {
          setEmailHelper('')
        }
        break;
      case 'phone':
        setPhone(e.target.value);
        valid = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(e.target.value)//тру фолс тест рег вырвжения
        if (!valid) {
          setPhoneHelper('invalid phone')
        } else {
          setPhoneHelper('')
        }
        break;
      default:
        break;
    }
  };
  const onConfirm = () => {//нажатие на кнопку 'отправить'
    setLoading(true);//включаем индикатор загрузки
    const itemsArr = props.cartItems.map( (item) => `${item.name}, amount ${item.quantity} ($ ${item.total}). `);
    const itemsStr = itemsArr.join("<br/>");
    axios.get('https://us-central1-adhdmoversapp.cloudfunctions.net/sendMailFromADHDMovers', //запрос на URL
      {
        params: {//подробности дополняющие URL (query strings)
          name: name,
          email: email,
          phone: phone,
          message: message,
          items:itemsStr,
        }
      }
    )
      .then(res => {//выполнится когда поступит ответ
        setLoading(false);//выключаем индикатор загрузки
        setName('');//сброс полей
        setEmail('');
        setPhone('');
        setMessage('');
        setAlert({open: true, message: 'Request sent successfully!', backgroundColor: '#4bb543'})//показываем подтв окно
        setTimeout(()=>props.setCartItems([]),5000);
        console.log(res)
      })
      .catch(err => {//выдаст если вернулась ошибка
        setLoading(false);
        setAlert({open: true, message: 'Something went wrong, please try again!', backgroundColor: '#ff3232'})//показываем подтв окно c ошибкой
        console.log(err)
      })
  };

  const handleDelete=(name)=>{
    const newItemsArr=props.cartItems.filter(item=>item.name!==name);
    props.setCartItems(newItemsArr);
  };

  const Item = (props) =>{

    return (
      <Card className={classes.itemContainer}>
        <CardContent style={{padding:'1em'}}>
          <Grid container className={classes.itemContentContainer} justify={'space-between'} >
            <Grid item container className={classes.imgDesContainer} direction={'row'}>
              <Grid item className={classes.imgContainer}>
                <img src={props.item.imgUrl} className={classes.img}/>
              </Grid>
              <Grid item container direction={'column'} className={classes.descriptionContainer}>
                <Typography className={classes.descriptionTitle}>
                  {props.item.name}
                </Typography>
                <Typography className={classes.descriptionText}>
                  {props.item.price}
                </Typography>
                <Typography className={classes.descriptionText}>
                  Quantity : {props.item.quantity}
                </Typography>
              </Grid>
            </Grid>
            <Grid item container direction={matchesXS?'row':'column'} className={classes.totalContainer} justify={'space-between'} alignItems={'center'}>
              <Typography className={classes.descriptionTitle} align={'right'}>
                Total: <span style={{fontWeight:300}}>$ {props.item.total}</span>
              </Typography>
              <Button color={'primary'} variant={'outlined'} onClick={()=>props.handleDelete(props.item.name)} style={{padding:matchesXS?'5 0':undefined, fontSize: '0.8rem'}}>
                delete
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    )
  }


  return (
    <Grid container direction={matchesSM?'column':null} justify={'center'} className={classes.mainContainer}>
      {props.cartItems.length===0 ? <Typography color={'primary'} style={{padding: '2em 0'}}>your cart is empty</Typography>:
        <>
          {/*list block*/}
          {props.cartItems.map( (item, i) => <Item key={i} item={item} handleDelete={handleDelete}/> )}

          {/*send request block*/}
          <Grid container justify={'center'}>
            <Card className={classes.cardContainer}>
              <CardContent>
                <Grid container justify={'center'} style={{padding: '2em'}}>
                  <Grid item container direction={'column'} alignItems={'center'}>
                    <Typography variant={'h4'} className={classes.titleCard} align={'center'}>
                      Grab a gear
                    </Typography>
                    <Grid item container direction={'column'} style={{padding:0}}>
                      <Grid item style={{marginBottom: '0.5em'}}>
                        <TextField
                          label={'Name*'}
                          id={'name'}
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          fullWidth
                        />
                      </Grid>
                      <Grid item style={{marginBottom: '0.5em'}}>
                        <TextField
                          label={'Email*'}
                          helperText={emailHelper}
                          id={'email'}
                          value={email}
                          onChange={onChange}
                          fullWidth
                        />
                      </Grid>
                      <Grid item style={{marginBottom: '0.5em'}}>
                        <TextField
                          label={'Phone*'}
                          helperText={phoneHelper}
                          id={'phone'}
                          value={phone}
                          onChange={onChange}
                          fullWidth
                        />
                      </Grid>
                      <Grid item style={{marginBottom: '0.5em'}}>
                        {props.cartItems.map( (item, i) =>
                          <Typography key={i} variant={'subtitle1'} className={classes.calculatedConfirmText}>
                            <span>{item.name} : </span>
                            <span>{item.quantity} </span>
                            <span>($ {item.total})</span>
                          </Typography>
                        )}
                      </Grid>
                    </Grid>
                    <Grid item style={{width:'100%', padding:0}}>
                      <TextField
                        id={'message'}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        multiline
                        rows={5}
                        // className={classes.message}
                        style={{padding:0}}
                        variant="outlined"
                        // inputProps={{disableUnderline:true}}//убрать палку через спец инпутовский метод
                        fullWidth
                        placeholder={'Message (sizes, delivery etc.)'}

                      />
                    </Grid>
                    <Grid item container justify={'center'} style={{marginTop: '2em'}}>
                      <Button
                        variant={'contained'}
                        className={classes.sendButton}
                        disabled={//кнопка не рабочая если true эти условия
                          phone.length === 0 ||
                          email.length === 0 ||
                          name.length === 0 ||
                          message.length === 0 ||
                          phoneHelper.length !== 0 ||
                          emailHelper.length !== 0
                        }
                        onClick={onConfirm}//для диалога
                      >
                        {loading ? <CircularProgress size={30} color={"secondary"}/> : <span>Send</span>}
                      </Button>
                    </Grid>
                    <Snackbar//всплывающее окно подтверждения
                      open={alert.open}
                      message={alert.message}
                      ContentProps={{style: {backgroundColor: alert.backgroundColor}}}
                      anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                      onClose={() => setAlert({...alert, open: false})}
                      autoHideDuration={4000}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </>
      }

    </Grid>


  )
}