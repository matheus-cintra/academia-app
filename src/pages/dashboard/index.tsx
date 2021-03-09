import { Card, CardContent, Container, Divider, Typography } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AccountCircle } from '@material-ui/icons';
import ReceiptIcon from '@material-ui/icons/Receipt';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import { DataGrid, GridCellParams, GridColDef } from '@material-ui/data-grid';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';
import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar';

const useStyles = makeStyles(theme => {
  return {
    rootContainer: {
      height: 'calc(100vh - 64px)',
      '& .hideHeaderClass': {
        [theme.breakpoints.down('xs')]: {
          display: 'none',
        },
      },
      '& .hideCellClass': {
        [theme.breakpoints.down('xs')]: {
          display: 'none',
        },
      },
      '& .headerClass': {
        [theme.breakpoints.down('md')]: {
          minWidth: '100px!important',
          maxWidth: '100px!important',
        },
      },
      '& .cellClass': {
        [theme.breakpoints.down('md')]: {
          minWidth: '100px!important',
          maxWidth: '100px!important',
        },
      },
      '& .MuiDataGrid-colCellTitle': {
        fontWeight: 600,
      },
      '& .MuiDataGrid-window': {
        overflowX: 'hidden',
      },
    },
    root: {
      display: 'flex',
      minWidth: 275,
      height: 120,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 24,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 24,
      fontWeight: 600,
    },
    pos: {
      marginBottom: 12,
    },
    cardContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      margin: '32px 0',

      [theme.breakpoints.down('md')]: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      },
      [theme.breakpoints.up('sm')]: {
        justifyContent: 'space-between',
        flexDirection: 'row',
      },
    },
    cardContent: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    typographyContent: {
      padding: 24,
    },
    typographySubtitle: {
      color: '#A6ACBE',
    },
    titleComponent: {
      padding: 12,
    },
    membersList: {
      flexDirection: 'column',
    },
  };
});

const headers: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70, headerClassName: 'hideHeaderClass', cellClassName: 'hideCellClass' },
  {
    field: 'name',
    headerName: 'Nome',
    width: 200,
    flex: 1,
    headerClassName: 'headerClass',
    cellClassName: 'cellClass',
  },
  {
    field: 'plano',
    headerName: 'Plano',
    width: 100,
    flex: 1,
    headerClassName: 'hideHeaderClass',
    cellClassName: 'hideCellClass',
  },
  {
    field: 'valor',
    headerName: 'Valor',
    width: 100,
    flex: 1,
    headerClassName: 'headerClass',
    cellClassName: 'cellClass',
  },
  {
    field: 'vencimento',
    headerName: 'Vencimento',
    width: 130,
    flex: 1,
    headerClassName: 'hideHeaderClass',
    cellClassName: 'hideCellClass',
  },
  {
    field: 'status',
    headerName: 'Status',
    flex: 1,
    headerClassName: 'headerClass',
    cellClassName: 'cellClass',
    renderCell: (params: GridCellParams) =>
      params.value === 'PAID' ? (
        <>
          <CheckCircleIcon color={'primary'} style={{ width: '1em' }} />
        </>
      ) : (
        <>
          <IndeterminateCheckBoxIcon color={'error'} style={{ width: '1em' }} />
        </>
      ),
  },
];

const alunos: any[] = [
  {
    id: 1,
    name: 'Matheus Cintra',
    plano: 'Mensal',
    valor: 'R$75,00',
    vencimento: '13/03/2021',
    status: 'PENDING',
  },
  {
    id: 2,
    name: 'Jean Sido',
    plano: 'Mensal',
    valor: 'R$75,00',
    vencimento: '02/03/2021',
    status: 'PAID',
  },
  {
    id: 3,
    name: 'Marcio Junior',
    plano: 'Trimestral',
    valor: 'R$180,00',
    vencimento: '09/03/2021',
    status: 'PENDING',
  },
  {
    id: 4,
    name: 'Murilo Rabelo',
    plano: 'Mensal',
    valor: 'R$75,00',
    vencimento: '05/03/2021',
    status: 'PAID',
  },
  {
    id: 5,
    name: 'Lucas Romão',
    plano: 'Mensal',
    valor: 'R$75,00',
    vencimento: '12/03/2021',
    status: 'PENDING',
  },
  {
    id: 6,
    name: 'Matheus Cintra',
    plano: 'Mensal',
    valor: 'R$75,00',
    vencimento: '13/03/2021',
    status: 'PENDING',
  },
  {
    id: 7,
    name: 'Jean Sido',
    plano: 'Mensal',
    valor: 'R$75,00',
    vencimento: '02/03/2021',
    status: 'PAID',
  },
  {
    id: 8,
    name: 'Marcio Junior',
    plano: 'Trimestral',
    valor: 'R$180,00',
    vencimento: '09/03/2021',
    status: 'PENDING',
  },
  {
    id: 9,
    name: 'Murilo Rabelo',
    plano: 'Mensal',
    valor: 'R$75,00',
    vencimento: '05/03/2021',
    status: 'PAID',
  },
  {
    id: 10,
    name: 'Lucas Romão',
    plano: 'Mensal',
    valor: 'R$75,00',
    vencimento: '12/03/2021',
    status: 'PENDING',
  },
];

const handleRowSelect = (param: any) => {
  console.warn('params > ', param);
  /*
   *   - Clicar na row ira ativar um useState pra salvar ou remover a row do estado.
   *   - Se houver 1 ou mais registro no estado exibe botão de notificação
   *   - Ao clicar no botão de noticiação, enviar email para todos os alunos
   *  */
};

const DashboardComponent: React.FC = () => {
  const classes = useStyles();

  return (
    <Container maxWidth='lg' className={classes.rootContainer}>
      <div className={classes.titleComponent}>
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
            <ReceiptIcon fontSize={'large'} />
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
            <AccountBalanceIcon fontSize={'large'} />
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
      <Divider />
      <div className={classes.titleComponent}>
        <Typography variant='h5' className={classes.title}>
          Próximos 10 vencimentos
        </Typography>
      </div>

      <div style={{ height: 400, width: '100%', paddingBottom: '32px' }}>
        <PerfectScrollbar options={{ suppressScrollX: true }}>
          <DataGrid
            density={'comfortable'}
            rows={alunos}
            columns={headers}
            pageSize={10}
            autoHeight={true}
            checkboxSelection
            hideFooterRowCount
            hideFooterPagination
            hideFooter
            hideFooterSelectedRowCount
            onRowSelected={param => handleRowSelect(param)}
          />
        </PerfectScrollbar>
      </div>
    </Container>
  );
};

export default DashboardComponent;
