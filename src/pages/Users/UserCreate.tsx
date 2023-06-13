import { PersonAddAlt } from '@mui/icons-material';
import { Stack, Box, Button, Paper } from '@mui/material';
import MyBreadcrumbs from '../../components/MyBreadcrumbs';
import { Link as RouterLink } from 'react-router-dom';
import PageTitle from '../../components/PageTitle';
import Form from '../../components/Form';

const UserCreate = () => {
  return (
    <>
      <Stack direction={{ xs: 'column', sm: 'row' }} gap={1} mb={2}>
        <Box sx={{ flexGrow: 1 }}>
          <PageTitle title='Lista' />
          <MyBreadcrumbs
            path={[{ label: 'Usuários', to: '/users' }, { label: 'Lista' }]}
          />
        </Box>
        <Box>
          <Button
            component={RouterLink}
            to='/users/new'
            variant='contained'
            startIcon={<PersonAddAlt />}
          >
            Novo Usuário
          </Button>
        </Box>
      </Stack>
      <Paper>
        <Form></Form>
      </Paper>
    </>
  );
};
export default UserCreate;