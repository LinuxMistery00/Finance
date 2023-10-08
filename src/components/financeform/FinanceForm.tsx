import styles from './styles.module.css';
import React, { useState, useEffect, ChangeEvent } from 'react';
import axios, { AxiosResponse } from 'axios';
import FinanceCard from '../financecard/FinanceCard';

interface Finance {
  _id: string;
  nome: string;
  description: string;
  date: string;
  value: Float32Array;
}

const FinanceForm: React.FC = () => {
  const [nome, setNome] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [value, setValue] = useState('');
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

  const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  const handleSubmit = () => {
    axios
      .post<Finance>('http://localhost:3001/addDev', { nome, description, date, value })
      .then((response: AxiosResponse<Finance>) => {
        setFinances([...finances, response.data]);
        setNome('');
        setDate('');
        setDescription('');
        setValue('');
      })
      .catch((error) => {
        console.error("Erro na solicitação POST:", error);
      });
  };

  return (
    <div>
      <div className={styles.Form}>
        <input type="text" placeholder="Nome" value={nome} onChange={handleNomeChange} />
        <input type="text" placeholder="Descrição" value={description} onChange={handleDescriptionChange} />
        <input type="date" placeholder="Data" value={date} onChange={handleDateChange} />
        <input type="float" placeholder="Valor" value={value} onChange={handleValueChange} />
        <button onClick={handleSubmit}>Adicionar</button>
      </div>
      <div className={styles.Finances}>
        {finances.map((finance: Finance) => (
          <FinanceCard key={finance._id}>
            <h1>
              Nome: {finance.nome}, Descrição: {finance.description}, Data: {finance.date}, Valor: {finance.value}
            </h1>
          </FinanceCard>
        ))}
      </div>
    </div>
  );
};

export default FinanceForm;
