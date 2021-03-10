import React from 'react';
import { NavLink } from 'react-router-dom';
import { IconButton, List, ListItem, ListItemIcon, ListItemText, SwipeableDrawer } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import useStyles from './styles';
import sidenavRoutes from './routesDefinition';

type Anchor = 'top' | 'left' | 'bottom' | 'right';

export default function SwipeableTemporaryDrawer() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor: Anchor, open: boolean) => setState({ ...state, [anchor]: open });

  const list = (anchor: Anchor) => (
    <div
      className={classes.list}
      role='presentation'
      onClick={() => toggleDrawer(anchor, false)}
      onKeyDown={() => toggleDrawer(anchor, false)}
    >
      <List>
        {sidenavRoutes.map(route => (
          <ListItem button key={route.key} component={NavLink} to={route.path}>
            <ListItemIcon>{route.icon}</ListItemIcon>
            <ListItemText primary={route.name} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <React.Fragment>
      <IconButton
        onClick={() => toggleDrawer('left', true)}
        edge='start'
        className={classes.menuButton}
        color='inherit'
        aria-label='menu'
      >
        <Menu />
      </IconButton>
      <SwipeableDrawer
        anchor={'left'}
        open={state.left}
        onClose={() => toggleDrawer('left', false)}
        onOpen={() => toggleDrawer('left', true)}
      >
        {list('left')}
      </SwipeableDrawer>
    </React.Fragment>
  );
}
