import { makeStyles } from '@material-ui/core';
import summer from '../../assets/images/06.jpg';
import winter from '../../assets/images/02.jpg';
import fall from '../../assets/images/09.jpg';
import spring from '../../assets/images/04.jpg';
import fallback from '../../assets/images/01.jpg';

export const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: (props: any) =>
      `url(${
        props.season === 'winter'
          ? winter
          : props.season === 'fall'
          ? fall
          : props.season === 'summer'
          ? summer
          : props.season === 'spring'
          ? spring
          : fallback
      })`,
    backgroundRepeat: 'no-repeat',
    backgroundColor: theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  paperComponent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    padding: '15px',
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(6),
  },
  submit: {
    margin: theme.spacing(1, 0, 1),
  },
  logo: {
    height: '60px',
    marginBottom: '25px',
  },
  svg: {
    width: 100,
    height: 100,
  },
  polygon: {
    fill: theme.palette.common.white,
    stroke: theme.palette.divider,
    strokeWidth: 1,
  },
}));
