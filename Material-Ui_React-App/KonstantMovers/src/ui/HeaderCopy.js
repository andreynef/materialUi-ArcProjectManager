import React, {useState, useEffect} from 'react';
import Toolbar from "@material-ui/core/Toolbar";
import {useScrollTrigger} from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import {makeStyles} from "@material-ui/styles";
import Button from "@material-ui/core/Button";
 import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Link from '../Link';
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import useTheme from "@material-ui/core/styles/useTheme";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Hidden from "@material-ui/core/Hidden";
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuList from '@material-ui/core/MenuList';
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Grid from "@material-ui/core/Grid";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

function ElevationScroll(props) {
  const { children } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,//
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const useStyles = makeStyles(theme =>({
  toolbarMargin: {//добавляем доп ключ к стилям
    ...theme.mixins.toolbar,//скопировано из default theme из библиотеки
    marginBottom:'3em',
    [theme.breakpoints.down('md')]: {
      marginBottom: '2em'
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: '1em'
    },

  },
  logo: {
    height: '8em',
    [theme.breakpoints.down('md')]: {//mediaquery для среднего размера экрана
      height: '7em'
    },
    [theme.breakpoints.down('xs')]: {
      height: '5.5em'
    },
  },
  logoContainer: {
    padding:0,//убрать у обетки кнопки отступы
    '&:hover': {//аналогия с sсss со вложенностью селектора. Убрать затемненность при наведении на лого.
      backgroundColor: 'transparent'
    }
  },
  tabContainer: {
    margin: '0 0 0 auto',
    // border: '1px solid red',
  },
  tab: {
    ...theme.typography.tab,//остальное засунул в глобал и здесь экстенжу
    minWidth: 10,
    margin: '0 0 0 25px'
  },
  button: {
    ...theme.typography.estimate,
    borderRadius: '30px',
    margin: '0 25px 0 50px',
    height: '45px',
    backgroundColor: theme.palette.common.orange,
    '&:hover': {
      backgroundColor: theme.palette.secondary.light,
    }
  },
  menu: {
    backgroundColor: theme.palette.common.blue,
    color: 'white',
    borderRadius: 0,
    zIndex:1302,
  },
  menuItem: {
    ...theme.typography.tab,//вставляем весь завод и...
    opacity: 0.7,//доп перезапись прозрачности
    '&:hover': {//доп перезапись прозрачности выделенного итема
      opacity: 1
    },
  },
  drawerIconContainer: {
    margin: '0 0 0 auto',
    '&:hover': {
      backgroundColor: 'transparent'//убрать кружок
    }
  },
  drawerIcon: {
    height: '50px',
    width: '50px',
  },
  drawer: {
    backgroundColor: theme.palette.common.blue
  },
  drawerItem: {
    ...theme.typography.tab,//делаем стили дровера схожими на табные
    color: 'white',
    opacity: 0.7,
  },
  drawerItemEstimate: {
    backgroundColor: theme.palette.common.orange,
  },
  drawerItemSelected: {
    '& .MuiListItemText-root': {//все текстовые элементы внутри drawerItemSelected
    opacity: 1,
    }
  },
  appBar: {
    zIndex: theme.zIndex.modal+1,//шапка хеадера будет находиться чуть выше всплывающего меню, ибо меню нельзя сделать частью экрана а только на всю высоту, поэтому решаем только перекрытием и отступом.
    maxWidth: 1240,
  },
  expansion:{
    backgroundColor: theme.palette.common.blue,
    borderBottom: '1px solid rgba(0,0,0,0.12)',//скопировано из консоли других дабы уравнить стили
    '&.Mui-expanded':{
      margin:0,
      borderBottom:0
    },
    '&::before': {
      backgroundColor: 'rgba(0,0,0,0)'
    }
  },
  expansionDetails:{
    padding:0,
    backgroundColor: theme.palette.primary.light,
  },
  expansionSummary:{
    padding:'0 24px 0 16px',//скопировано из консоли других дабы уравнить стили
    '&::hover': {
      backgroundColor: 'rgba(0,0,0,0.08)',//скопировано из консоли других дабы уравнить стили
    },
    backgroundColor: props=>props.value===1?'rgba(0,0,0,0.14': 'inherit',
  }
}));

export default function Header(props){
  const classes = useStyles(props);//передать пропсы в наши стили для пущей легкости. Теперь есть доступ к стилям этого файла и там орудовать с if'ами.
  const theme = useTheme();//вызываем библиотеку для адаптива
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);//для адаптива for drawer из настроек материала
  const matches = useMediaQuery(theme.breakpoints.down('md'));//вызываем библиотеку для адаптива

  const [openDrawer, setOpenDrawer] = useState(false);
  // const [value, setValue] = useState(0);//установка состояния value. Вынесли вверх для доступа оного к футеру.
  const [anchorEl, setAnchorEl] = useState(null);//установка состояния для меню, якорь на страницы
  const [openMenu, setOpenMenu] = useState(false);//установка состояния для меню, открыто или закрыто
  // const [selectedIndex, setSelectedIndex] = useState(0);///установка стейта для активного подменю. Вынесли вверх для доступа оного к футеру.
  const [previousURL, setpreviousURL] = useState('');//установка состояния для аналитики

  const handleChange = (e, newValue) => {
    props.setValue(newValue)
  }

  const handleClick = (e) => {/*//при клике на итем указываем что должно быть отрендерено. */
    setAnchorEl(e.currentTarget)
    setOpenMenu(true)
  }

  const handleMenuItemClick = (e,i) => {
    setAnchorEl(null);
    setOpenMenu(false);
    props.setSelectedIndex(i)
  }

  const handleClose = (e) => {/*при закрытии меню, сбрасываем значения обратно на начальные состояния */
    setAnchorEl(null);
    setOpenMenu(false);
  };

  function handleListKeyDown(event) {//из док
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  };

  const menuOptions = [//общие аргументы для меню вынесенные в отдельную переменную и используя ее в меню элементах
    // {name:'Services', link:'/services', activeIndex:1, selectedIndex:0},
    {name:'Custom Software Development', link:'/customsoftware', activeIndex:1, selectedIndex:0},
    {name:'iOS/Android App Development', link:'/mobileapps', activeIndex:1, selectedIndex:1},
    {name:'Website Development', link:'/websites', activeIndex:1, selectedIndex:2},
  ]

  const routes = [//общие аргументы для меню и табов вынесенные в отдельную переменную и используемые в мапинге или др операций с массивами
    {name:'Home', link:'/', activeIndex:0},
    {//во вкладке сервиса есть всплывающее меню, поэтому больше аргументов чем у остальных.
      name:'Services',
      link:'/services',
      activeIndex:1,
      ariaOwns: anchorEl ? 'simple-menu' : undefined,
      ariaHasPopup:anchorEl ? true : undefined,
      mouseOver: e => handleClick(e),
    },
    {name:'The Revolution', link:'/revolution', activeIndex:2},
    {name:'About us', link:'/about', activeIndex:3},
    {name:'Contact us', link:'/contact', activeIndex:4},
    // {name:'Free Estimate', link:'/estimate', activeIndex:5},
  ]


//исправление несовпадаемости открытой страницы и закладки при перезагрузке.
  useEffect(()=> {
    if(previousURL !== window.location.pathname){//подавать аналитику только когда страница сменяется (only one visit per page), иначе c useeffect'ом он б срабатывать по многу раз на 1 странице, что не есть гуд.
      setpreviousURL(window.location.pathname)
    }

    [...menuOptions, ...routes].forEach(route=> {//перебор многих условий и установки нужных стейтов. route это условный url. Условия корректного отображения вкладок и открытых страниц url. Если расходятся, то установить стейт чтобы сошлость.
      switch (window.location.pathname) {//есть url открытой страницы прямо сейчас. (Обьяснение есть в refactoredDrafts)
        case `${route.link}`://если этот url равен link'у из перебираемого массива...
          if(props.value !== route.activeIndex) {//...и если нынешнее value не равно значению в перебираемом элементе массива (activeIndex). = открытая страница нахся не на той же активной закладке то ...
            props.setValue(route.activeIndex)//...установить ту вкладку на активную...
            // console.log('value и activeIndex не равны. Уравниваю...');
            if(route.selectedIndex && route.selectedIndex !==props.selectedIndex){//...доп проверка. Если в перебираемом элементе массива существует selectedIndex и он не равен данному, то индекс переписать на индекс кейса
              props.setSelectedIndex(route.selectedIndex)
            }
          }
          break;
        case '/estimate':
          if (props.value !==5){
            props.setValue(5);
            // console.log('case /estimate: устанавливаю value на 5', props.value);
          }
          break;
        default:
          break;
      }
    })
  },[props.value, menuOptions, props.selectedIndex, routes, props]);//слежка за значениями.

  const tabs = (
    <>
      <Tabs
        value={props.value}
        onChange={handleChange}
        className={classes.tabContainer}
        indicatorColor={'primary'}
      >
        {routes.map((route,index)=>(//мапим несколько табов по шаблону беря данные из массива routes
          <Tab
            key={`${route}${index}`}
            component={Link}
            href={route.link}
            label={route.name}
            // className={index=== 5 ? classes.button : classes.tab}
            className={classes.tab}
            aria-owns={route.ariaOwns}//если нет то просто будет пусто. В итоге только для сервиса.
            aria-haspopup={route.ariaHasPopup}//если нет то просто будет пусто. В итоге только для сервиса.
            onMouseOver={route.mouseOver}
            onMouseLeave={()=>setOpenMenu(false)}//добавили закрытие меню по отведении мышки
          />
        ))}
      </Tabs>
      <Button
        variant={'contained'}
        color={'secondary'}
        className={classes.button}
        component={Link}
        href={'/estimate'}
        onClick={()=>{
          props.setValue(5);
        }}
      >
        Free Estimate
      </Button>
      <Popper //завод обертка меню. Можно др способы.
        open={openMenu}
        anchorEl={anchorEl}
        role={undefined}
        transition
        disablePortal
        placement={'bottom-start'}//положение
      >
        {({ TransitionProps, placement }) => (
          <Grow//завод обертка анимации всплывания
            {...TransitionProps}
            style={{ transformOrigin: 'top left' }}//откуда выплывает
          >
            <Paper
              classes={{root:classes.menu}}//не className={classes.menu} а это, ибо все что связано с меню должно сначала быть изменено с заводской стороны - https://material-ui.com/api/menu/
              elevation={0}//сброс завода парящего блока с тенью.
            >
              <ClickAwayListener //завод обертка по клику снаружи
                onClickAway={handleClose}
              >
                <MenuList
                  onMouseOver={()=>setOpenMenu(true)}//добавили открытие меню по отведении мышки
                  onMouseLeave={handleClose}
                  disablePadding
                  autoFocusItem={false}//автоматом фокусироваться на 1 элементе
                  id={'simple-menu'}//для кнопки которая запускает это всплывающее меню
                  onKeyDown={handleListKeyDown}
                >
                  {menuOptions.map((option,i)=>(//отрефактореный список превращенный из множества отдельных итемов в 1 шаблонный мапинг.
                    <MenuItem
                      // onClick={handleClose} - не гуд - при нажатии на итемы Services закладка не переходит к ней. Привязываем ее путем добавления доп операции(след строка)
                      // onClick={()=>{handleClose(); setValue(1)}}//мульти вызов функции кот выполняет не 1 операцию = При нажатии - убрать с экрана и установить значение индекса.
                      onClick={(e)=>{handleMenuItemClick(e,i); props.setValue(1); handleClose()}}//переделаный онклик с добавлением индекса для обозначения итема selected
                      selected={i===props.selectedIndex && props.value===1 && window.location.pathname!=='/services'}//выделенность только тогда когда совпадают страницы с итемом и вкладка с Services.
                      component={Link}//обьявление Router связи...
                      href={option.link}//...с <Route exact path={'/customsoftware'} component={()=><div>customsoftware</div>}/>
                      classes={{root:classes.menuItem}}
                      key={`${option}${i}`}//установка ключа кот так нужен реакту. Берем option либо потом рефактор на свой шифрованный.
                    >
                      {option.name}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
      {/*поменял на Popper */}
      {/*<Menu //прописывается не важно где ибо отображается в зависимости от анкора*/}
      {/*  id={'simple-menu'}//для кнопки которая запускает это всплывающее меню*/}
      {/*  anchorEl={anchorEl}//зацеп на элемент*/}
      {/*  open={openMenu}*/}
      {/*  onClose={handleClose}//при нажатии - убрать с экрана*/}
      {/*  MenuListProps={{onMouseLeave: handleClose}}//при увода мышки с элемента - убрать с экрана. Если просто на элементах списка onMouseOver={e=>handleClose(e)} то не сработает ибо это список.*/}
      {/*  classes={{paper:classes.menu}}//не className={classes.menu} а это, ибо все что связано с меню должно сначала быть изменено с заводской стороны - https://material-ui.com/api/menu/*/}
      {/*  elevation={0}//сброс завода парящего блока с тенью.*/}
      {/*  keepMounted//завод для SEO*/}
      {/*>*/}
      {/*</Menu>*/}
    </>
  )

  const drawer = (
    <React.Fragment>
      <SwipeableDrawer //обертка для адаптивного выплывающего меню. Скопировано с материала
        disableBackdropTransition={!iOS}//optimize mobile performance
        disableDiscovery={iOS}
        open={openDrawer}//открыт ли он
        onClose={()=> setOpenDrawer(false)}//закрывать при срабатывании
        onOpen={()=> setOpenDrawer(true)}//открывать при срабатывании
        classes={{paper:classes.drawer}}///добавим свой стиль в завод
      >
        <div className={classes.toolbarMargin }> </div>{/*подобие брейка-отступа. Кладется в тело дровера прокладка высотой как тот готовый маргин для стики хеадера.*/}
        <List disablePadding>{/*убрать дефолт падингт путем готового завода*/}
          {routes.map(route=>//мапим несколько итемов по шаблону беря данные из массива routes
            route.name==='Services'?(//только для сервиса
              <ExpansionPanel //рендер гармошки
                elevation={0}
                classes={{root:classes.expansion}} //перезапись завода стилей. Ибо в консоли "блабла-root"
                key={route.name}
              >
                <ExpansionPanelSummary //то что видно
                  classes={{root:classes.expansionSummary}} //перезапись завода стилей
                  expandIcon={<ExpandMoreIcon color={'secondary'}/>}
                >
                  <ListItemText//скопировано с других из-за стилей. Замена с простого {route.name}.
                    className={classes.drawerItem}
                    disableTypography
                  >
                    {route.name}
                  </ListItemText>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails//то что всплывает
                  classes={{root:classes.expansionDetails}} //перезапись завода стилей
                >
                  <Grid container direction={'column'}>
                    {menuOptions.map(route=>(
                      <Grid item>
                        <ListItem//скопировано снизу ибо все тжсм но подправили зависимости, что активно, что нет итд.
                          key={`${route}${route.selectedIndex}`}
                          divider
                          button
                          component={Link}
                          href={route.link}
                          onClick={()=> {
                            setOpenDrawer(false);
                            props.setSelectedIndex(route.selectedIndex)// selectedIndex because now we need to make sure we're handling whichever menu item is selected.
                          }}
                          selected={props.selectedIndex===route.selectedIndex&&props.value===1&&window.location.pathname!=='/services'}//checking to see if we're currently on that item's index.
                          classes={{selected:classes.drawerItemSelected}}//есть в Mui атрибут selected кот take this logic behind the scene.
                        >
                          <ListItemText
                            className={classes.drawerItem}
                            disableTypography
                            style={{opacity:props.value===1?1:null}}//And so now you can see the selection for both of these working and that is a really nice effect.
                            onClick={()=> {
                              setOpenDrawer(false);
                              props.setValue(route.activeIndex)
                            }}
                          >
                            {/*<Link href={route.link} color={'inherit'}>*/}
                            {
                              route.name.split(' ').filter(word=>word!=='Development').join('')//разобрать текст на слова и выкинуть development для узкого вида меню.
                            }
                            <br/>
                            <span style={{fontSize:'0.75rem'}}>Development</span>
                            {/*</Link>*/}
                          </ListItemText>
                        </ListItem>
                      </Grid>
                    ))}
                  </Grid>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            ):(
            <ListItem
              key={`${route}${route.activeIndex}`}
              divider
              button
              component={Link}
              href={route.link}
              onClick={()=> {
                setOpenDrawer(false);
                props.setValue(route.activeIndex)
              }}
              selected={props.value===route.activeIndex}//проп завода
              classes={{selected:classes.drawerItemSelected}}//есть в Mui атрибут selected кот take this logic behind the scene.
            >
              <ListItemText
                className={classes.drawerItem}
                disableTypography
              >
                {route.name}
              </ListItemText>
            </ListItem>
          ))}

          <ListItem
            divider
            button
            component={Link}
            href={'/estimate'}
            onClick={()=> {
              setOpenDrawer(false);
              props.setValue(5);
            }}
            selected={props.value===5}//selected is проп завода
            classes={{root:classes.drawerItemEstimate, selected:classes.drawerItemSelected}}
          >
            <ListItemText className={classes.drawerItem} disableTypography>Free Estimate</ListItemText>
          </ListItem>
        </List>
      </SwipeableDrawer>
        <IconButton
          onClick={()=> setOpenDrawer(!openDrawer)}//на клике на кнопку менять состояние
          disableRipple//убрать тень
          className={classes.drawerIconContainer}//уберем кружок
        >
          <MenuIcon
            className={classes.drawerIcon}
          />
        </IconButton>
    </React.Fragment>
  )

  return (
    <React.Fragment>
      <ElevationScroll>{/*обертка шапки хеадера с логикой фикс положения при скролле*/}
        <AppBar position={"fixed"} color={"primary"} className={classes.appBar}>{/*шапка*/}
          <Toolbar disableGutters>{/*тож шапка*/}
            {/*<Typography variant={'h3'}>*/}
            {/*  Arc Development*/}
            {/*</Typography>*/}
            <Button component={Link} href={'/'} className={classes.logoContainer} onClick={()=>{props.setValue(0)}} disableRipple>{/*обернуть лого в кнопку с онкликом установки value на домашнюю страницу*/}
              <img alt={'company logo'} src="/assets/logo.svg" className={classes.logo}/>
            </Button>
            <Hidden mdDown>{/*при уменьшении экрана рендерить разные меню*/}
              {tabs}
            </Hidden>
            <Hidden lgUp>
              {drawer}
            </Hidden>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbarMargin}/>{/*добавлен этот элемент со своим стилем дабы исправить дефолтное перекрывание последующего текста. Он создает прослойку под AppBar выталкивая последующий текст в пределы видимости.*/}
      {/*<Button className={classes2.myButton}>button</Button>*/}
    </React.Fragment>

    )
}