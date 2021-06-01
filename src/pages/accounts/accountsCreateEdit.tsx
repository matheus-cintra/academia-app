import React, { useEffect, useState } from 'react';
import {
  Button,
  CircularProgress,
  Container,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from '@material-ui/core';
import { useFormik } from 'formik';
import { api } from '../../services/api';
import { getData } from '../../common/dbMethods';
import { toast } from 'react-toastify';
import { useStylesCreateEditPage } from './styles';
import { decorateAccount } from './decorator';
import { useHistory } from 'react-router-dom';
import * as yup from 'yup';
import { useAuth } from '../../contexts/auth';

const AccountsCreateEdit: React.FC = () => {
  const classes = useStylesCreateEditPage();
  const { ReRender } = useAuth();
  const [account, setAccount] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);
  const user: any = localStorage.getItem('@App:user');
  const history = useHistory();

  const validationSchema = yup.object().shape(
    {
      name: yup.string().required('Nome é obrigatório'),
      email: yup
        .string()
        .email('Email Inválido')
        .when('phone', {
          is: (phone: string) => !phone || phone.length === 0,
          then: yup.string().email('Email Inválido').required('Email Obrigatório'),
          otherwise: yup.string(),
        }),
      phone: yup.string().when('email', {
        is: (email: string) => !email || email.length === 0,
        then: yup.string().required('Telefone Obrigatório'),
        otherwise: yup.string(),
      }),
      birthDate: yup.string(),
      document: yup.string().required('Documento é obrigatório'),
      genre: yup.string(),
      gymName: yup.string().required('Nome da academia é obrigatório'),
    },
    [['email', 'phone']]
  );

  async function handleGetAccount() {
    const account = await getData('accounts');
    decorateAccount(account.data, formik.initialValues);
    if (account.status === 200) {
      setAccount(account.data);
      await formik.setValues(account.data);
    }
  }

  useEffect(() => {
    setIsLoading(true);
    handleGetAccount().then(() => {
      setIsLoading(false);
    });
  }, []);

  const formik = useFormik({
    initialValues: {
      name: '',
      birthDate: '',
      genre: '',
      document: '',
      email: '',
      phone: '',
      gymName: '',
    },
    validationSchema: validationSchema,
    onSubmit: values => handleSubmit(values),
  });

  const handleSubmit = async (values: any) => {
    try {
      const data: any = {};
      Object.assign(values, { subscriptionId: JSON.parse(user)._id });

      for (const value in values) {
        data[value] = values[value] !== '' ? values[value] : undefined;
      }

      const result = await api.put(`/accounts/update-account`, { ...data });

      localStorage.setItem('@App:user', JSON.stringify(result.data));
      await handleGetAccount();
      ReRender();

      toast.success('Registro Alterado');
    } catch (e) {
      toast.success(e.response.data.message);
    }
  };

  const handleNavigate = () => {
    return history.push('/accounts');
  };

  return (
    <Container maxWidth='lg' className={classes.rootContainer}>
      <div className={classes.titleComponent}>
        <Typography variant='h5' className={classes.title}>
          Gerenciamento de Perfil
        </Typography>
        <Typography variant='subtitle1' className={classes.typographySubtitle}>
          {account.gymName}
        </Typography>
      </div>

      {isLoading ? (
        <Paper elevation={3} className={classes.paperLoading}>
          <CircularProgress />
        </Paper>
      ) : (
        <Paper elevation={3}>
          <form
            className={classes.form}
            id='createAccount'
            name='createAccount'
            onSubmit={formik.handleSubmit}
            noValidate
          >
            <Typography variant='h5' className={classes.titleInsideForm}>
              Dados Básicos
            </Typography>
            <Grid container spacing={2} style={{ marginTop: 24 }}>
              <Grid item xs={12} sm={12} md={8}>
                <TextField
                  variant='outlined'
                  fullWidth
                  required
                  id='name'
                  name='name'
                  label='Nome do Gerente da Academia'
                  type='text'
                  autoComplete='name'
                  autoFocus
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                <TextField
                  InputLabelProps={{ shrink: true }}
                  variant='outlined'
                  fullWidth
                  id='birthDate'
                  name='birthDate'
                  label='Nascimento'
                  type='date'
                  autoComplete='birthDate'
                  value={formik.values.birthDate}
                  onChange={formik.handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                <FormControl variant='outlined' className={classes.formControl}>
                  <InputLabel id='genreSelectLabel'>Sexo</InputLabel>
                  <Select
                    labelId='genreSelectLabel'
                    id='genreSelect'
                    value={formik.values.genre || ''}
                    onChange={e => e.target.value !== undefined && formik.setFieldValue('genre', e.target.value)}
                    label='Sexo'
                  >
                    <MenuItem value={'M'}>Masculino</MenuItem>
                    <MenuItem value={'F'}>Feminino</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  variant='outlined'
                  fullWidth
                  required
                  id='document'
                  name='document'
                  label='CPF'
                  type='text'
                  autoComplete='document'
                  value={formik.values.document}
                  onChange={formik.handleChange}
                  error={formik.touched.document && Boolean(formik.errors.document)}
                  helperText={formik.touched.document && formik.errors.document}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  variant='outlined'
                  fullWidth
                  required
                  id='email'
                  name='email'
                  label='E-mail'
                  type='email'
                  autoComplete='email'
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  variant='outlined'
                  fullWidth
                  required
                  id='phone'
                  name='phone'
                  label='Telefone'
                  type='phone'
                  autoComplete='phone'
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  error={formik.touched.phone && Boolean(formik.errors.phone)}
                  helperText={formik.touched.phone && formik.errors.phone}
                />
              </Grid>
            </Grid>
            <Divider className={classes.divider} />
            <Typography variant='h5' className={classes.titleInsideForm}>
              Dados da Academia
            </Typography>
            <Grid container spacing={2} style={{ marginTop: 24 }}>
              <Grid item xs={12} sm={4}>
                <TextField
                  variant='outlined'
                  fullWidth
                  required
                  id='gymName'
                  name='gymName'
                  label='Nome da Academia'
                  type='text'
                  autoComplete='gymName'
                  value={formik.values.gymName}
                  onChange={formik.handleChange}
                  error={formik.touched.gymName && Boolean(formik.errors.gymName)}
                  helperText={formik.touched.gymName && formik.errors.gymName}
                />
              </Grid>
            </Grid>
            <Grid container justify={'flex-end'} spacing={2} style={{ paddingTop: 24 }}>
              <Grid item>
                <Button type='submit' variant='contained' color='primary'>
                  Salvar
                </Button>
              </Grid>
              <Grid item>
                <Button variant='contained' color='secondary' onClick={handleNavigate}>
                  Cancelar
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      )}
    </Container>
  );
};
export default AccountsCreateEdit;
