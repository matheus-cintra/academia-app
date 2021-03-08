import { Card, CardContent, Container, Typography } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AccountCircle } from '@material-ui/icons';
import ReceiptIcon from '@material-ui/icons/Receipt';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';

const useStyles = makeStyles(theme => {
  console.warn('theme > ', theme);
  return {
    root: {
      display: 'flex',
      minWidth: 275,
      height: 120,
      justifyContent: 'center',
      alignItems: 'center',
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
    cardContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      margin: '32px 0',

      [theme.breakpoints.down('sm')]: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      },
      [theme.breakpoints.up('md')]: {
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
  };
});

const DashboardComponent: React.FC = () => {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Container maxWidth='lg' style={{ border: '1px solid red' }}>
      <Typography variant='h5'>Dashboard</Typography>
      <Typography variant='subtitle1'>Mecca Gym</Typography>

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
    </Container>
  );
};

export default DashboardComponent;
