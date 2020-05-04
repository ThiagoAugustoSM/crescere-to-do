import React, { useState } from 'react';
import './App.css';

function App() {

  let [tarefa, setTarefa] = useState('')
  let [data, setData] = useState('04/05/2020')
  let [cor, setCor] = useState('#FFF')
  let [lista, setLista] = useState([])

  const handleClick = () => {
  }

  const handleSubmit = (e) => {
    console.log('Submeteu!')
    let dataFormatada = new Date(data) // Retorno do Tipo Date
    dataFormatada = dataFormatada.toString()
    setLista(lista.concat([{
                            tarefa: tarefa, 
                            data: dataFormatada,
                            cor: cor
                          }]))
    setTarefa('')
    e.preventDefault();
    console.log(lista)
  }

  const handleChange = (e) => {
    setTarefa(e.target.value)
  }

  const handleChangeData = (e) => {
    setData(e.target.value)
  }

  const handleChangeCor = (e) => {
    console.log(e.target.value)
    setCor(e.target.value)
  }
  
  return (
    <div>
      <h1>To Do List</h1>
      <p>Adicione as suas atividades</p>
      <p>Tarefa que está sendo escrita: {tarefa}</p>

      <form onSubmit={handleSubmit}>
        <input type='text' value={tarefa} onChange={handleChange}></input>
        <input type='color' value={cor} onChange={handleChangeCor}></input>
        <input type='datetime-local' value={data} onChange={handleChangeData}></input>
        <button onClick={handleClick} type='submit'>Adicionar Tarefa!</button>
      </form>

      <h2>Tarefas a fazer:</h2>
      {
        lista.map(item => <p 
                            style={{backgroundColor: item.cor}}
                          >
                            Tarefa: {item.tarefa}. Data e Hora: {item.data}
                          </p>
                  )
      }
    </div>
  );
}

export default App;
