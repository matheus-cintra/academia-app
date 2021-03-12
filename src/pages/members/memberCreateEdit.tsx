import React, { useEffect, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
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
import { format, parseISO, endOfDay, addHours } from 'date-fns';
import { toast } from 'react-toastify';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    rootContainer: {
      height: 'calc(100vh - 64px)',
      padding: theme.spacing(4),
      '& .MuiSelect-select:focus': {
        backgroundColor: '#FFF!important',
      },
    },
    titleComponent: {
      padding: '16px 0',
    },
    title: {
      fontSize: 24,
      fontWeight: 600,
    },
    titleInsideForm: {
      fontSize: 16,
      fontWeight: 600,
      color: '#A99E9E',
      marginBottom: 12,
      marginTop: 12,
    },
    typographySubtitle: {
      color: '#A6ACBE',
      marginBottom: 12,
    },
    form: {
      padding: theme.spacing(4),
    },
    row: {
      display: 'flex',
      justifyContent: 'center',
    },
    mLeft: {
      marginLeft: 5,
    },
    mRight: {
      marginRight: 5,
    },
    divider: {
      margin: '24px 0',
    },
    paperLoading: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '300px',
    },
    formControl: {
      width: '100%',
    },
  })
);

const MembersCreateEdit: React.FC = (props: any) => {
  const classes = useStyles();
  const [member, setMember] = useState({});
  const [settings, setSettings] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);
  const user: any = localStorage.getItem('@App:user');
  let memberId = props.match.params.id !== 'new' ? props.match.params.id : undefined;

  async function handleGetMember() {
    const settings: any = localStorage.getItem('@App:settings');

    setSettings(JSON.parse(settings));

    if (memberId) {
      const result = await api.get(`/members/${memberId}`);
      result.data.birthDate = format(endOfDay(parseISO(result.data.birthDate)), 'yyyy-MM-dd');
      if (member) {
        setMember(member);
        await formik.setValues({ ...result.data });
      }
    }
  }

  useEffect(() => {
    setIsLoading(true);
    handleGetMember().then(() => {
      setIsLoading(false);
    });
  }, []);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      birthDate: '',
      document: '',
      genre: '',
      dueDay: '',
      paymentMethodId: '',
      membershipMethodId: '',
    },
    // validationSchema: validationSchema,
    onSubmit: values => handleSubmit(values),
  });

  const handleSubmit = async (values: any) => {
    try {
      Object.assign(values, {
        subscriptionId: JSON.parse(user)._id,
        birthDate: addHours(parseISO(values.birthDate), 6),
      });
      const result = memberId
        ? await api.put(`/members/update-member/${memberId}`, { ...values })
        : await api.post('/members/create', { ...values });

      result.data.birthDate = format(endOfDay(parseISO(result.data.birthDate)), 'yyyy-MM-dd');
      formik.values.birthDate = result.data.birthDate;

      memberId ? toast.success('Atualizado com sucesso') : toast.success('Criado com sucesso');

      if (!memberId) {
        console.warn('entrou aqui...');

        history.replaceState({}, '', result.data._id);
        memberId = result.data._id;
      }
    } catch (e) {
      toast.error(e.response.data.message[0]);
      console.warn('e > ', e.response);
    }
  };

  return (
    <Container maxWidth='lg' className={classes.rootContainer}>
      <div className={classes.titleComponent}>
        <Typography variant='h5' className={classes.title}>
          Criação de Alunos
        </Typography>
        <Typography variant='subtitle1' className={classes.typographySubtitle}>
          Mecca Gym
        </Typography>
      </div>
      {isLoading ? (
        <Paper elevation={3} className={classes.paperLoading}>
          <CircularProgress />
        </Paper>
      ) : (
        <Paper elevation={3}>
          <form className={classes.form} id='loginForm' name='loginForm' onSubmit={formik.handleSubmit} noValidate>
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
                  label='Nome do Aluno'
                  type='text'
                  autoComplete='name'
                  autoFocus
                  value={formik.values.name}
                  onChange={formik.handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                <TextField
                  InputLabelProps={{ shrink: true }}
                  variant='outlined'
                  fullWidth
                  required
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
                  <InputLabel id='demo-simple-select-outlined-label'>Sexo</InputLabel>
                  <Select
                    labelId='demo-simple-select-outlined-label'
                    id='demo-simple-select-outlined'
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
                />
              </Grid>
            </Grid>
            <Divider className={classes.divider} />
            <Typography variant='h5' className={classes.titleInsideForm}>
              Financeiro
            </Typography>
            <Grid container spacing={2} style={{ marginTop: 24 }}>
              <Grid item xs={12} md={4}>
                <FormControl variant='outlined' className={classes.formControl}>
                  <InputLabel id='demo-simple-select-outlined-label'>Forma de Pagamento</InputLabel>
                  <Select
                    labelId='demo-simple-select-outlined-label'
                    id='demo-simple-select-outlined'
                    value={formik.values.paymentMethodId || ''}
                    onChange={e =>
                      e.target.value !== undefined && formik.setFieldValue('paymentMethodId', e.target.value)
                    }
                    label='Forma de Pagamento'
                  >
                    {settings &&
                      settings.paymentMethods &&
                      settings.paymentMethods.map((paymentMethod: any) => (
                        <MenuItem key={paymentMethod._id} value={paymentMethod._id}>
                          {paymentMethod.name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl variant='outlined' className={classes.formControl}>
                  <InputLabel id='demo-simple-select-outlined-label'>Plano Escolhido</InputLabel>
                  <Select
                    labelId='demo-simple-select-outlined-label'
                    id='demo-simple-select-outlined'
                    value={formik.values.membershipMethodId || ''}
                    onChange={e => {
                      console.warn('e > ', e);
                      e.target.value !== undefined && formik.setFieldValue('membershipMethodId', e.target.value);
                    }}
                    label='Plano Escolhido'
                  >
                    {settings &&
                      settings.membershipTypes &&
                      settings.membershipTypes.map((membershipType: any) => (
                        <MenuItem key={membershipType._id} value={membershipType._id}>
                          {membershipType.name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  variant='outlined'
                  fullWidth
                  required
                  id='dueDay'
                  name='dueDay'
                  label='Dia de Vencimento'
                  type='dueDay'
                  autoComplete='dueDay'
                  value={formik.values.dueDay}
                  onChange={formik.handleChange}
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
                <Button variant='contained' color='secondary'>
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
export default MembersCreateEdit;
