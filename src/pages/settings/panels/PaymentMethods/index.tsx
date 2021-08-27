import React, { useEffect, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import { AddCircleOutline } from '@material-ui/icons';
import { Button, Checkbox, FormControlLabel, Grid, TextField, Typography } from '@material-ui/core';
import { useStyles } from './styles';
import { api } from '../../../../services/api';

interface PaymentMethod {
  _id?: any;
  name: string;
  dueDate: number;
  active: boolean;
  value: string;
  isNew?: boolean;
}

const PaymentMethodsComponent: any = ({ ...props }) => {
  const classes = useStyles();
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);

  const { formik } = props;

  const handleGetPaymentMethods = async () => {
    const result = await api.get('payment-methods/list');
    setPaymentMethods(result.data);
  };

  useEffect(() => {
    handleGetPaymentMethods();
  }, []);

  const handleNewPaymentMethod = () => {
    const newPaymentMethod = {
      _id: null,
      name: 'Novo Método de Pagamento',
      dueDate: new Date().getDay(),
      active: true,
      value: '',
      isNew: true,
    };

    setPaymentMethods(prevPaymentMethods => [...prevPaymentMethods, newPaymentMethod]);
  };

  const handleInput = (type: string, event: any, idx: number, checkBox = false) => {
    const oldPaymentMethods: any = paymentMethods;
    oldPaymentMethods[idx][type] = checkBox ? event.target.checked : event.target.value;
    setPaymentMethods([...oldPaymentMethods]);
  };

  async function handleFormik(data: any) {
    for (const paymentMethod of data) {
      formik.values.paymentMethods.push(paymentMethod);
    }
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const data = paymentMethods.map(paymentMethod => {
      return {
        ...paymentMethod,
        _id: paymentMethod.isNew ? undefined : paymentMethod._id,
      };
    });

    await handleFormik(data);

    return await formik.handleSubmit();
  };

  return (
    <Grid container spacing={3} alignItems={'center'}>
      <form
        id='paymentMethodList'
        name='paymentMethodList'
        onSubmit={e => handleSubmit(e)}
        noValidate
        style={{ display: 'flex', flexDirection: 'row' }}
      ></form>
      {paymentMethods.length > 0 &&
        paymentMethods.map((paymentMethod: any, idx: any) => (
          <Grid item key={paymentMethod._id} xs={12} sm={6} md={4} lg={3} className={classes.card}>
            <Paper className={classes.paper}>
              <div className={classes.titleName}>
                <Typography variant='h2' className={classes.text}>
                  {paymentMethod.name}
                </Typography>
              </div>
              <TextField
                variant='outlined'
                fullWidth
                margin={'normal'}
                required
                onChange={e => handleInput('name', e, idx)}
                label='Nome do Método de Pagamento'
                type='text'
                autoComplete='name'
                autoFocus
                value={paymentMethod.name}
              />
              <FormControlLabel
                control={
                  <Checkbox checked={paymentMethod.active} onChange={e => handleInput('active', e, idx, true)} />
                }
                label='Método Ativo'
              />
            </Paper>
          </Grid>
        ))}
      <Grid item xs={12} sm={6} md={4} lg={3} className={classes.card}>
        <Paper className={classes.paperNew} onClick={() => handleNewPaymentMethod()}>
          <AddCircleOutline className={classes.icon} />

          <Typography variant='h2' className={classes.text}>
            Novo Método de Pagamento
          </Typography>
        </Paper>
      </Grid>
      <Grid container justifyContent={'flex-end'} spacing={2} className={classes.submitButton}>
        <Grid item>
          <Button type='submit' variant='contained' color='primary' form='paymentMethodList'>
            Salvar
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default PaymentMethodsComponent;
