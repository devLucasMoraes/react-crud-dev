import { PersonAddAlt } from '@mui/icons-material';
import { Stack, Box, Button, Paper } from '@mui/material';
import MyBreadcrumbs from './MyBreadcrumbs';
import PageTitle from './PageTitle';
import { Link as RouterLink } from 'react-router-dom';
import React from 'react';

interface IBasePageLayoutProps {
  children: React.ReactNode
  pageTitle: string
  labelTitle: string
}

const BasePageLayout = ({ children, pageTitle, labelTitle }: IBasePageLayoutProps) => {
  return (
    <>
      <Stack direction={{ xs: 'column', sm: 'row' }} gap={1} mb={2}>
        <Box sx={{ flexGrow: 1 }}>
          <PageTitle title={pageTitle} />
          <MyBreadcrumbs
            path={[{ label: 'Usuários', to: '/users' }, { label: labelTitle }]}
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
        {children}
      </Paper>
    </>
  );
};
export default BasePageLayout;