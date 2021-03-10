import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { Container, Divider, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      padding: 0,
      // backgroundColor: theme.palette.background.paper,
      height: 'calc(100vh - 220px)',
      borderRadius: 4,
      boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
    },
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
    listItemBlock: {},
  })
);

const alunos = [
  {
    id: 1,
    name: 'Matheus Bao de Oliveira Cintra',
    nascimento: '14/05/1996',
    plano: 'MENSAL',
    status: 'ATIVO',
    telefone: '(19) 9 8172-0118',
    email: 'matheus_cintra@hotmail.com',
  },
  {
    id: 2,
    name: 'Matheus Bao de Oliveira Cintra',
    nascimento: '14/05/1996',
    plano: 'MENSAL',
    status: 'ATIVO',
    telefone: '(19) 9 8172-0118',
    email: 'matheus_cintra@hotmail.com',
  },
  {
    id: 3,
    name: 'Matheus Bao de Oliveira Cintra',
    nascimento: '14/05/1996',
    plano: 'MENSAL',
    status: 'ATIVO',
    telefone: '(19) 9 8172-0118',
    // email: 'matheus_cintra@hotmail.com',
  },
  {
    id: 4,
    name: 'Matheus Bao de Oliveira Cintra',
    nascimento: '14/05/1996',
    plano: 'MENSAL',
    status: 'ATIVO',
    telefone: '(19) 9 8172-0118',
    email: 'matheus_cintra@hotmail.com',
  },
  {
    id: 5,
    name: 'Matheus Bao de Oliveira Cintra',
    nascimento: '14/05/1996',
    plano: 'MENSAL',
    status: 'ATIVO',
    telefone: '(19) 9 8172-0118',
    // email: 'matheus_cintra@hotmail.com',
  },
];

const MembersList: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();

  const handleNavigate = (memberId: any) => {
    return history.push(`members/${memberId}`);
  };

  return (
    <Container maxWidth='lg' className={classes.rootContainer}>
      <div className={classes.titleComponent}>
        <Typography variant='h5' className={classes.title}>
          Listagem de Alunos
        </Typography>
        <Typography variant='subtitle1' className={classes.typographySubtitle}>
          Mecca Gym
        </Typography>
      </div>
      <List className={classes.root}>
        {alunos.map(aluno => {
          return (
            <React.Fragment key={aluno.id}>
              <ListItem button onClick={() => handleNavigate(aluno.id)}>
                <ListItemAvatar>
                  <Avatar alt={aluno.name.charAt(0)} src={`/static/images/avatar/${aluno.name + 1}.jpg`} />
                </ListItemAvatar>
                <div className={classes.listItemBlock}>
                  <ListItemText id={aluno.name} primary={aluno.name} />
                  <ListItemText id={aluno.name} secondary={aluno.email ? aluno.email : aluno.telefone} />
                </div>
              </ListItem>
              <Divider />
            </React.Fragment>
          );
        })}
      </List>
    </Container>
  );
};
export default MembersList;