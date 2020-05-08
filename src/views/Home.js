import React, { useState, useEffect } from 'react';
import './Home.css';

import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Container from '../components/Container';
import Tarefa from '../components/Tarefa';
import Tarefas from '../components/Tarefas';

function Home() {

  let [tarefa, setTarefa] = useState('')
  let [data, setData] = useState('04/05/2020')
  let [cor, setCor] = useState('#FFF')
  let [filtro, setFiltro] = useState('')
  let [lista, setLista] = useState([])
  let [drawerState, setDrawerState] = useState(false)
  let [listaFeitas, setListaFeitas] = useState([])

  let [temp, setTemp] = useState('')

  useEffect(() => {
    const list = localStorage.getItem('@crescere-todo/list')
    if(list != null) setLista(JSON.parse(list))

    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position) => {
        const {latitude: lat, longitude: lon} = position.coords
        console.log(lat, lon)
        fetch(`https://climacell-microweather-v1.p.rapidapi.com/weather/nowcast?fields=temp&unit_system=si&lat=${lat}&lon=${lon}`, {
          "method": "GET",
          "headers": {
            "x-rapidapi-host": "climacell-microweather-v1.p.rapidapi.com",
            "x-rapidapi-key": "hKjkcOxSbYmsh3nBTtS9NMQdhkjyp17JH8Pjsn1bzFhMODoGDx"
          }
        })
        .then(response => response.json())
        .then(json => {
          let temperatura = json[0].temp.value
          setTemp(temperatura)
        })
        .catch(err => {
          console.log(err);
        });
      })
    }

  }, []);

  const handleClick = () => {
  }

  const onDelete = (tarefa) => {
    const filteredList = lista.filter(item => item.tarefa != tarefa)
    setLista(filteredList)
    localStorage.setItem('@crescere-todo/list', JSON.stringify(filteredList))
  }

  function handleSubmit(e){
    let dataFormatada = new Date(data) // Retorno do Tipo Date
    dataFormatada = dataFormatada.toString()
    const newList = lista.concat([{tarefa: tarefa, data: dataFormatada,cor: cor}])
    setLista(newList)
    localStorage.setItem('@crescere-todo/list', JSON.stringify(newList))
    setTarefa('')
    e.preventDefault();

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
      <h3>Temperatura Atual: {temp}ºC</h3>
      <p>Adicione as suas atividades</p>
      <p>Tarefa que está sendo escrita: {tarefa}</p>

      <form onSubmit={handleSubmit}>
        <input type='text' value={tarefa} onChange={handleChange}></input>
        <input type='color' value={cor} onChange={handleChangeCor}></input>
        <input type='datetime-local' value={data} onChange={handleChangeData}></input>
        <button onClick={handleClick} type='submit'>Adicionar Tarefa!</button>
      </form>

      <h2>Tarefas a fazer:</h2>
      <Tarefas lista={lista} onDelete={onDelete}/>

      <React.Fragment key='right'>
        <button onClick={() => toggleDrawer(true)}>ABRIR TAREFAS FEITAS!</button>
        <SwipeableDrawer
          anchor='right'
          open={drawerState}
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
                  itemChanged = itemChanged.split(' ').join('')

                  let filtroChanged = filtro
                  filtroChanged = filtroChanged.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                  filtroChanged = filtroChanged.toLowerCase()
                  filtroChanged = filtroChanged.split(' ').join('')
                  
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

export default Home;
