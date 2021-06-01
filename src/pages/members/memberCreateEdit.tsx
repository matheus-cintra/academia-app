import React, { useEffect, useState } from 'react';
import {
  Button,
  CircularProgress,
  Container,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from '@material-ui/core';
import { useFormik } from 'formik';
import { api } from '../../services/api';
import { getDataById } from '../../common/dbMethods';
import { toast } from 'react-toastify';
import { useStylesCreateEditPage } from './styles';
import { decorateMember } from './decorator';
import { useHistory } from 'react-router-dom';
import * as yup from 'yup';
import { ArrowBack } from '@material-ui/icons';

const MembersCreateEdit: React.FC = (props: any) => {
  const classes = useStylesCreateEditPage();
  const [member, setMember] = useState<any>({});
  const [plans, setPlans] = useState<any[]>([]);
  const [paymentMethods, setPaymentMethods] = useState<any[]>([]);
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
      dueDay: yup.string().required('Data de Vencimento é obrigatório'),
      paymentMethodId: yup.string().required('Modo de Pagamento é obrigatório'),
      planId: yup.string().required('Tipo de Plano é obrigatório'),
    },
    [['email', 'phone']]
  );

  async function handleGetMember() {
    const memberId = props.match.params.id;
    const plans = await api.get('/plans/list');
    const paymentMethods = await api.get('payment-methods/list');

    setPlans(plans.data);
    setPaymentMethods(paymentMethods.data);

    if (memberId !== 'new') {
      const member = await getDataById('members', memberId);
      decorateMember(member.data[0]);
      if (member.status === 200) {
        setMember(member.data);
        await formik.setValues({ ...member.data[0] });
      }
    }
  }

  useEffect(() => {
    setIsLoading(true);
    handleGetMember().then(() => {
      setIsLoading(false);
    });
  }, [props]);

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
      planId: '',
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

      member._id
        ? await api.put(`/members/${member._id}`, { ...data })
        : await api.post('/members/create', { ...data });

      member._id ? toast.success('Registro Alterado') : toast.success('Registro Criado');

      if (!member._id) {
        history.push('/members');
      }
    } catch (e) {
      toast.success(e.response.data.message);
    }
  };

  const handleNavigate = () => {
    return history.push('/members');
  };

  return (
    <Container maxWidth='lg' className={classes.rootContainer}>
      <div className={classes.titleComponent}>
        <div className={classes.titleContent}>
          <IconButton
            aria-label='account of current user'
            aria-controls='menu-appbar'
            aria-haspopup='true'
            onClick={handleNavigate}
            color='inherit'
          >
            <ArrowBack style={{ fontSize: 32 }} />
          </IconButton>
          <Typography variant='h5' className={classes.title}>
            Criação de Alunos
          </Typography>
        </div>
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
          <form
            className={classes.form}
            id='createMember'
            name='createMember'
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
                  label='Nome do Aluno'
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
              Financeiro
            </Typography>
            <Grid container spacing={2} style={{ marginTop: 24 }}>
              <Grid item xs={12} md={4}>
                <FormControl variant='outlined' className={classes.formControl}>
                  <InputLabel id='paymentMethodSelectLabel'>Forma de Pagamento</InputLabel>
                  <Select
                    labelId='paymentMethodSelectLabel'
                    id='paymentMethodSelect'
                    value={formik.values.paymentMethodId || ''}
                    onChange={e =>
                      e.target.value !== undefined && formik.setFieldValue('paymentMethodId', e.target.value)
                    }
                    label='Forma de Pagamento'
                  >
                    {paymentMethods &&
                      paymentMethods.map((paymentMethod: any) => (
                        <MenuItem key={paymentMethod._id} value={paymentMethod._id}>
                          {paymentMethod.name}
                        </MenuItem>
                      ))}
                  </Select>
                  {formik.touched.paymentMethodId && Boolean(formik.errors.paymentMethodId) && (
                    <FormHelperText error>{formik.errors.paymentMethodId}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl variant='outlined' className={classes.formControl}>
                  <InputLabel id='membershipMethodSelectLabel'>Plano Escolhido</InputLabel>
                  <Select
                    labelId='membershipMethodSelectLabel'
                    id='membershipMethodSelect'
                    value={formik.values.planId || ''}
                    onChange={e => {
                      e.target.value !== undefined && formik.setFieldValue('planId', e.target.value);
                    }}
                    label='Plano Escolhido'
                  >
                    {plans &&
                      plans.map((membershipType: any) => (
                        <MenuItem key={membershipType._id} value={membershipType._id}>
                          {membershipType.name}
                        </MenuItem>
                      ))}
                  </Select>
                  {formik.touched.planId && Boolean(formik.errors.planId) && (
                    <FormHelperText error>{formik.errors.planId}</FormHelperText>
                  )}
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
export default MembersCreateEdit;
