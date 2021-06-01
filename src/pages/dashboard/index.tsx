import React, { useEffect, useState } from 'react';
import { Card, CardContent, Container, Typography } from '@material-ui/core';
import { AccountBalance, AccountCircle, Receipt } from '@material-ui/icons';
import useStyles from './styles';
import { api } from '../../services/api';

// const handleRowSelect = (param: any) => {
//   console.warn('params > ', param);
//   /*
//    *   - Clicar na row ira ativar um useState pra salvar ou remover a row do estado.
//    *   - Se houver 1 ou mais registro no estado exibe botão de notificação
//    *   - Ao clicar no botão de noticiação, enviar email para todos os alunos
//    *  */
// };

const DashboardComponent: React.FC = () => {
  const classes = useStyles();
  // const [members, setMembers] = useState([]);
  // const [loading, setIsLoading] = useState(false);

  // const retrieveMembers = async (): Promise<void> => {
  //   const result = await api.get('/members/list');

  //   // const members = result.data.map((member: any) => {
  //   //   return {
  //   //     ...member,
  //   //     id: member._id
  //   //       .toString()
  //   //       .slice(member._id.length - 5, member._id.length)
  //   //       .toUpperCase(),
  //   //   };
  //   // });

  //   setMembers(members);
  //   setIsLoading(false);
  // };

  // useEffect(() => {
  //   setIsLoading(true);
  //   retrieveMembers();
  // }, []);

  return (
    <Container maxWidth='lg' className={classes.rootContainer}>
      <div>
        <Typography variant='h5' className={classes.title}>
          Dashboard
        </Typography>
        <Typography variant='subtitle1' className={classes.typographySubtitle}>
          Mecca Gym
        </Typography>
      </div>

      <Container className={classes.cardContainer}>
        <Card className={classes.root}>
          <CardContent className={classes.cardContent}>
            <AccountCircle fontSize={'large'} />
            <div className={classes.typographyContent}>
              <Typography variant='h5' component='h2'>
                154
              </Typography>
              <Typography variant='subtitle2' className={classes.typographySubtitle}>
                Alunos Matriculados
              </Typography>
            </div>
          </CardContent>
        </Card>

        <Card className={classes.root}>
          <CardContent className={classes.cardContent}>
            <Receipt fontSize={'large'} />
            <div className={classes.typographyContent}>
              <Typography variant='h5' component='h2'>
                32
              </Typography>
              <Typography variant='subtitle2' className={classes.typographySubtitle}>
                Mensalidades Atrasadas
              </Typography>
            </div>
          </CardContent>
        </Card>

        <Card className={classes.root}>
          <CardContent className={classes.cardContent}>
            <AccountBalance fontSize={'large'} />
            <div className={classes.typographyContent}>
              <Typography variant='h5' component='h2'>
                R$ 9.854.32
              </Typography>
              <Typography variant='subtitle2' className={classes.typographySubtitle}>
                Faturamento Previsto
              </Typography>
            </div>
          </CardContent>
        </Card>
      </Container>
      {/* <Divider />
      <div className={classes.titleComponent}>
        <Typography variant='h5' className={classes.title}>
          Próximos 10 vencimentos
        </Typography>
      </div>

      <Paper style={{ height: 400, width: '100%' }}>
        <PerfectScrollbar options={{ suppressScrollX: true }}>
          <DataGrid
            density={'comfortable'}
            rows={members}
            loading={loading}
            columns={headers}
            pageSize={10}
            autoHeight={true}
            checkboxSelection
            hideFooterRowCount
            hideFooterPagination
            disableSelectionOnClick
            hideFooter
            hideFooterSelectedRowCount
            onRowSelected={param => handleRowSelect(param)}
          />
        </PerfectScrollbar>
      </Paper> */}
    </Container>
  );
};

export default DashboardComponent;
