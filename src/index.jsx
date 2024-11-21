import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import './index.css'

import api from "./services/api";

function Index() {

  const [input, setInput] = useState('')
  const [cep, setCep] = useState({})

  async function SearchClick() {

    if (input === '') {
      alert('Digite um CEP')
      return;
    }

    try {
      const response = await api.get(`${input}/json`)
      setCep(response.data)
      setInput('')


    } catch{
      alert("CEP inválido")
      setInput('')
    }
  }

  return (
    <>
      <div className="container">
        <h1 className="title">Buscador de CEP</h1>

        <div className="searchcontainer">
          
          <input type="text"
          placeholder="Digite seu CEP"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          required
          />


          <button onClick={SearchClick}>
            <FiSearch size={25} color="#FFF"/>
          </button>
        </div>



        {Object.keys(cep).length > 0 && (
          <main className="main">
          <h2>CEP: {cep.cep} </h2>

          <span>{cep.logradouro} </span>
          <span>{cep.complemento} </span>
          <span>{cep.bairro} </span>
          <span>{cep.localidade} - {cep.uf} </span>
        </main>
        )}

        

      </div>
    </>
  )
}

export default Index
