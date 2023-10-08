import React, { useState, useEffect, ChangeEvent } from 'react';
import axios, { AxiosResponse } from 'axios';

interface finance {
  _id: string;
  nome: string;
}

const App: React.FC = () => {
  const [nome, setNome] = useState('');
  const [finances, setfinances] = useState<finance[]>([]);

  useEffect(() => {
    axios.get<finance[]>('http://localhost:3001/devs').then((response: AxiosResponse<finance[]>) => {
      setfinances(response.data);
    });
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNome(e.target.value);
  };

  const handleSubmit = () => {
    axios
      .post<finance>('http://localhost:3001/addDev', { nome })
      .then((response: AxiosResponse<finance>) => {
        setfinances([...finances, response.data]);
        setNome('');
      })
      .catch((error) => {
        console.error("Erro na solicitação POST:", error);
      });
  };
  

  return (
    <div>
      <h1>Lista de finances</h1>
      <div>
        <input type="text" placeholder="Nome" value={nome} onChange={handleInputChange} />
        <button onClick={handleSubmit}>Adicionar</button>
      </div>
      <ul>
        {finances.map((finance: finance) => (
          <li key={finance._id}>{finance.nome}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
