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
  Tooltip,
  Typography,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { ErrorOutline, AddCircle } from '@material-ui/icons';
import NoRegisterComponent from '../../components/NoRegister';
import { getData } from '../../common/dbMethods';
import { useStylesListPage } from './styles';
import Pagination from '@material-ui/lab/Pagination';
import { AccountCircle, MoreVert, NotificationImportant } from '@material-ui/icons';
import { ListItemSecondaryAction } from '@material-ui/core';
import { decorateMemberList } from './decorator';
import FormDialogEmail from '../../components/DialogEmail';

const MembersList = () => {
  const classes = useStylesListPage();
  const history = useHistory();
  const [alunos, setAlunos] = useState<any>([]);
  const [memberDialog, setMemberDialog] = useState<any>({});
  const itemsPerPage = 15;
  const [page, setPage] = React.useState(1);
  const [noOfPages, setNoOfPages] = React.useState(0);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const open = Boolean(anchorEl);
  const user: any = localStorage.getItem('@App:user') || {};

  const [userData, setUserData] = useState<any>({
    gymName: '',
  });

  const getMembers = async () => {
    const result = await getData('/members/list');
    decorateMemberList(result.data);
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

  const getGymName = () => {
    setUserData(JSON.parse(user));
  };

  useEffect(() => {
    getGymName();
    setLoading(true);
    getMembers();
  }, []);

  const handleNavigate = (memberId?: string) => {
    return history.push(`members/${memberId ? memberId : 'new'}`);
  };

  const handleNotification = (member: any) => {
    setAnchorEl(null);
    setOpenDialog(true);
    setMemberDialog(member);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const options = [
    {
      key: 'edit',
      text: 'Editar',
      action: (member: any) => handleNotification(member),
      icon: <AccountCircle />,
    },
    {
      key: 'notify',
      text: 'Notificar',
      action: (member: any) => handleNotification(member),
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
            {userData.gymName}
          </Typography>
        </div>
        <div className={classes.actionsComponent}>
          <Tooltip title='Adicionar Aluno' aria-label='add member'>
            <IconButton color='primary' aria-label='add member' component='div' onClick={() => handleNavigate()}>
              <AddCircle fontSize='large' />
            </IconButton>
          </Tooltip>
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
                <div className={classes.price}>
                  {!aluno.isPaid ? (
                    <Tooltip title='Mensalidade atrasada' aria-label='delayed payment'>
                      <ErrorOutline fontSize='medium' className={`${classes.flicker} ${classes.priceDelay}`} />
                    </Tooltip>
                  ) : null}
                  <ListItemText id={aluno._id} primary={`R$ ${aluno.plan.value.toFixed(2)}`} />
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
                      <MenuItem key={option.key} onClick={() => option.action(aluno)}>
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
        <FormDialogEmail handleClose={handleCloseDialog} open={openDialog} user={memberDialog} />
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
export default MembersList;
