import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../src/ui/theme';
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/styles";
import Footer from "../src/ui/Footer";
import Header from "../src/ui/Header";

const useStyles = makeStyles(theme =>({
  appContainer: {
    backgroundColor: `#fafafa`,
    maxWidth:1240,
    margin:'0 auto',
    boxShadow: '0 0 10px rgba(0,0,0,0.5)'
  },
}));

export default function MyApp(props) {
  const { Component, pageProps } = props;
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = useState(0);///установка стейта для активного подменю. Вынесли вверх для доступа оного к футеру.
  const [value, setValue] = useState(0);//установка состояния value. Вынесли вверх для доступа оного к футеру.
  const [cartItems, setCartItems] = useState([]);

  const items = [
    {
      name: "ADHD GREY T-SHIRT",
      price: "$ 22.00",
      imgUrl:'assets/greyTshirt.jpg',
      link: '/shop/adhd-grey-t-shirt',
      info:'Champion Brand Gear.  Comes in Sizes Small-XXL',
    },
    {
      name: "ADHD MOVERS BLACK HOODIE",
      price: "$ 44.00",
      imgUrl:'assets/blackHoodie.jpg',
      link: '/shop/adhd-movers-black-hoodie',
      info:'Champion Brand Gear.  Comes in Sizes Small-XXL',
    },
    {
      name: "PINK ADHD MOVERS SWEATER",
      price: "$ 33.00",
      imgUrl:'assets/pinkSweater.jpg',
      link: '/shop/pink-adhd-movers-sweater',
      info:'Champion Brand Gear.  Comes in Sizes Small-XXL',
    },
    {
      name: "ADHD TIE DYE",
      price: "$ 33.00",
      imgUrl:'assets/tieDie.jpg',
      link: '/shop/adhd-tie-dye',
      info:'Champion Brand Gear.  Comes in Sizes Small-XXL',
    },
    {
      name: "PURPLE T-SHIRT",
      price: "$ 22.00",
      imgUrl:'assets/purpleTshirt.jpg',
      link: '/shop/purple-t-shirt',
      info:'Champion Brand Gear.  Comes in Sizes Small-XXL',
    },
  ];

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <Head>{/*добавить head к кажд page для seo*/}
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        {/*<CssBaseline />//удалили тк не используем. Но можно использовать когда создается новый проект с нуля и юзать стили кот предоставляет CssBaseline (см док material ui )*/}
        <Grid container direction={'column'} className={classes.appContainer}>
          <Grid item>
            <Header
              value={value}
              setValue={setValue}
              selectedIndex={selectedIndex}
              setSelectedIndex={setSelectedIndex}
              cartItems={cartItems}
              items={items}
            />
            <Component
              {...pageProps}
              items={items}
              cartItems={cartItems}
              setCartItems={setCartItems}
            />
            <Footer
              setValue={setValue}
              setSelectedIndex={setSelectedIndex}
            />
          </Grid>
        </Grid>
      </ThemeProvider>
    </>  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
