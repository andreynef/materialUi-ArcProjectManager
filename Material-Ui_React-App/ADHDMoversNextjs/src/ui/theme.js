import { createMuiTheme } from '@material-ui/core/styles';

//some my custom variables

const brown = '#A19284';
const lightBrown = '#F0EBE6';

const theme = createMuiTheme({
//  my options here. Default theme can be seen there : -> https://material-ui.com/customization/default-theme/#default-theme
  palette: {
    common: {
      brown: brown,
      lightBrown: lightBrown,
    },
    primary :{// хз но генерируются black and light versions тобишь есть primary.dark and primary.light
      main: brown,
    },
    secondary: {// хз но генерируются black and light versions тобишь есть secondary.dark and secondary.light
      main: brown,
    }
  },
  typography: {
    tab: {
      fontFamily: "Raleway",//установили в html файле link итд
      textTransform:'none', //отключить toUpperCase
      fontWeight: 700,
      fontSize: '1rem',//если в пикселях то при разном экране размер шрифтов по недосмотру может не сменяться, а так рем связан с глобальным размером что установлено на 14пх.
    },
    estimate: {
      fontFamily: 'Raleway',
      textTransform: 'none',
      color: 'white',
      fontSize: '1.4rem',
      fontWeight: 500,
    },
    h1: {
      fontFamily: 'Raleway',
      fontWeight: 700,
      fontSize: '2.5rem',
      // color: lightBrown,
      lineHeigh: 1.5
    },
    // h2: {
    //   fontFamily: 'Raleway',
    //   fontWeight: 700,
    //   fontSize: '2.5rem',
    //   color: brown,
    //   lineHeigh: 1.5
    // },
    h3: {
      fontFamily: 'Pacifico',
      fontSize: '2.5rem',
      color: lightBrown,
    },
    h4: {
      fontFamily: 'Raleway',
      fontWeight: 700,
      fontSize: '1.75rem',
      color: lightBrown,
    },
    h6: {
      fontFamily: 'Raleway',
      fontWeight: 500,
      color: brown,
      lineHeight: 1
    },
    subtitle1: {
      fontWeight: 300,
      fontSize: '1.25rem',
      color: brown,
    },
    subtitle2: {
      fontWeight: 300,
      fontSize: '1.25rem',
      color: 'white',
    },
    body1: {
      fontWeight: 300,
      fontSize: '1.25rem',
      // color: arcGrey,
    },
    learnButton: {
      borderColor: brown,
      color: brown,
      borderWidth: 2,
      textTransform: 'none',
      borderRadius: 50,
      fontFamily: 'Roboto',
      fontWeight:'bold',
    }
  },
  overrides: {
    MuiInputLabel: {//спец css для инпутов
      root: {//изменяем дефолт
        color: brown,
        fontSize: '1rem'
      }
    },
    MuiDialog: {//
      paper: {//
        margin: 0,
        // fontSize: '2rem'
        // width:'100%',
      }
    },
    MuiInputBase:{
      // backgroundColor:lightBrown,
    },
    MuiDialogContent: {
      root:{
        padding:0,
      }
    },
    MuiInput: {//спец css для инпутов
      root: {//цвет текста
        color: brown,
        fontWeight: 300,
      },
      underline: {
        '&:before': {
          borderBottom: `2px solid ${brown}`//поменять цвет палки
        },
        '&:hover:not($disabled):not($focused):not($error):before': {//поменять цвет палки при ховере но оставить для других состояний
          borderBottom: `2px solid ${brown}`
        }
      }
    }
  }
});

export default theme;

