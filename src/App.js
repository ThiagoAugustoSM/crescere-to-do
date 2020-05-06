import React, { useState, useEffect } from 'react';
import './App.css';

import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Container from './components/Container';
import Tarefa from './components/Tarefa';

function App() {

  let [tarefa, setTarefa] = useState('')
  let [data, setData] = useState('04/05/2020')
  let [cor, setCor] = useState('#FFF')
  let [filtro, setFiltro] = useState('')
  let [lista, setLista] = useState([])
  let [drawerState, setDrawerState] = useState(false)
  let [listaFeitas, setListaFeitas] = useState([])


  useEffect(() => {
    console.log(lista);
  }, [lista]);

  const handleClick = () => {
  }

  const onDelete = (tarefa) => {
    console.log(`Deletar tarefa: ${tarefa}`)
    console.log(lista)
    // let elementoAchado = lista.find(item => item.tarefa == tarefa)
    // console.log(elementoAchado)
    // setListaFeitas(listaFeitas.concat([elementoAchado]))
    // console.log(lista.filter(item => item.tarefa != tarefa))
    // setLista(lista.filter(item => item != tarefa))
  }

  function handleSubmit(e){
    console.log('Submeteu!')
    console.log(this)
    let dataFormatada = new Date(data) // Retorno do Tipo Date
    dataFormatada = dataFormatada.toString()
    setLista(lista.concat([{
                            tarefa: tarefa, 
                            data: dataFormatada,
                            cor: cor,
                            onDelete: onDelete
                          }]))
    setTarefa('')
    e.preventDefault();
    console.log(lista)
  }

  const handleFiltro = (e) => {
    setFiltro(e.target.value)
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

  const toggleDrawer = (state) => {
    setDrawerState(state)
  }
  
  return (
    <div className='container'>
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
      {/* {
        lista.map(item => <Tarefa 
                            tarefa={item.tarefa} 
                            cor={item.cor}
                            data={item.data}
                          />)
      } */}
      {
        lista.map(item => <Tarefa key={item.tarefa} {...item}/>)
      }

      

      <React.Fragment key='right'>
        <button onClick={() => toggleDrawer(true)}>ABRIR TAREFAS FEITAS!</button>
        <SwipeableDrawer
          anchor='right'
          open={drawerState}
          variant='persistent'
          onClose={() => toggleDrawer(false)}
          onOpen={() => toggleDrawer(true)}
        >
          <div class='drawer'>
            <button onClick={() => toggleDrawer(false)}>FECHAR</button>
            <h2>Faça a sua busca:</h2>
            <input type='text' value={filtro} onChange={handleFiltro}></input>
            <h2>Tarefas feitas:</h2>
              {
                lista.filter(item => {
                  let itemChanged = item.tarefa
                  itemChanged = itemChanged.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                  itemChanged = itemChanged.toLowerCase()

                  let filtroChanged = filtro
                  filtroChanged = filtroChanged.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                  filtroChanged = filtroChanged.toLowerCase()

                  return itemChanged.includes(filtroChanged)
                })
                  .map(item => <Tarefa key={item.tarefa} {...item}/>)
              }
          </div>
        </SwipeableDrawer>
      </React.Fragment>

    </div>
  );
}

export default App;
