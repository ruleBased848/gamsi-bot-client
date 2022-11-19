import { useRecoilValue } from 'recoil';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { loginState } from '../states/login';

function LoadingSpinner() {
  const login = useRecoilValue(loginState);

  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }}
      open={login === 2}
    >
      <CircularProgress />
    </Backdrop>
  );
}

export default LoadingSpinner;