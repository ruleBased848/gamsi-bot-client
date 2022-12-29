import { useRecoilState, useRecoilValue } from 'recoil';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import Delete from '@mui/icons-material/Delete';
import { loginState } from '../states/login';
import { requestsState } from '../states/requests';

function RequestList() {
  const login = useRecoilValue(loginState);
  const [requests, setRequests] = useRecoilState(requestsState);

  const deleteRequest = (id, success) => {
    if (!success) {
      alert('존재하지 않는 요청입니다');
    }
    setRequests(requests => requests.filter(request => request.id !== id));
  };

  const onDelClick = async id => {
    const requestHeaders = {};
    if (login) {
      requestHeaders['JWT'] = sessionStorage.getItem('jwt');
    }
    const response = await fetch(`${process.env.REACT_APP_REQUEST_ENDPOINT}/${id}`, {
      method: 'DELETE',
      headers: requestHeaders,
    });
    const json = await response.json();
    return json.reason === 'You do not have permission.' ? alert('요청을 삭제할 권한이 없습니다') :
      deleteRequest(id, json.success);
  };

  const columns = [
    { field: 'handle', headerName: '유튜브 핸들', flex: 1, valueFormatter: ({ value }) => '@' + value },
    { field: 'targetSubscriberCount', headerName: '목표 구독자 수', flex: 1 },
    { field: 'emailAddress', headerName: '이메일 주소', flex: 1 },
    { field: 'createdAt', headerName: '요청 일시', flex: 1, valueFormatter: ({ value }) => new Date(value).toLocaleString() },
    {
      field: '',
      headerName: '',
      width: 50,
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
    <div style={{ width: '100%', flex: 1 }}>
      <DataGrid
        rows={requests}
        columns={columns}
        disableSelectionOnClick={true}
        getRowId={row => row.id}
      />
    </div>
  );
}

export default RequestList;