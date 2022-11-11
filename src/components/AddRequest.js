import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

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
      <button onClick={handleClickOpen}>요청 추가</button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>새 요청</DialogTitle>
        <DialogContent>
          <label htmlFor="channelId">유튜브 채널 ID</label><br />
          <input placeholder="UC?????" name="channelId" value={request.channelId} onChange={handleChange} /><br />
          <label htmlFor="targetSubscriberCount">목표 구독자 수</label><br />
          <input
            type="number"
            name="targetSubscriberCount"
            value={request.targetSubscriberCount}
            onChange={handleChange}
          /><br />
          <label htmlFor="emailAddress">이메일 주소</label><br />
          <input
            type="email"
            placeholder="example@example.com"
            name="emailAddress"
            value={request.emailAddress}
            onChange={handleChange}
          /><br />
        </DialogContent>
        <DialogActions>
          <button onClick={handleClose}>닫기</button>
          <button onClick={handleAdd}>추가</button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddRequest;