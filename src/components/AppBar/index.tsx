import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SwipeableTemporaryDrawer from '../Sidenav';
import FitnessCenterOutlinedIcon from '@material-ui/icons/FitnessCenterOutlined';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import { Divider, ListItemIcon } from '@material-ui/core';
import { useAuth } from '../../contexts/auth';
import { AccountCircleOutlined } from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      minWidth: 360,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    accountInfo: {
      display: 'flex',
      alignItems: 'center',
    },
    toolbar: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    menuList: {
      '& > div > ul': {
        padding: 0,
      },
      '& > div:nth-child(2)': {
        top: '50px!important',
      },
      '& > div:nth-child(3)': {
        top: '50px!important',
      },
    },
    listIcon: {
      minWidth: 32,
    },
  })
);

const ApplicationBar: React.FC = () => {
  const classes = useStyles();
  const { Logout, user } = useAuth();
  const userData: any = user;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const menuItems = [
    {
      key: 'account-info',
      icon: <AccountCircleOutlined fontSize='small' />,
      actionText: 'Conta',
      action: () => console.warn('account-info action'),
    },
    {
      key: 'gym-info',
      icon: <FitnessCenterOutlinedIcon fontSize='small' />,
      actionText: 'Academia',
      action: () => console.warn('gym-info action'),
    },
    {
      key: 'logout',
      icon: <ExitToAppOutlinedIcon fontSize='small' />,
      actionText: 'Sair',
      action: Logout,
      // action: () => console.warn('gym-info action'),
    },
  ];

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar className={classes.toolbar}>
          <SwipeableTemporaryDrawer />
          <div className={classes.accountInfo}>
            <Typography variant='subtitle1' noWrap>
              {userData.name || 'Usuário'}
            </Typography>
            <IconButton
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleMenu}
              color='inherit'
            >
              <AccountCircle style={{ fontSize: 32 }} />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={handleClose}
              className={classes.menuList}
            >
              {menuItems.map((menu, idx) => (
                <div key={menu.key}>
                  <MenuItem onClick={() => menu.action()}>
                    <ListItemIcon className={classes.listIcon}>{menu.icon}</ListItemIcon>
                    <Typography variant='subtitle2'>{menu.actionText}</Typography>
                  </MenuItem>
                  {idx !== menuItems.length - 1 ? <Divider component='li' /> : null}
                </div>
              ))}
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default ApplicationBar;
