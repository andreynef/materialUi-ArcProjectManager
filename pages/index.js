import React, {useState} from 'react';
import Typography from '@material-ui/core/Typography';
import {makeStyles, useTheme} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import AddIcon from '@material-ui/icons/Add'
import Switch from "@material-ui/core/Switch";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import {MuiPickersUtilsProvider, KeyboardDatePicker} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import {format} from 'date-fns';
import EnhancedTable from "../src/ui/EnhancedTable";
import {Hidden} from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";

// npm i @material-ui/pickers @date-io/date-fns@1.3.13 date-fns@next

const useStyles = makeStyles(theme => ({
  service: {
    fontWeight: 300,
  },
  users: {
    marginRight: 0,
  },
  button: {
    borderRadius: 50,
    color: '#fff',
    textTransform: 'none',
    backgroundColor: theme.palette.common.orange,
    '&:hover': {
      backgroundColor: theme.palette.secondary.light,
    },
  }
}))

function createData(name, date, service, features, complexity, platforms, users, total, search) {//ф создающая из множества передающих атрибутов один обьект с этими ключами. Как в документации.
  return {name: name, date: date, service, features, complexity, platforms, users, total, search}
}

export default function ProjectManager() {
  const classes = useStyles();
  const theme = useTheme();
  const [websiteChecked, setWebsiteChecked] = useState(false)
  const [iOSChecked, setiOSChecked] = useState(false)
  const [androidChecked, setAndroidChecked] = useState(false)
  const [softwareChecked, setSoftwareChecked] = useState(false)
  const [rows, setRows] = useState([
    createData('Andrey Nefedyev', '10/09/2020', 'Website', 'e-commerce', 'N/A', 'N/A', 'N/A', '$1500', true),
    createData('SomeoneElse', '11/10/2020', 'Custom Software', 'gps, push notifications, users/authentication, filetransfer', 'medium', 'web application', '0-10', '$1800', true),
    createData('Steve Jobs', '11/11/2020', 'Custom Software', 'photo, push notifications, users/authentication, filetransfer', 'low', 'web application', '0-10', '$1800', true),
  ]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [name, setName] = useState('');//сост для диалога
  const [date, setDate] = useState(new Date());//сост для диалога. По дефолту делаем сегодняшнее число.
  const [total, setTotal] = useState('');//сост для диалога.
  const [service, setService] = useState('');//сост для диалога.
  const [complexity, setComplexity] = useState('');//сост для диалога.
  const [users, setUsers] = useState('');//сост для диалога.
  const [platforms, setPlatforms] = useState([]);//сост для диалога.
  const [features, setFeatures] = useState([]);//сост для диалога.
  const [search, setSearch] = useState([]);//сост для поиска.
  const [page, setPage] = React.useState(0);//достато из EnhancedTable.js
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));//вызываем библиотеку для адаптива
  const matchesMD = useMediaQuery(theme.breakpoints.down('md'));//вызываем библиотеку для адаптива


  const platformOptions = ['Web', 'iOS', 'Android']
  let featureOptions = ['Photo/Video', 'Gps', 'File transfer', 'Users/Authentification', 'Biometrics', 'Push Notifications']
  let websiteOptions = ['Basic', 'Interactive', 'E-Commerce']

  const addProject = () => {
    setRows([//установить нов стейт таблицы
      ...rows,//все что уже есть
      createData(//создать нов обьект по сущ ф по созданию обьекта из данных.
        name,
        format(date, 'MM/dd/yyyy'),
        service,
        features.join(', '),
        service === 'Website' ? 'N/A' : complexity,
        service === 'Website' ? 'N/A' : platforms.join(', '),
        service === 'Website' ? 'N/A' : users,
        `$${total}`,//добавить доллар
        true
      )
    ])
    setDialogOpen(false);
    setName('');
    setDate(new Date());
    setTotal('');
    setService('');
    setComplexity('');
    setUsers('');
    setPlatforms([]);
    setFeatures([]);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value)//при любом изменении в поисковой строке устанавливать стейт search на введенное значение в инпуте

    const rowData = //Итог-переделать массив из обьектов row в массив из массивов со значениями этих обьектов + исключая булинь search значения (excluding search property)
      rows.map(row =>//map - доступ к кажд обьекту=строке таблицы.
        Object.values(row)// Object.values - доступ к внутренностям кажд обьекта и возврат в виде массива значений этого обьекта.
          .filter(option => option !== true && option !== false)//Filter - возврат нов массива с теми же элементами но кот прошли проверку, тобишь без булинь значений.
      )

    const matches =//Итог-переделать, полученный с прошл операции массив из массивов со значениями-строками, в массив массивов со значениями-булинь.
      rowData.map(row =>//map - доступ к кажд элементу/массиву с пачкой строк-значений.
        row.map(option =>//map - доступ к кажд элементу/строке -значению.
          option.toLowerCase()//у кажд строки убрать заглавные буквы
            .includes(e.target.value.toLowerCase())//булинь проверяющий не содержится ли в этой строке то что введено в передаваемом ивенте
        )
      )

    const newRows = [...rows];//создаем копию сущ данных таблицы (массив из обьектов)

    matches//Итог-проверить значения в массиве из массивов (булинь) на содержание булинь и в зависимости от ответа изменить в новосозданном массиве из обьектов(данных таблицы) значения search на true или false.
      .map((row, index) =>//map-доступ к кажд элементу/массиву, предварительно указав его индекс в общем массиве
        row.includes(true)//если в элементе/массиве содержится элемент со значением true...
          ? newRows[index].search = true //...то в новосозданном массиве из обьектов таблицы поменять значение search у обьекта с этим индексом на true
          : newRows[index].search = false//...иначе на false
      )

    setRows(newRows);//обновляем стейт таблицы
    setPage(0);//для сортировки. хз. добавлено из-за переноса стейта от enhancetable сюда
  }

  const serviceQuestions = (
    <>
      <Grid item style={{marginTop: matchesSM ? 20 : '5em'}}>
        <Typography variant={'h4'}>Service</Typography>
      </Grid>
      <Grid item>
        <RadioGroup
          aria-label={'service'}
          name={'service'}
          value={service}
          onChange={e => {
            setService(e.target.value);
            setFeatures([])
          }}//при переключении вариантов Service, сбрасывать дроп список Features
        >
          <FormControlLabel control={<Radio/>} label={'Website'} value={'Website'}
                            classes={{label: classes.service}}/>
          <FormControlLabel control={<Radio/>} label={'Mobile App'} value={'Mobile App'}
                            classes={{label: classes.service}}/>
          <FormControlLabel control={<Radio/>} label={'Custom Software'} value={'Custom Software'}
                            classes={{label: classes.service}}/>
        </RadioGroup>
      </Grid>
    </>
  );

  const complexityQuestions = (
      <Grid item>
        <Grid item container direction={'column'} style={{marginTop: matchesSM ? 50 : '5em'}}>
          <Grid item style={{marginBottom: matchesSM ? 50 : null}}>
            <Typography variant={'h4'}>Complexity</Typography>
          </Grid>
          <Grid item>
            <RadioGroup
              aria-label={'complexity'}
              name={'complexity'}
              value={complexity}
              onChange={e => setComplexity(e.target.value)}
            >
              <FormControlLabel control={<Radio/>} label={'Low'} value={'Low'}
                                disabled={service === 'Website'}
                                classes={{label: classes.service}}/>
              <FormControlLabel control={<Radio/>} label={'Medium'} value={'Medium'}
                                disabled={service === 'Website'}
                                classes={{label: classes.service}}/>
              <FormControlLabel control={<Radio/>} label={'High'} value={'High'}
                                disabled={service === 'Website'}
                                classes={{label: classes.service}}/>
            </RadioGroup>
          </Grid>
        </Grid>
      </Grid>
  );

  const userQuestions = (
      <Grid item style={{alignSelf: matchesSM ? 'center' : 'flex-end'}}>
        <Grid item container direction={'column'} style={{marginTop: matchesSM ? 50 : '5em'}}>
          <Grid item>
            <Typography variant={'h4'}>Users</Typography>
          </Grid>
          <Grid item>
            <RadioGroup
              aria-label={'users'}
              name={'users'}
              value={users}
              onChange={e => setUsers(e.target.value)}
            >
              <FormControlLabel control={<Radio/>} label={'0-10'} value={'0-10'}
                                disabled={service === 'Website'}
                                classes={{label: classes.service, root: classes.users}}/>
              <FormControlLabel control={<Radio/>} label={'10-100'} value={'10-100'}
                                disabled={service === 'Website'}
                                classes={{label: classes.service, root: classes.users}}/>
              <FormControlLabel control={<Radio/>} label={'100+'} value={'100+'}
                                disabled={service === 'Website'}
                                classes={{label: classes.service, root: classes.users}}/>
            </RadioGroup>
          </Grid>
        </Grid>
      </Grid>
  );

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container direction={'column'} alignItems={matchesSM ? 'center' : undefined}>
        <Grid item style={{marginTop: '2em', marginLeft: matchesSM ? 0 : '5em'}}>
          <Typography variant={'h1'}>Projects</Typography>
        </Grid>
        <Grid item>
          <TextField
            placeholder={'Search project details or create new entry.'}
            value={search}//соединено со стейтом
            onChange={handleSearch}//при кажд изменении запускать поиск
            style={{width: matchesSM ? '25em' : '35em', marginLeft: matchesSM ? 0 : '5em'}}
            InputProps={//вставка иконки "плюс" рядом с инпутом
              {
                endAdornment: (
                  <InputAdornment position={'end'} onClick={() => setDialogOpen(true)} style={{cursor: 'pointer'}}>
                    <AddIcon color={'primary'} style={{fontSize: 30}}/>
                  </InputAdornment>
                )
              }
            }
          />
        </Grid>
        <Grid item style={{marginLeft: matchesSM ? 0 : '5em', marginTop: '2em'}}>
          <FormGroup row>{/*material-components-inputs-switch*/}
            <Grid container direction={matchesSM ? 'column' : 'row'} justify={matchesSM ? 'center' : undefined}>
              <Grid item>
                <FormControlLabel
                  style={{marginRight: matchesSM ? 0 : '5em'}}
                  control={
                    <Switch checked={websiteChecked} color={'primary'}
                            onChange={() => setWebsiteChecked(!websiteChecked)}/>//toggle
                  }
                  label={'Websites'}
                  labelPlacement={matchesSM ? 'end' : 'start'}//положение лейбла
                />
              </Grid>
              <Grid item>
                <FormControlLabel
                  style={{marginRight: matchesSM ? 0 : '5em'}}
                  control={
                    <Switch checked={iOSChecked} color={'primary'} onChange={() => setiOSChecked(!iOSChecked)}/>//toggle
                  }
                  label={'iOS Apps'}
                  labelPlacement={matchesSM ? 'end' : 'start'}//положение лейбла
                />
              </Grid>
              <Grid item>
                <FormControlLabel
                  style={{marginRight: matchesSM ? 0 : '5em'}}
                  control={
                    <Switch checked={androidChecked} color={'primary'}
                            onChange={() => setAndroidChecked(!androidChecked)}/>//toggle
                  }
                  label={'Android Apps'}
                  labelPlacement={matchesSM ? 'end' : 'start'}//положение лейбла
                />
              </Grid>
              <Grid item>
                <FormControlLabel
                  control={
                    <Switch checked={softwareChecked} color={'primary'}
                            onChange={() => setSoftwareChecked(!softwareChecked)}/>//toggle
                  }
                  label={'Software Apps'}
                  labelPlacement={matchesSM ? 'end' : 'start'}//положение лейбла
                />
              </Grid>
            </Grid>
          </FormGroup>
        </Grid>

        <Grid item style={{margin: matchesMD ? '5em 0 40em 0' : '5em 0 35em 0', maxWidth: '100%'}}>
          {/*удалено тк вставлено <EnhancedTable rows={rows}/>*/}
          {/*<TableContainer*/}
          {/*  component={Paper}*/}
          {/*  elevation={0}//контейнера тень аля парение*/}
          {/*>*/}
          {/*  <Table>*/}
          {/*    <TableHead>*/}
          {/*      <TableRow>*/}
          {/*        <TableCell align={'center'}>Name</TableCell>*/}
          {/*        <TableCell align={'center'}>Date</TableCell>*/}
          {/*        <TableCell align={'center'}>Service</TableCell>*/}
          {/*        <TableCell align={'center'}>Features</TableCell>*/}
          {/*        <TableCell align={'center'}>Complexity</TableCell>*/}
          {/*        <TableCell align={'center'}>Platforms</TableCell>*/}
          {/*        <TableCell align={'center'}>Users</TableCell>*/}
          {/*        <TableCell align={'center'}>Total</TableCell>*/}
          {/*      </TableRow>*/}
          {/*    </TableHead>*/}
          {/*    <TableBody>*/}
          {/*      {rows*/}
          {/*        .filter(row=>row.search)//Для search. Только то что со значением search=true*/}
          {/*        .map((row, index) =>*/}
          {/*        <TableRow key={index}>*/}
          {/*          <TableCell align={'center'}>{row.name}</TableCell>*/}
          {/*          <TableCell align={'center'}>{row.date}</TableCell>*/}
          {/*          <TableCell align={'center'}>{row.service}</TableCell>*/}
          {/*          <TableCell align={'center'} style={{maxWidth: '5em'}}>{row.features}</TableCell>*/}
          {/*          <TableCell align={'center'}>{row.complexity}</TableCell>*/}
          {/*          <TableCell align={'center'}>{row.platform}</TableCell>*/}
          {/*          <TableCell align={'center'}>{row.users}</TableCell>*/}
          {/*          <TableCell align={'center'}>{row.total}</TableCell>*/}
          {/*        </TableRow>*/}
          {/*      )}*/}
          {/*    </TableBody>*/}
          {/*  </Table>*/}
          {/*</TableContainer>*/}
          <EnhancedTable
            rows={rows}
            setRows={setRows}
            page={page}
            setPage={setPage}
            websiteChecked={websiteChecked}
            iOSChecked={iOSChecked}
            androidChecked={androidChecked}
            softwareChecked={softwareChecked}
          />
        </Grid>
        {/*------диалоговое окно start--------------------------------------------------------------------------------------*/}

        <Dialog//диалоговое окно. Вставляется не важно где.
          open={dialogOpen}//открыто когда state is true
          fullScreen={matchesSM}
          style={{zIndex: 1302}}
          onClose={() =>
            setDialogOpen(false)
          }
          fullWidth
          maxWidth={'md'}
        >
          <Grid container justify={'center'}>
            <Grid item>
              <Typography variant={'h1'} gutterBottom>
                Add a new project
              </Typography>
            </Grid>
          </Grid>
          <DialogContent>
            <Grid container justify={'space-between'} direction={matchesSM ? 'column' : 'row'}>
              <Grid item>
                <Grid item container direction={'column'} sm alignItems={matchesSM ? 'center' : undefined}>
                  <Hidden mdUp>
                    {serviceQuestions}
                  </Hidden>
                  <Hidden mdUp>
                    {userQuestions}
                  </Hidden>
                  <Hidden mdUp>
                    {complexityQuestions}
                  </Hidden>
                  <Grid item>
                    <TextField
                      fullWidth={!matchesSM}
                      label={'Name'}
                      id={'name'}
                      value={name}
                      onChange={e => setName(e.target.value)}
                      style={{width: matchesSM ? 250 : undefined}}
                    />
                  </Grid>
                  <Grid item container direction={'column'}
                        alignItems={matchesSM ? 'center' : undefined}>
                    <Hidden smDown>
                      {serviceQuestions}
                    </Hidden>
                    <Grid item style={{marginTop: matchesSM ? 50 : '5em'}}>
                      <Select
                        labelId={'platforms'}
                        id={'platforms'}
                        style={{width: matchesSM ? 250 : '12em'}}
                        MenuProps={{style: {zIndex: 1302}}}//передать стиль чтобы меню было поверх всего
                        disabled={service === 'Website'}
                        multiple
                        displayEmpty//показывать если даже пока ничего не выбрал. Типа плейсхолдера. Определяяется в renderValue
                        renderValue={platforms.length > 0 ? undefined : () => 'Platforms'}
                        value={platforms}
                        onChange={e => setPlatforms(e.target.value)}
                      >
                        {
                          platformOptions.map(option =>
                            <MenuItem
                              key={option}
                              value={option}
                            >
                              {option}
                            </MenuItem>
                          )}
                      </Select>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid item container direction={'column'} sm style={{marginTop: 16}}
                      alignItems={'center'}>{/*16 маргин дабы уровнять с соседними. Либо удалить маргины у соседей*/}
                  <Grid item style={{marginTop: matchesSM ? 50 : null}}>
                    <KeyboardDatePicker//выбор даты из библиотеки, всплывающее окно.
                      format={'MM/dd/yyyy'}
                      value={date}
                      onChange={newDate => setDate(newDate)}
                      style={{width: matchesSM ? 250 : undefined}}
                    />
                  </Grid>
                  <Hidden smDown>
                    {complexityQuestions}
                  </Hidden>
                </Grid>
              </Grid>
              <Grid item>
                <Grid item container direction={'column'} sm alignItems={matchesSM ? 'center' : undefined}>
                  <Grid item style={{marginTop: matchesSM ? 50 : null}}>
                    <TextField
                      style={{width: matchesSM ? 250 : undefined}}
                      InputProps={//вставка иконки "$" рядом с инпутом
                        {
                          startAdornment: (
                            <InputAdornment position={'start'}>
                              $
                            </InputAdornment>
                          )
                        }
                      }
                      label={'Total'}
                      id={'total'}
                      value={total}
                      onChange={e => setTotal(e.target.value)}
                    />
                  </Grid>

                  <Hidden smDown>
                    {userQuestions}
                  </Hidden>

                  <Grid item style={{marginTop: matchesSM ? 50 : '5em'}}>
                    <Select
                      labelId={'features'}
                      id={'features'}
                      MenuProps={{style: {zIndex: 1302}}}//передать стиль чтобы меню было поверх всего
                      style={{width: matchesSM ? 250 : '12em'}}
                      multiple
                      displayEmpty//показывать если даже пока ничего не выбрал. Типа плейсхолдера. Определяяется в renderValue
                      renderValue={features.length > 0 ? undefined : () => 'Features'}
                      value={features}
                      onChange={e => setFeatures(e.target.value)}
                    >
                      {service === 'Website' ? featureOptions = websiteOptions : null}{/*если нах на странице website то меняем список опций на нужный. Можно было бы не менять переменные но это на 2 строка короче*/}
                      {
                        featureOptions.map(option =>
                          <MenuItem
                            key={option}
                            value={option}
                          >
                            {option}
                          </MenuItem>
                        )}
                    </Select>
                  </Grid>
                </Grid>
              </Grid>
              <Grid container justify={'center'} style={{marginTop: '3em'}}>
                <Grid item>
                  <Button
                    color={'primary'}
                    style={{fontWeight: 300}}
                    onClick={() => setDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant={'contained'}
                    className={classes.button}
                    onClick={addProject}//при нажатии добавляется в стейт rows нов обьект с нужн данными
                    disabled={//не активна если не соблюдены условия
                      service === 'Website'
                        ?
                        name.length === 0 ||
                        total.length === 0 ||
                        features.length === 0 ||
                        features.length > 1
                        :
                        name.length === 0 ||
                        total.length === 0 ||
                        features.length === 0 ||
                        users.length === 0 ||
                        complexity.length === 0 ||
                        platforms.length === 0 ||
                        service.length === 0
                    }
                  >
                    Add project+
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </DialogContent>

        </Dialog>
        {/*------диалоговое окно end--------------------------------------------------------------------------------------*/}

      </Grid>
    </MuiPickersUtilsProvider>
);
}
