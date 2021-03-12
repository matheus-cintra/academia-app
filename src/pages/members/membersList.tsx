import React, { useEffect, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import {
  CircularProgress,
  Container,
  Divider,
  IconButton,
  Paper,
  TablePagination,
  Typography,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import NoRegisterComponent from '../../components/NoRegister';
import { api } from '../../services/api';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      // padding: '0 0 24px',
      // backgroundColor: theme.palette.background.paper,
      // height: 'calc(100vh - 220px)',
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
    headerComponent: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    actionsComponent: {
      padding: theme.spacing(0, 3),
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontSize: 24,
      fontWeight: 600,
    },
    typographySubtitle: {
      color: '#A6ACBE',
    },
    listItemBlock: {},
    paperLoading: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
    },
  })
);

const MembersList: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [members, setMembers] = useState<any>([]);

  async function getMemberList() {
    try {
      const result = await api.get('/members/list');
      setMembers(result.data);
    } catch (error) {
      console.warn('erro > ', error.response);
    }
  }

  useEffect(() => {
    setIsLoading(true);
    getMemberList().then(() => {
      setIsLoading(false);
    });
  }, []);

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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
        {isLoading ? (
          <Paper elevation={3} className={classes.paperLoading}>
            <CircularProgress />
          </Paper>
        ) : members.length > 0 ? (
          members.map((member: any) => {
            return (
              <div key={member._id}>
                <ListItem button onClick={() => handleNavigate(member._id)}>
                  <ListItemAvatar>
                    <Avatar alt={member.name.charAt(0)} src={`/static/images/avatar/${member.name + 1}.jpg`} />
                  </ListItemAvatar>
                  <div className={classes.listItemBlock}>
                    <ListItemText id={member.name} primary={member.name} />
                    <ListItemText id={member.name} secondary={member.email ? member.email : member.telefone} />
                  </div>
                </ListItem>
                <Divider />
              </div>
            );
          })
        ) : (
          <NoRegisterComponent />
        )}
      </List>
      <TablePagination
        component='div'
        count={100}
        page={page}
        onChangePage={handleChangePage}
        rowsPerPage={rowsPerPage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Container>
  );
};
export default MembersList;
