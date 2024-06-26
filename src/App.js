import { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    //fetch("https://jsonplaceholder.typicode.com/users")
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
          <table border={1}>
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
          </table>
        </>
      )}
    </div>
  );
}

export default App;
