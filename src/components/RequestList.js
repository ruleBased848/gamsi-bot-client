import { DataGrid } from '@mui/x-data-grid';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Delete from '@mui/icons-material/Delete';
import AddRequest from './AddRequest';

function RequestList({ requests, login, deleteRequest, finishSuccessfulRequest }) {
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
        <AddRequest login={login} finishSuccessfulRequest={finishSuccessfulRequest} />
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