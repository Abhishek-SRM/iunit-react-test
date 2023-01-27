import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import * as React from 'react';

// eslint-disable-next-line @typescript-eslint/naming-convention
const data = [{"UTC_CTCD":"TEST01_*MAIN","UTC_JOBJ":"ADDNUM","UTC_CTYPE":"*PGM","UTC_CPRCNM":"*MAIN","UTC_TCRTT":"2022-12-19-14.35.42.000289","RESULT_COUNT":0},{"UTC_CTCD":"T1_PRC_M","UTC_JOBJ":"SR1","UTC_CTYPE":"*SRVPGM","UTC_CPRCNM":"PRC_M","UTC_TCRTT":"2023-01-27-14.27.21.000280","RESULT_COUNT":0},{"UTC_CTCD":"T1_PRC_D","UTC_JOBJ":"SR1","UTC_CTYPE":"*SRVPGM","UTC_CPRCNM":"PRC_D","UTC_TCRTT":"2023-01-27-14.27.24.000204","RESULT_COUNT":0},{"UTC_CTCD":"T3_*MAIN","UTC_JOBJ":"IUNTST05","UTC_CTYPE":"*PGM","UTC_CPRCNM":"*MAIN","UTC_TCRTT":"2023-01-27-14.27.51.000394","RESULT_COUNT":0},{"UTC_CTCD":"t5_MOD1","UTC_JOBJ":"SRVC1","UTC_CTYPE":"*SRVPGM","UTC_CPRCNM":"MOD1","UTC_TCRTT":"2023-01-27-14.28.39.000700","RESULT_COUNT":0},{"UTC_CTCD":"t5_PRC_ADD","UTC_JOBJ":"SRVC1","UTC_CTYPE":"*SRVPGM","UTC_CPRCNM":"PRC_ADD","UTC_TCRTT":"2023-01-27-14.28.41.000991","RESULT_COUNT":0},{"UTC_CTCD":"t5_PRC_MUL","UTC_JOBJ":"SRVC1","UTC_CTYPE":"*SRVPGM","UTC_CPRCNM":"PRC_MUL","UTC_TCRTT":"2023-01-27-14.28.44.000799","RESULT_COUNT":0},{"UTC_CTCD":"t4_PRC_M","UTC_JOBJ":"S2","UTC_CTYPE":"*SRVPGM","UTC_CPRCNM":"PRC_M","UTC_TCRTT":"2023-01-27-14.29.12.000906","RESULT_COUNT":0},{"UTC_CTCD":"t4_PRC_D","UTC_JOBJ":"S2","UTC_CTYPE":"*SRVPGM","UTC_CPRCNM":"PRC_D","UTC_TCRTT":"2023-01-27-14.29.15.000698","RESULT_COUNT":0}];
;
export default function BasicTable() {
  return (
    <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }} aria-label="simple table" size="small">
      <TableHead>
        <TableRow>
          <TableCell align="left">Test Case Name</TableCell>
          <TableCell align="right">Object Name</TableCell>
          <TableCell align="right">Object Type</TableCell>
          <TableCell align="right">Procedure Name</TableCell>
          <TableCell align="right">Base Result Execution Date</TableCell>
          <TableCell align="right">Result Count</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((data) => (
          <TableRow
            hover
            key={data.UTC_CTCD}
            // eslint-disable-next-line @typescript-eslint/naming-convention
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell align="left" component="th" scope="row">
              {String(data.UTC_CTCD).toUpperCase()}
            </TableCell>
            <TableCell align="right">{data.UTC_JOBJ}</TableCell>
            <TableCell align="right">{data.UTC_CTYPE}</TableCell>
            <TableCell align="right">{data.UTC_CPRCNM}</TableCell>
            <TableCell align="right">{data.UTC_TCRTT}</TableCell>
            <TableCell align="right">{data.RESULT_COUNT}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  );
}
