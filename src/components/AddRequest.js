import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { loginState } from '../states/login';
import { requestState } from '../states/request';
import { requestOpenState } from '../states/requestOpen';
import { requestsState } from '../states/requests';

function AddRequest() {
  const login = useRecoilValue(loginState);
  const [open, setOpen] = useRecoilState(requestOpenState);
  const [request, setRequest] = useRecoilState(requestState);
  const setRequests = useSetRecoilState(requestsState);

  const handleClickOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const handleChange = event => setRequest(request => ({ ...request, [event.target.name]: event.target.value }));

  const finishSuccessfulRequest = request => {
    alert('요청이 정상적으로 수락되었습니다');
    setRequests(requests => [request, ...requests]);
  };

  const alertMessageObject = messageObject => {
    let message = '';
    for (let [key, value] of Object.entries(messageObject)) {
      message += `${key}: ${value}\n`;
    }
    alert(message);
  };

  const tryRequest = async request => {
    const requestHeaders = { 'Content-Type': 'application/json' };
    if (login) {
      requestHeaders['JWT'] = sessionStorage.getItem('jwt');
    }
    const response = await fetch(process.env.REACT_APP_REQUEST_ENDPOINT, {
      method: 'POST',
      headers: requestHeaders,
      body: JSON.stringify(request),
    });
    const json = await response.json();
    return response.ok ? finishSuccessfulRequest(json) : alertMessageObject(json);
  };

  const handleAdd = () => {
    if (request.channelId.trim().length === 0) return alert('유튜브 채널 ID는 필수 항목입니다');
    if (request.emailAddress.length === 0) return alert('이메일 주소는 필수 항목입니다');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(request.emailAddress)) return alert('이메일 주소의 형식이 올바르지 않습니다');
    tryRequest(request);
  };

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>요청 추가</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>새 요청</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField
              label="유튜브 채널 ID"
              name="channelId"
              autoFocus
              variant="standard"
              value={request.channelId}
              onChange={handleChange}
            />
            <TextField
              label="목표 구독자 수"
              type="number"
              name="targetSubscriberCount"
              variant="standard"
              value={request.targetSubscriberCount}
              onChange={handleChange}
            />
            <TextField
              label="이메일 주소"
              name="emailAddress"
              variant="standard"
              value={request.emailAddress}
              onChange={handleChange}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>닫기</Button>
          <Button onClick={handleAdd}>추가</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddRequest;