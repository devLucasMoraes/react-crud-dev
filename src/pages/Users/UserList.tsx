import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { Stack, IconButton } from '@mui/material';
import { GridRenderCellParams, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import MyDataGrid from '../../components/MyDataGrid';
import { User } from './types/User';

const UserList = () => {
  function onCall(params: GridRenderCellParams): void {
    throw new Error('Function not implemented.');
  }


  function onEdit(params: GridRenderCellParams): void {
    throw new Error('Function not implemented.');
  }


  function onDelete(params: GridRenderCellParams): void {
    throw new Error('Function not implemented.');
  }

  const columns: GridColDef<User>[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    {
      field: 'firstName',
      headerName: 'Nome',
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.fullName.split(' ')?.shift() || ''}`
    },
    {
      field: 'lastName',
      headerName: 'Sobrenome',
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.fullName.split(' ')?.shift() || ''}`
    },
    { field: 'document', headerName: 'CPF', width: 150 },
    {
      field: 'age',
      headerName: 'Idade',
      type: 'number',
      valueGetter: (params: GridValueGetterParams) =>
        params.row.birthdate &&
        `${new Date().getFullYear() -
        new Date(params.row.birthdate).getFullYear()
        }`,
    },
    { field: 'email', headerName: 'E-mail', width: 200 },
    { field: 'mobile', headerName: 'Celular', width: 180 },
    {
      field: 'actions',
      headerName: 'Ações',
      minWidth: 150,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <Stack direction="row" spacing={2}>
          <IconButton
            color="success"
            size="small"
            onClick={() => onCall(params)}
          >
            <WhatsAppIcon fontSize="inherit" />
          </IconButton>

          <IconButton color="info" size="small" onClick={() => onEdit(params)}>
            <EditIcon fontSize="inherit" />
          </IconButton>

          <IconButton
            color="error"
            size="small"
            onClick={() => onDelete(params)}
          >
            <DeleteIcon fontSize="inherit" />
          </IconButton>
        </Stack>
      )
    }
  ];

  const users = [
    {
      id: '1',
      fullName: 'Lucas Moraes',
      document: '000.000.000-00',
      birthdate: new Date(1970, 1, 1),
      email: 'devlucasmoraes@gmail.com',
      emailVerified: true,
      mobile: '(71) 99954-9776',
      zipCode: '44089-278',
      addressName: '',
      number: '',
      complement: '',
      neighborhood: '',
      city: '',
      state: ''
    }
  ];
  
  return (
    <MyDataGrid columns={columns} rows={users}/>
  );
};
export default UserList;