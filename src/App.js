import { useEffect, useState } from "react";

function App() {
  const [activeTable, setActiveTable] = useState(true);

  const [clients, setClients] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);

  const switchTable = () => {
    setActiveTable(!activeTable);
  };

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:14000/clients")
      .then((response) => response.json())
      .then((json) => setClients(json))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:14000/companies")
      .then((response) => response.json())
      .then((json) => setCompanies(json))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div class="d-flex p-3" className="App">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div class={activeTable == false ? "d-none" : "d-flex flex-column"}>
            <h1 class="text-center">Clientes</h1>
            <table class="table text-center align-middle w-100 mt-3">
              <thead class="thead-dark">
                <tr>
                  <th scope="col">Nome</th>
                  <th scope="col">Data de Nascimento</th>
                  <th scope="col">CPF</th>
                  <th scope="col">Endereço</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((client) => (
                  <tr key={client.id}>
                    <td class="align-middle">{client.name}</td>
                    <td class="align-middle">{client.birth_date}</td>
                    <td class="align-middle">{client.cpf}</td>
                    <td class="w-50 align-middle">{client.address}</td>
                    <td class="align-middle">{client.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div class="d-flex justify-content-center">
              <button
                type="button"
                class="btn btn-secondary"
                onClick={switchTable}
              >
                Empresas
              </button>
            </div>
          </div>
          <div class={activeTable == false ? "d-flex flex-column" : "d-none"}>
            <h1 class="text-center">Empresas</h1>
            <table class="table text-center align-middle w-100 mt-3">
              <thead class="thead-dark">
                <tr>
                  <th scope="col">Empresa</th>
                  <th scope="col">Nome Fantasia</th>
                  <th scope="col">Endereço</th>
                  <th scope="col">Capital</th>
                </tr>
              </thead>
              <tbody>
                {companies.map((company) => (
                  <tr key={company.id}>
                    <td class="align-middle">{company.corporate_name}</td>
                    <td class="align-middle">{company.fantasy_name}</td>
                    <td class="align-middle">{company.address}</td>
                    <td class="align-middle">{company.monetary_capital}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div class="d-flex justify-content-center">
              <button
                type="button"
                class="btn btn-secondary"
                onClick={switchTable}
              >
                Clientes
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
