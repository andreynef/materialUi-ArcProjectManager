import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {KeyboardDatePicker} from "@material-ui/pickers";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";

const useStyles = makeStyles(theme => ({
  footer: {
    backgroundColor: theme.palette.common.blue,
    width: "100%",
    zIndex: 1302,
    position: "relative"
  },
  adornment: {
    width: "25em",
    verticalAlign: "bottom",
    [theme.breakpoints.down("md")]: {
      width: "21em"
    },
    [theme.breakpoints.down("xs")]: {
      width: "15em"
    }
  },

}));

export default function DialogContainer(props) {
  const classes = useStyles();

  return (
    <>
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
                    <Typography variant={'h4'}>Service</Typography>
                  </Grid>
                  <Grid item>
                    <RadioGroup
                      aria-label={'service'}
                      name={'service'}
                      value={service}
                      onChange={e => {setService(e.target.value);setFeatures([])}}//при переключении вариантов Service, сбрасывать дроп список Features
                    >
                      <FormControlLabel control={<Radio/>} label={'Website'} value={'Website'}
                                        classes={{label: classes.service}}/>
                      <FormControlLabel control={<Radio/>} label={'Mobile App'} value={'Mobile App'}
                                        classes={{label: classes.service}}/>
                      <FormControlLabel control={<Radio/>} label={'Custom Software'} value={'Custom Software'}
                                        classes={{label: classes.service}}/>
                    </RadioGroup>
                  </Grid>
                  <Grid item style={{marginTop: '5em'}}>
                    <Select
                      labelId={'platforms'}
                      id={'platforms'}
                      style={{width: '12em'}}
                      disabled={service==='Website'}
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
                                          disabled={service==='Website'}
                                          classes={{label: classes.service}}/>
                        <FormControlLabel control={<Radio/>} label={'Medium'} value={'Medium'}
                                          disabled={service==='Website'}
                                          classes={{label: classes.service}}/>
                        <FormControlLabel control={<Radio/>} label={'High'} value={'High'}
                                          disabled={service==='Website'}
                                          classes={{label: classes.service}}/>
                      </RadioGroup>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid item container direction={'column'} sm>
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
                <Grid item style={{alignSelf: 'flex-end'}}>
                  <Grid item container direction={'column'} style={{marginTop: '5em'}}>
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
                                          disabled={service==='Website'}
                                          classes={{label: classes.service, root: classes.users}}/>
                        <FormControlLabel control={<Radio/>} label={'10-100'} value={'10-100'}
                                          disabled={service==='Website'}
                                          classes={{label: classes.service, root: classes.users}}/>
                        <FormControlLabel control={<Radio/>} label={'100+'} value={'100+'}
                                          disabled={service==='Website'}
                                          classes={{label: classes.service, root: classes.users}}/>
                      </RadioGroup>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item style={{marginTop: '5em'}}>
                <Select
                  labelId={'features'}
                  id={'features'}
                  MenuProps={{style: {zIndex: 1302}}}//передать стиль чтобы меню было поверх всего
                  style={{width: '12em'}}
                  multiple
                  displayEmpty//показывать если даже пока ничего не выбрал. Типа плейсхолдера. Определяяется в renderValue
                  renderValue={features.length > 0 ? undefined : () => 'Features'}
                  value={features}
                  onChange={e => setFeatures(e.target.value)}
                >
                  {service==='Website' ? featureOptions = websiteOptions:null}{/*если нах на странице website то меняем список опций на нужный. Можно было бы не менять переменные но это на 2 строка короче*/}
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
                    features.length>1
                    :
                    name.length === 0 ||
                    total.length === 0 ||
                    features.length === 0 ||
                    users.length===0 ||
                    complexity.length===0 ||
                    platforms.length===0 ||
                    service.length===0
                }
              >
                Add project+
              </Button>
            </Grid>
          </Grid>
        </DialogContent>

      </Dialog>
    </>
  );
}
