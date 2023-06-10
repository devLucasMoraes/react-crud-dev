import { Breadcrumbs, Link, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

interface IMyBreadcrumbsProps {
  path: {
    label: string
    to?: string
  }[]
}

const MyBreadcrumbs = ({ path }: IMyBreadcrumbsProps) => {
  return (
    <Breadcrumbs>
      <Link
        underline='hover'
        component={RouterLink}
        to='/'
      >
        Dashboard
      </Link>

      {path.map((item, index) =>
        item.to ? (
          <Link
            key={`item-${index}`}
            underline='hover'
            component={RouterLink}
            to={item?.to ?? '#'}
          >
            {item.label}
          </Link>
        ) : (
          <Typography key={`item-${index}`}>
            {item.label}
          </Typography>
        )
      )}
    </Breadcrumbs>
  );
};
export default MyBreadcrumbs;