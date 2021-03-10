import { GridCellParams, GridColDef } from '@material-ui/data-grid';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';
import React from 'react';

const headers: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70, headerClassName: 'hideHeaderClass', cellClassName: 'hideCellClass' },
  {
    field: 'name',
    headerName: 'Nome',
    width: 200,
    flex: 1,
    headerClassName: 'headerClass',
    cellClassName: 'cellClass',
  },
  {
    field: 'plano',
    headerName: 'Plano',
    width: 100,
    flex: 1,
    headerClassName: 'hideHeaderClass',
    cellClassName: 'hideCellClass',
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
          <CheckCircleIcon color={'primary'} style={{ width: '1em' }} />
        </>
      ) : (
        <>
          <IndeterminateCheckBoxIcon color={'error'} style={{ width: '1em' }} />
        </>
      ),
  },
];

export default headers;
