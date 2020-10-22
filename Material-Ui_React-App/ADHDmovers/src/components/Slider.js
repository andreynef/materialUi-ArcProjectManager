import React, {useState} from 'react';
import axios from "axios";
import {makeStyles, useTheme} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import airplane from '../assets/send.svg';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";


const useStyles = makeStyles(theme => ({
  message: {
    // border: `2px solid ${theme.palette.common.blue}`,
    marginTop: '5em',
    // borderRadius: '5',
  },
  orderCard: {
    boxShadow: theme.shadows[10],
    borderRadius: 15,
    // padding: '10em',
    width: '500px',
    [theme.breakpoints.down('sm')]: {
      // padding: '8em 0',
      // borderRadius: 0,
      // width: '100%',
    },
  },
  sendButton: {
    ...theme.typography.estimate,
    borderRadius: 50,
    height: 45,
    width: 245,
    fontSize: '1rem',
    backgroundColor: theme.palette.common.orange,
    '&:hover': {
      backgroundColor: theme.palette.secondary.light
    },
    [theme.breakpoints.down('sm')]: {
      height: 40,
      width: 225,
    },

  }
}))

export default function Contact(props) {
  const classes = useStyles();
  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.down('md'));//вызываем библиотеку для адаптива

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
    axios.get('https://us-central1-konstant-movers.cloudfunctions.net/sendMailFromKMovers', //запрос на URL
      {
        params: {//подробности дополняющие URL (query strings)
          name: name,
          email: email,
          phone: phone,
          message: message,
        }
      }
    )
      .then(res => {//выполнится когда поступит ответ
        setLoading(false);//выключаем индикатор загрузки
        setName('');//сброс полей
        setEmail('');//сброс полей
        setPhone('');//сброс полей
        setMessage('');//сброс полей
        setAlert({open: true, message: 'Message sent successfully!', backgroundColor: '#4bb543'})//показываем подтв окно
        console.log(res)
      })
      .catch(err => {//выдаст если вернулась ошибка
        setLoading(false);
        setAlert({open: true, message: 'Something went wrong, please try again!', backgroundColor: '#ff3232'})//показываем подтв окно c ошибкой
        console.log(err)
      })
  };

  const buttonContents = (
    <>
      Send Message
      <img src={airplane} alt={'paper plane'} style={{marginLeft: '1em'}}/>
    </>
  )

  return (
    <Grid container style={{padding: '40px 0', backgroundColor: '#fafafa'}} alignItems={'center'} justify={'center'}>
      <Card className={classes.orderCard}>
        <CardContent>
        <Grid container justify={'center'} style={{padding: '2em 0'}}>
      <Grid item container direction={'column'} alignItems={'center'}>
        <Typography variant={'h1'} style={{lineHeight: 1, color:'#696969'}} align={matchesMD ? 'center' : undefined}>
          Contact Us
        </Typography>
        <Grid item container direction={'column'} style={{marginTop: '2em', marginBottom: '2em', width: '20em'}}>
          <Grid item container justify={'center'}>
            {/*<Grid item>*/}
            {/*  <img src={phoneIcon} alt={'phone'} style={{marginRight: '0.5em', verticalAlign: 'bottom'}}/>*/}
            {/*</Grid>*/}
            <Grid item>
              <Typography variant={'body1'} style={{color: theme.palette.common.blue, fontSize: '1rem'}}>
                <a href={'tel: +19999999999'} style={{textDecoration: 'none', color: '#696969'}}>+1(999)999-9999</a>
              </Typography>
            </Grid>
          </Grid>
          <Grid item container justify={'center'}>
            {/*<Grid item>*/}
            {/*  <img src={emailIcon} alt={'envelope'} style={{marginRight: '0.5em', verticalAlign: 'bottom'}}/>*/}
            {/*</Grid>*/}
            <Grid item>
              <Typography variant={'body1'} style={{color: theme.palette.common.blue, fontSize: '1rem'}}>
                <a href={'mailto: konstant.movers.sf@gmail.com'}
                   style={{textDecoration: 'none', color: '#696969'}}> konstant.movers.sf@gmail.com</a>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item container direction={'column'} style={{width: '20em'}}>
          <Grid item style={{marginBottom: '0.5em'}}>
            <TextField
              label={'Name'}
              id={'name'}
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item style={{marginBottom: '0.5em'}}>
            <TextField
              label={'Email'}
              helperText={emailHelper}
              id={'email'}
              value={email}
              onChange={onChange}
              fullWidth
            />
          </Grid>
          <Grid item style={{marginBottom: '0.5em'}}>
            <TextField
              label={'Phone'}
              helperText={phoneHelper}
              id={'phone'}
              value={phone}
              onChange={onChange}
              fullWidth
            />
          </Grid>
        </Grid>
        <Grid item style={{width: '20em'}}>
          <TextField
            id={'message'}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            multiline
            rows={10}
            className={classes.message}
            variant="outlined"
            // inputProps={{disableUnderline:true}}//убрать палку через спец инпутовский метод
            fullWidth
            placeholder={'Please, type a message'}

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
            {loading ? <CircularProgress size={30}/> : buttonContents}{/*показывать кнопку или индикатор загрузки во время работы axios*/}
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
  )
}