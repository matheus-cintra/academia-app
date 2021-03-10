import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Container, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    rootContainer: {
      height: 'calc(100vh - 64px)',
      padding: theme.spacing(4),
    },
    titleComponent: {
      padding: '16px 0',
    },
    title: {
      fontSize: 24,
      fontWeight: 600,
    },
    typographySubtitle: {
      color: '#A6ACBE',
    },
  })
);

const MembersCreateEdit: React.FC = (props: any) => {
  const classes = useStyles();

  return (
    <Container maxWidth='lg' className={classes.rootContainer}>
      <div className={classes.titleComponent}>
        <Typography variant='h5' className={classes.title}>
          Criação de Alunos
        </Typography>
        <Typography variant='subtitle1' className={classes.typographySubtitle}>
          Mecca Gym
        </Typography>
        <h1>ALUNO {props.match.params.id}</h1>
      </div>
    </Container>
  );
};
export default MembersCreateEdit;
