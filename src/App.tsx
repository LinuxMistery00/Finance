import React, { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/addDev", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });

      if (response.ok) {
        setMessage("Pessoa inserida com sucesso!");
      } else {
        setMessage("Erro ao inserir pessoa.");
      }
    } catch (error) {
      console.error("Erro ao enviar solicitação:", error);
      setMessage("Erro ao inserir pessoa.");
    }
  };

  return (
    <div className="App">
      <h1>Inserir Pessoa</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={handleNameChange}
        />
        <button type="submit">Adicionar Pessoa</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default App;
