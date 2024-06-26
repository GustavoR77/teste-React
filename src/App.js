import { useEffect, useState } from "react";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:14000/clients")
      .then((response) => response.json())
      .then((json) => setUsers(json))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="App">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <h1>Usuários</h1>
          {/* <table border={1}>
            <tr>
              <th>Nome</th>
              <th>Data de Nascimento</th>
              <th>CPF</th>
              <th>Endereço</th>
              <th>Status</th>
            </tr>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.birth_date}</td>
                <td>{user.cpf}</td>
                <td>{user.address}</td>
                <td>{user.status}</td>
              </tr>
            ))}
          </table> */}
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Nome</StyledTableCell>
                  <StyledTableCell align="right">Data de Nascimento</StyledTableCell>
                  <StyledTableCell align="right">CPF</StyledTableCell>
                  <StyledTableCell align="right">Endereço</StyledTableCell>
                  <StyledTableCell align="right">Status</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((row) => (
                  <StyledTableRow key={row.name}>
                    <StyledTableCell component="th" scope="row">
                      {row.name}
                    </StyledTableCell>
                    <StyledTableCell align="right">{row.birth_date}</StyledTableCell>
                    <StyledTableCell align="right">{row.cpf}</StyledTableCell>
                    <StyledTableCell align="right">{row.address}</StyledTableCell>
                    <StyledTableCell align="right">{row.address}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </div>
  );
}

export default App;
