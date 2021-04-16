import React from 'react';
import { GridCellParams, GridColDef } from '@material-ui/data-grid';
import { IconButton, ListItemIcon, Menu, MenuItem, Typography } from '@material-ui/core';
import { AccountCircle, CheckCircle, IndeterminateCheckBox, MoreVert, NotificationImportant } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';

const headers: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 100, headerClassName: 'hideHeaderClass', cellClassName: 'hideCellClass' },
  {
    field: 'name',
    headerName: 'Nome',
    width: 200,
    flex: 1,
    headerClassName: 'headerClass',
    cellClassName: 'cellClass',
  },
  {
    field: 'membership._id',
    headerName: 'Plano',
    width: 100,
    flex: 1,
    headerClassName: 'hideHeaderClass',
    cellClassName: 'hideCellClass',
    renderCell: (params: GridCellParams) => <span>{params.row.membership.name}</span>,
  },
  {
    field: 'valor',
    headerName: 'Valor',
    width: 100,
    flex: 1,
    headerClassName: 'headerClass',
    cellClassName: 'cellClass',
  },
  {
    field: 'vencimento',
    headerName: 'Vencimento',
    width: 130,
    flex: 1,
    headerClassName: 'hideHeaderClass',
    cellClassName: 'hideCellClass',
  },
  {
    field: 'status',
    headerName: 'Status',
    flex: 1,
    headerClassName: 'headerClass',
    cellClassName: 'cellClass',
    renderCell: (params: GridCellParams) =>
      params.value === 'PAID' ? (
        <>
          <CheckCircle color={'primary'} style={{ width: '1em' }} />
        </>
      ) : (
        <>
          <IndeterminateCheckBox color={'error'} style={{ width: '1em' }} />
        </>
      ),
  },
  {
    field: 'action',
    headerName: 'Ações',
    flex: 1,
    headerClassName: 'headerClass',
    cellClassName: 'cellClass',
    renderCell: (params: GridCellParams) => {
      const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
      const open = Boolean(anchorEl);
      const history = useHistory();

      const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
      };

      const handleClose = () => {
        setAnchorEl(null);
      };

      const handleNavigate = (memberId: string) => {
        setAnchorEl(null);
        return history.push(`members/${memberId ? memberId : 'new'}`);
      };

      const handleNotification = (memberId: string) => {
        setAnchorEl(null);
        console.warn('NOTIFICAR > ', memberId);
      };

      const options = [
        {
          key: 'edit',
          text: 'Editar',
          action: (memberId: string) => handleNavigate(memberId),
          icon: <AccountCircle />,
        },
        {
          key: 'notify',
          text: 'Notificar',
          action: (memberId: string) => handleNotification(memberId),
          icon: <NotificationImportant />,
        },
      ];

      return (
        <div>
          <IconButton aria-label='more' aria-controls='long-menu' aria-haspopup='true' onClick={handleClick}>
            <MoreVert />
          </IconButton>
          <Menu id='long-menu' variant='menu' anchorEl={anchorEl} keepMounted open={open} onClose={handleClose}>
            {options.map(option => (
              <MenuItem key={option.key} onClick={() => option.action(params.row.id as string)}>
                <ListItemIcon>{option.icon}</ListItemIcon>
                <Typography variant='inherit'>{option.text}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </div>
      );
    },
  },
];

export default headers;
