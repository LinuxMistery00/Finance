import React, { useState, useEffect, ChangeEvent } from 'react';
import axios, { AxiosResponse } from 'axios';

interface Finance {
  _id: string;
  nome: string;
  description: string;
  date: string;
}

const FinanceForm: React.FC = () => {
  const [nome, setNome] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [finances, setFinances] = useState<Finance[]>([]);

  useEffect(() => {
    axios.get<Finance[]>('http://localhost:3001/devs').then((response: AxiosResponse<Finance[]>) => {
      setFinances(response.data);
    });
  }, []);

  const handleNomeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNome(e.target.value);
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  }

  const handleSubmit = () => {
    axios
      .post<Finance>('http://localhost:3001/addDev', { nome, description, date })
      .then((response: AxiosResponse<Finance>) => {
        setFinances([...finances, response.data]);
        setNome('');
        setDate('');
        setDescription('');
      })
      .catch((error) => {
        console.error("Erro na solicitação POST:", error);
      });
  };

  return (
    <div>
      <h1>Lista de finances</h1>
      <div>
        <input type="text" placeholder="Nome" value={nome} onChange={handleNomeChange} />
        <input type="text" placeholder="Descrição" value={description} onChange={handleDescriptionChange} />
        <input type="date" placeholder="Data" value={date} onChange={handleDateChange} />
        <button onClick={handleSubmit}>Adicionar</button>
      </div>
      <ul>
        {finances.map((finance: Finance) => (
          <li key={finance._id}>
            Nome: {finance.nome}, Descrição: {finance.description}, Data: {finance.date}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FinanceForm;
