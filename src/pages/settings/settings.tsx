import { Accordion, AccordionSummary, Typography, AccordionDetails, Container, Divider } from '@material-ui/core';
import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useStylesSettingsPage } from './styles';
import PlansComponent from '../../components/Plans';
import * as yup from 'yup';
import { api } from '../../services/api';
import { toast } from 'react-toastify';

const SystemSettings: React.FC = () => {
  const classes = useStylesSettingsPage();
  const [expanded, setExpanded] = React.useState<any>(false);

  const validationNewPlanSchema = yup.array().of(
    yup.object().shape({
      name: yup.string().required('Nome do Plano obrigatório'),
      value: yup.string().required('Preço obrigatório'),
      dueDate: yup
        .number()
        .min(1, 'Deve ser entre 1 e 31')
        .max(31, 'Deve ser entre 1 e 31')
        .required('Campo obrigatório'),
    })
  );

  const handleChange = (panel: any) => (event: any, isExpanded: any) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    handleChange('panel1');
  }, []);

  const handleSubmit = async (values: any): Promise<any> => {
    try {
      const toUpdate = values.plans.filter((item: any) => item._id);
      const toCreate = values.plans.filter((item: any) => !item._id);
      await api.post('plans/create', toCreate);
      await api.put('plans', toUpdate);
      return toast.success('Configurações de Plano Atualizadas.');
    } catch (error) {
      return toast.error('Erro ao atualizar as Configurações de Plano.');
    }
  };

  const formikPlans = useFormik({
    initialValues: {
      plans: [],
    },
    validationSchema: validationNewPlanSchema,
    onSubmit: async values => await handleSubmit(values),
  });

  return (
    <Container maxWidth='lg' className={classes.rootContainer}>
      <div className={classes.headerComponent}>
        <div className={classes.titleComponent}>
          <Typography variant='h5' className={classes.title}>
            Configurações do Sistema
          </Typography>
          <Typography variant='subtitle1' className={classes.typographySubtitle}>
            Mecca Gym
          </Typography>
        </div>
      </div>
      <div className={classes.root}>
        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls='panel1bh-content' id='panel1bh-header'>
            <Typography className={classes.heading}>Planos</Typography>
          </AccordionSummary>
          <Divider style={{ height: '2px' }} />
          <AccordionDetails style={{ justifyContent: 'center', padding: 30 }}>
            <PlansComponent formik={formikPlans} />
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls='panel2bh-content' id='panel2bh-header'>
            <Typography className={classes.heading}>Formas De Pagamento</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Texto escrito Adicionar Nova Forma de Pagamento onde sera adicionada uma nova linha e adicionar ao array
              para salvar
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls='panel3bh-content' id='panel3bh-header'>
            <Typography className={classes.heading}>Notificações</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>Informações sobre cron disponiveis para ativar/desativar (apenas email de atraso)</Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    </Container>
  );
};

export default SystemSettings;
