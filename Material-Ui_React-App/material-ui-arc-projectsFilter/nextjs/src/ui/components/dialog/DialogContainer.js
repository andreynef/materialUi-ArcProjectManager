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
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Paper from "@material-ui/core/Paper";
import TableBody from "@material-ui/core/TableBody";
import FilterListIcon from "@material-ui/icons/FilterList";
import {MuiPickersUtilsProvider, KeyboardDatePicker} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
// npm i @material-ui/pickers @date-io/date-fns@1.3.13 date-fns@next

const useStyles = makeStyles(theme => ({
  service: {
    fontWeight: 300,
  },
  users: {
    marginRight: 0,
  }
}))

function createData(name, date, service, features, complexity, platform, users, total) {//ф создающая из множества передающих атрибутов один обьект с этими ключами.
  return {name: name, date: date, service, features, complexity, platform, users, total}
}

export default function ProjectManager() {
  const classes = useStyles();
  const theme = useTheme();
  const [websiteChecked, setWebsiteChecked] = useState(false)
  const [iOSChecked, setiOSChecked] = useState(false)
  const [androidChecked, setAndroidChecked] = useState(false)
  const [softwareChecked, setSoftwareChecked] = useState(false)
  const [rows, setRows] = useState([
    createData('Andrey Nefedyev', '10/09/2020', 'website', 'e-commerce', 'N/A', 'N/A', 'N/A', '1500'),
    createData('SomeoneElse', '11/10/2020', 'custom software', 'gps, push notifications, users/authentication, filetransfer', 'medium', 'web application', '0-10', '1800'),
    createData('Steve Jobs', '11/11/2020', 'custom software', 'photo, push notifications, users/authentication, filetransfer', 'low', 'web application', '0-10', '1800'),
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

  const platformOptions = ['Web', 'iOS', 'Android']

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container direction={'column'}>
        <Grid item style={{marginTop: '2em', marginLeft: '5em'}}>
          <Typography variant={'h1'}>Projects</Typography>
        </Grid>
        <Grid item>
          <TextField
            placeholder={'Search project details or create new entry.'}
            style={{width: '35em', marginLeft: '5em'}}
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
        <Grid item style={{marginLeft: '5em', marginTop: '2em'}}>
          <FormGroup row>{/*material-components-inputs-switch*/}
            <FormControlLabel
              style={{marginRight: '5em'}}
              control={
                <Switch checked={websiteChecked} color={'primary'} onChange={() => setWebsiteChecked(!websiteChecked)}/>//toggle
              }
              label={'Websites'}
              labelPlacement={'start'}//положение лейбла
            />
            <FormControlLabel
              style={{marginRight: '5em'}}
              control={
                <Switch checked={iOSChecked} color={'primary'} onChange={() => setiOSChecked(!iOSChecked)}/>//toggle
              }
              label={'iOS Apps'}
              labelPlacement={'start'}//положение лейбла
            />
            <FormControlLabel
              style={{marginRight: '5em'}}
              control={
                <Switch checked={androidChecked} color={'primary'} onChange={() => setAndroidChecked(!androidChecked)}/>//toggle
              }
              label={'Android Apps'}
              labelPlacement={'start'}//положение лейбла
            />
            <FormControlLabel
              control={
                <Switch checked={softwareChecked} color={'primary'}
                        onChange={() => setSoftwareChecked(!softwareChecked)}/>//toggle
              }
              label={'Software Apps'}
              labelPlacement={'start'}//положение лейбла
            />
          </FormGroup>
        </Grid>
        <Grid item container justify={'flex-end'} style={{marginTop: '5em'}}>
          <Grid item style={{marginRight: 75}}>
            <FilterListIcon color={'secondary'} style={{fontSize: 50}}/>
          </Grid>
        </Grid>
        <Grid item style={{marginBottom: '10em'}}>
          <TableContainer
            component={Paper}
            elevation={0}//контейнера тень аля парение
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align={'center'}>Name</TableCell>
                  <TableCell align={'center'}>Date</TableCell>
                  <TableCell align={'center'}>Service</TableCell>
                  <TableCell align={'center'}>Features</TableCell>
                  <TableCell align={'center'}>Complexity</TableCell>
                  <TableCell align={'center'}>Platforms</TableCell>
                  <TableCell align={'center'}>Users</TableCell>
                  <TableCell align={'center'}>Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, index) =>
                  <TableRow key={index}>
                    <TableCell align={'center'}>{row.name}</TableCell>
                    <TableCell align={'center'}>{row.date}</TableCell>
                    <TableCell align={'center'}>{row.service}</TableCell>
                    <TableCell align={'center'} style={{maxWidth: '5em'}}>{row.features}</TableCell>
                    <TableCell align={'center'}>{row.complexity}</TableCell>
                    <TableCell align={'center'}>{row.platform}</TableCell>
                    <TableCell align={'center'}>{row.users}</TableCell>
                    <TableCell align={'center'}>{row.total}</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        {/*диалоговое окно start*/}

        <Dialog//диалоговое окно. Вставляется не важно где.
          open={dialogOpen}//открыто когда state is true
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
            <Grid container justify={'space-between'}>
              <Grid item>
                <Grid item container direction={'column'} sm>
                  <Grid item>
                    <TextField
                      fullWidth
                      label={'Name'}
                      id={'name'}
                      value={name}
                      onChange={e => setName(e.target.value)}
                    />
                  </Grid>
                  <Grid item container direction={'column'} style={{marginTop: '5em'}}>
                    <Grid item>
                      <Typography variand={'h4'}>Service</Typography>
                    </Grid>
                    <Grid item>
                      <RadioGroup
                        aria-label={'service'}
                        name={'service'}
                        value={service}
                        onChange={e => setService(e.target.value)}
                      >
                        <FormControlLabel control={<Radio/>} label={'Website'} value={'Website'}
                                          classes={{label: classes.service}}/>
                        <FormControlLabel control={<Radio/>} label={'Mobile App'} value={'Mobile App'}
                                          classes={{label: classes.service}}/>
                        <FormControlLabel control={<Radio/>} label={'Custom Software'} value={'Custom Software'}
                                          classes={{label: classes.service}}/>
                      </RadioGroup>
                    </Grid>
                    <Grid item>
                      <Select
                        labelId={'platforms'}
                        id={'platforms'}
                        multiple
                        value={platforms}
                        onChange={e=>setPlatforms(e.target.value)}
                      >
                        {
                          platformOptions.map(option=>
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
                  <Grid item>
                    <KeyboardDatePicker//выбор даты из библиотеки, всплывающее окно.
                      format={'MM/dd/yyyy'}
                      value={date}
                      onChange={newDate => setDate(newDate)}
                    />
                  </Grid>
                  <Grid item>
                    <Grid item container direction={'column'} style={{marginTop: '5em'}}>
                      <Grid item>
                        <Typography variand={'h4'}>Service</Typography>
                      </Grid>
                      <Grid item>
                        <RadioGroup
                          aria-label={'complexity'}
                          name={'complexity'}
                          value={complexity}
                          onChange={e => setComplexity(e.target.value)}
                        >
                          <FormControlLabel control={<Radio/>} label={'Low'} value={'Low'}
                                            classes={{label: classes.service, root: classes.users}}/>
                          <FormControlLabel control={<Radio/>} label={'Medium'} value={'Medium'}
                                            classes={{label: classes.service, root: classes.users}}/>
                          <FormControlLabel control={<Radio/>} label={'High'} value={'High'}
                                            classes={{label: classes.service, root: classes.users}}/>
                        </RadioGroup>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid item container direction={'column'} sm alignItems={'flex-end'}>
                  <Grid item>
                    <TextField
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
                  <Grid item>
                    <Grid item container direction={'column'} style={{marginTop: '5em'}}>
                      <Grid item>
                        <Typography variand={'h4'}>Service</Typography>
                      </Grid>
                      <Grid item>
                        <RadioGroup
                          aria-label={'users'}
                          name={'users'}
                          value={users}
                          onChange={e => setUsers(e.target.value)}
                        >
                          <FormControlLabel control={<Radio/>} label={'0-10'} value={'0-10'}
                                            classes={{label: classes.service}}/>
                          <FormControlLabel control={<Radio/>} label={'10-100'} value={'10-100'}
                                            classes={{label: classes.service}}/>
                          <FormControlLabel control={<Radio/>} label={'100+'} value={'100+'}
                                            classes={{label: classes.service}}/>
                        </RadioGroup>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>
        {/*диалоговое окно end*/}

      </Grid>
    </MuiPickersUtilsProvider>
  );
}
