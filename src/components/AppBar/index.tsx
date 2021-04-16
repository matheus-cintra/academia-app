import React, { ReactElement } from 'react';
import { AppBar, Divider, IconButton, ListItemIcon, Menu, MenuItem, Toolbar, Typography } from '@material-ui/core';
import { AccountCircle, AccountCircleOutlined, ExitToAppOutlined, FitnessCenterOutlined } from '@material-ui/icons';
import SwipeableTemporaryDrawer from '../Sidenav';
import { useAuth } from '../../contexts/auth';
import useStyles from './styles';
import { useHistory } from 'react-router-dom';

const ApplicationBar: React.FC = () => {
  const classes = useStyles();
  const { Logout, user } = useAuth();
  const userData: any = user;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const history = useHistory();

  interface IMenuItems {
    key: string;
    icon: ReactElement;
    actionText: string;
    action: any;
  }

  const menuItems: IMenuItems[] = [
    {
      key: 'account-info',
      icon: <AccountCircleOutlined fontSize='small' />,
      actionText: 'Conta',
      action: () => history.push(`/accounts/${userData._id}`),
    },
    {
      key: 'gym-info',
      icon: <FitnessCenterOutlined fontSize='small' />,
      actionText: 'Academia',
      action: () => console.warn('gym-info action'),
    },
    {
      key: 'logout',
      icon: <ExitToAppOutlined fontSize='small' />,
      actionText: 'Sair',
      action: Logout,
      // action: () => console.warn('gym-info action'),
    },
  ];

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
