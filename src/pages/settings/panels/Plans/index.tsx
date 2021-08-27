import React, { useEffect, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import { AddCircleOutline } from '@material-ui/icons';
import { Button, Checkbox, FormControlLabel, Grid, TextField, Typography } from '@material-ui/core';
import NumberFormat from 'react-number-format';
import { useStyles } from './styles';
import { api } from '../../../../services/api';

export function NumberFormatCustom(props: any) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            name: props.name,
            value: values.floatValue,
          },
        });
      }}
      thousandSeparator='.'
      decimalSeparator=','
      decimalScale={2}
      fixedDecimalScale
      isNumericString
      prefix='R$ '
    />
  );
}

interface Plan {
  _id?: any;
  name: string;
  dueDate: number;
  active: boolean;
  value: string;
  isNew?: boolean;
}

const PlansComponent: any = ({ ...props }) => {
  const classes = useStyles();
  const [plans, setPlans] = useState<Plan[]>([]);

  const { formik } = props;

  const handleGetPlans = async () => {
    const result = await api.get('plans/list');
    setPlans(result.data);
  };

  useEffect(() => {
    handleGetPlans();
  }, []);

  const handleNewPlan = () => {
    const newPlan = {
      _id: null,
      name: 'Novo Plano',
      dueDate: new Date().getDay(),
      active: true,
      value: '',
      isNew: true,
    };

    setPlans(prevPlans => [...prevPlans, newPlan]);
  };

  const handleInput = (type: string, event: any, idx: number, checkBox = false) => {
    const oldPlans: any = plans;
    oldPlans[idx][type] = checkBox ? event.target.checked : event.target.value;
    setPlans([...oldPlans]);
  };

  async function handleFormik(data: any) {
    for (const plan of data) {
      formik.values.plans.push(plan);
    }
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const data = plans.map(plan => {
      return {
        ...plan,
        _id: plan.isNew ? undefined : plan._id,
      };
    });

    await handleFormik(data);

    return await formik.handleSubmit();
  };

  return (
    <Grid container spacing={3} alignItems={'center'}>
      <form
        id='planList'
        name='planList'
        onSubmit={e => handleSubmit(e)}
        noValidate
        style={{ display: 'flex', flexDirection: 'row' }}
      ></form>
      {plans.length > 0 &&
        plans.map((plan: any, idx: any) => (
          <Grid item key={plan._id} xs={12} sm={6} md={4} lg={3} className={classes.card}>
            <Paper className={classes.paper}>
              <div className={classes.titleName}>
                <Typography variant='h2' className={classes.text}>
                  {plan.name}
                </Typography>
              </div>
              <TextField
                variant='outlined'
                fullWidth
                margin={'normal'}
                required
                onChange={e => handleInput('name', e, idx)}
                label='Nome do Plano'
                type='text'
                autoComplete='name'
                autoFocus
                value={plan.name}
              />
              <TextField
                variant='outlined'
                fullWidth
                margin={'normal'}
                onChange={e => handleInput('value', e, idx)}
                label='Valor do Plano'
                placeholder='R$ '
                type='text'
                value={plan.value}
                InputProps={{
                  inputComponent: NumberFormatCustom,
                }}
              />
              <TextField
                variant='outlined'
                fullWidth
                required
                margin={'normal'}
                onChange={e => handleInput('dueDate', e, idx)}
                label='Dia de Vencimento'
                InputProps={{ inputProps: { min: 1, max: 31 } }}
                type='number'
                autoComplete='dueDate'
                value={plan.dueDate}
              />
              <FormControlLabel
                control={<Checkbox checked={plan.active} onChange={e => handleInput('active', e, idx, true)} />}
                label='Plano Ativo'
              />
            </Paper>
          </Grid>
        ))}
      <Grid item xs={12} sm={6} md={4} lg={3} className={classes.card}>
        <Paper className={classes.paperNew} onClick={() => handleNewPlan()}>
          <AddCircleOutline className={classes.icon} />

          <Typography variant='h2' className={classes.text}>
            Novo plano
          </Typography>
        </Paper>
      </Grid>
      <Grid container justifyContent={'flex-end'} spacing={2}>
        <Grid item>
          <Button type='submit' variant='contained' color='primary' form='planList'>
            Salvar
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default PlansComponent;
