import React from 'react';

import './Tarefa.css';

const Tarefa = (props) => {

  const handleClick = () => {
    props.onDelete(props.tarefa)
    console.log(`Tarefa clicado: ${props.tarefa}`)
  }
  return (
    <div className='card' style={{backgroundColor: props.cor}}>
      <p> 
        <strong>Tarefa:</strong> {props.tarefa}
      </p>
      <p>
        <strong>Data e Hora:</strong> {props.data}
      </p>
      <button onClick={handleClick}>Deletar Tarefa</button>
    </div>
  )
}

export default Tarefa;