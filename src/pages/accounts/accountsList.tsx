import React, { useEffect, useState } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import {
  Box,
  CircularProgress,
  Container,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import NoRegisterComponent from '../../components/NoRegister';
import { getData } from '../../common/dbMethods';
import { useStylesListPage } from './styles';
import Pagination from '@material-ui/lab/Pagination';
import { AccountCircle, MoreVert, NotificationImportant } from '@material-ui/icons';
import { ListItemSecondaryAction } from '@material-ui/core';

const AccountsList: React.FC = () => {
  const classes = useStylesListPage();
  const history = useHistory();
  const [alunos, setAlunos] = useState<any>([]);
  const itemsPerPage = 15;
  const [page, setPage] = React.useState(1);
  const [noOfPages, setNoOfPages] = React.useState(0);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [loading, setLoading] = useState(false);
  const open = Boolean(anchorEl);

  const getAccounts = async () => {
    const result = await getData('/accounts/list');
    setAlunos(result.data);
    setNoOfPages(Math.ceil(result.data.length / itemsPerPage));
    setLoading(false);
  };

  const handleChange = (event: any, value: React.SetStateAction<number>) => {
    setPage(value);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  useEffect(() => {
    setLoading(true);
    getAccounts();
  }, []);

  const handleNavigate = (accountId?: string) => {
    return history.push(`accounts/${accountId ? accountId : 'new'}`);
  };

  const handleNotification = () => {
    setAnchorEl(null);
    console.warn('NOTIFICAR > ');
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const options = [
    {
      key: 'edit',
      text: 'Editar',
      action: () => handleNotification(),
      icon: <AccountCircle />,
    },
    {
      key: 'notify',
      text: 'Notificar',
      action: () => handleNotification(),
      icon: <NotificationImportant />,
    },
  ];

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
          <IconButton color='primary' aria-label='add account' component='div' onClick={() => handleNavigate()}>
            <AddCircleIcon fontSize='large' />
          </IconButton>
        </div>
      </div>
      <List dense className={classes.root}>
        {loading ? (
          <div className={classes.loading}>
            <CircularProgress style={{ margin: 12 }} />
            <Typography variant='subtitle1' className={classes.typographySubtitle}>
              Carregando documentos, aguarde.
            </Typography>
          </div>
        ) : alunos.length > 0 ? (
          alunos.slice((page - 1) * itemsPerPage, page * itemsPerPage).map((aluno: any) => {
            return (
              <ListItem key={aluno._id} button onClick={() => handleNavigate(aluno._id)} className={classes.listItem}>
                <div className={classes.listItemPerson}>
                  <ListItemAvatar>
                    <Avatar alt={aluno.name.charAt(0)} />
                  </ListItemAvatar>
                  <div className={classes.listItemBlock}>
                    <ListItemText id={aluno.name} primary={aluno.name} />
                    <ListItemText id={aluno.name} secondary={aluno.email ? aluno.email : aluno.phone} />
                  </div>
                </div>
                <ListItemSecondaryAction>
                  <IconButton aria-label='more' aria-controls='long-menu' aria-haspopup='true' onClick={handleClick}>
                    <MoreVert />
                  </IconButton>
                  <Menu
                    id='long-menu'
                    variant='menu'
                    anchorEl={anchorEl}
                    keepMounted
                    elevation={1}
                    open={open}
                    onClose={handleClose}
                  >
                    {options.map(option => (
                      <MenuItem key={option.key} onClick={() => option.action()}>
                        <ListItemIcon>{option.icon}</ListItemIcon>
                        <Typography variant='inherit'>{option.text}</Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </ListItemSecondaryAction>
              </ListItem>
            );
          })
        ) : (
          <NoRegisterComponent />
        )}
      </List>
      <Box component='span'>
        <Pagination
          count={noOfPages}
          page={page}
          onChange={handleChange}
          defaultPage={1}
          color='primary'
          size='large'
          showFirstButton
          showLastButton
          classes={{ ul: classes.paginator }}
        />
      </Box>
    </Container>
  );
};
export default AccountsList;
