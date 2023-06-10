import { Typography } from '@mui/material';

interface IPageTitleProps {
  title: string
}

const PageTitle = ({ title }: IPageTitleProps) => {
  return (
    <Typography variant="h5">
      {title}
    </Typography>
  );
};
export default PageTitle;