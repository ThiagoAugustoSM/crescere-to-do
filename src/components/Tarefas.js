import React from 'react';

import Tarefa from './Tarefa';

const Tarefas = (props) => {

  return (
    props.lista.map(item => <Tarefa key={item.tarefa} onDelete={props.onDelete} {...item}/>)
  )
}

export default Tarefas