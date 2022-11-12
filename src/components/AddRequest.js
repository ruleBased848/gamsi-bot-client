import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

function AddRequest({ sendRequest }) {
  const [open, setOpen] = useState(false);
  const [request, setRequest] = useState({
    channelId: '',
    targetSubscriberCount: 0,
    emailAddress: '',
  });

  const handleClickOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const handleAdd = () => sendRequest(request);

  const handleChange = event => setRequest({ ...request, [event.target.name]: event.target.value });

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