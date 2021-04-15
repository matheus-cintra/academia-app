import React, { useEffect, useState } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { Container, Divider, IconButton, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import NoRegisterComponent from '../../components/NoRegister';
import { getData } from '../../common/dbMethods';
import { useStylesListPage } from './styles';

const MembersList: React.FC = () => {
  const classes = useStylesListPage();
  const history = useHistory();
  const [alunos, setAlunos] = useState<any>([]);

  const getMembers = async () => {
    const result = await getData('/members/list');
    setAlunos(result.data);
  };

  useEffect(() => {
    getMembers();
  }, []);

  const handleNavigate = (memberId?: string) => {
    return history.push(`members/${memberId ? memberId : 'new'}`);
  };

  return (
    <Container maxWidth='lg' className={classes.rootContainer}>
      <div className={classes.headerComponent}>
        <div className={classes.titleComponent}>
          <Typography variant='h5' className={classes.title}>
            Listagem de Alunos
          </Typography>
          <Typography variant='subtitle1' className={classes.typographySubtitle}>
            Mecca Gym
          </Typography>
        </div>
        <div className={classes.actionsComponent}>
          <IconButton color='primary' aria-label='add member' component='div' onClick={() => handleNavigate()}>
            <AddCircleIcon fontSize='large' />
          </IconButton>
        </div>
      </div>
      <List className={classes.root}>
        {alunos.length > 0 ? (
          alunos.map((aluno: any) => {
            return (
              <React.Fragment key={aluno._id}>
                <ListItem button onClick={() => handleNavigate(aluno._id)}>
                  <ListItemAvatar>
                    <Avatar alt={aluno.name.charAt(0)} src={`/static/images/avatar/${aluno.name + 1}.jpg`} />
                  </ListItemAvatar>
                  <div className={classes.listItemBlock}>
                    <ListItemText id={aluno.name} primary={aluno.name} />
                    <ListItemText id={aluno.name} secondary={aluno.email ? aluno.email : aluno.phone} />
                  </div>
                </ListItem>
                <Divider />
              </React.Fragment>
            );
          })
        ) : (
          <NoRegisterComponent />
        )}
      </List>
    </Container>
  );
};
export default MembersList;
