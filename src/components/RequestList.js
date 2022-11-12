import { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Delete from '@mui/icons-material/Delete';
import AddRequest from './AddRequest';

function RequestList() {
  const [requests, setRequests] = useState([]);

  const onDelClick = id => {
    fetch(`${process.env.REACT_APP_REQUEST_ENDPOINT}/${id}`, { method: 'DELETE' })
      .then(response => response.json())
      .then(json => {
        if (json.reason === 'You do not have permission.') return alert('요청을 삭제할 권한이 없습니다');
        if (json.reason === 'The request ID is not valid.') {
          alert('존재하지 않는 요청입니다');
        }
        setRequests(requests.filter(request => request.id !== id));
      })
      .catch(err => console.error(err));
  };

  const sendRequest = async request => {
    if (request.channelId.trim().length === 0) return alert('유튜브 채널 ID는 필수 항목입니다');
    if (request.emailAddress.length === 0) return alert('이메일 주소는 필수 항목입니다');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(request.emailAddress)) return alert('이메일 주소의 형식이 올바르지 않습니다');
    const response = await fetch(process.env.REACT_APP_REQUEST_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
    });
    const json = await response.json();
    let message = '';
    if (response.ok) {
      message = '요청이 정상적으로 수락되었습니다';
      setRequests([json, ...requests]);
    } else {
      for (let [key, value] of Object.entries(json)) {
        message += `${key}: ${value}\n`;
      }
    }
    alert(message);
  };

  const columns = [
    { field: 'channelId', headerName: '유튜브 채널 ID', width: 200 },
    { field: 'targetSubscriberCount', headerName: '목표 구독자 수', width: 200 },
    { field: 'emailAddress', headerName: '이메일 주소', width: 200 },
    {
      field: '',
      headerName: '',
      sortable: false,
      filterable: false,
      renderCell: row => (
        <IconButton onClick={() => onDelClick(row.id)}>
          <Delete color="error" />
        </IconButton>
      ),
    },
  ];

  return (
    <>
      <Stack mt={2} mb={2}>
        <AddRequest sendRequest={sendRequest} />
      </Stack>
      <div style={{ height: 500, width: '100%' }}>
        <DataGrid
          rows={requests}
          columns={columns}
          disableSelectionOnClick={true}
          getRowId={row => row.id}
        />
      </div>
    </>
  );
}

export default RequestList;