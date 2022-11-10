import { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';

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

  const columns = [
    { field: 'channelId', headerName: '유튜브 채널 ID', width: 200 },
    { field: 'targetSubscriberCount', headerName: '목표 구독자 수', width: 200 },
    { field: 'emailAddress', headerName: '이메일 주소', width: 200 },
    {
      field: '',
      headerName: '',
      sortable: false,
      filterable: false,
      renderCell: row => <button onClick={() => onDelClick(row.id)}>삭제</button>,
    },
  ];

  return (
    <>
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