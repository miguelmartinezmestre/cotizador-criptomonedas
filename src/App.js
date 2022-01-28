import styled from '@emotion/styled'
import cripto from './cryptomonedas.png'
import Formulario from './components/Formulario';
import {useEffect, useState} from "react";
import axios from "axios";
import Cotizacion from "./components/Cotizacion";
import Spinner from "./components/Spinner";

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  @media(min-width:992px){
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Imagen = styled.img`
    max-width: 100%;
    margin-top: 5rem;
`;

const Heading = styled.h1`
  font-family: 'Bebas Neue', cursive;
  color: #FFF;
  text-align: left;
  font-weight:700;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 80px;
  
  &::after {
    content:'';
    width:100px;
    height:6px;
    background-color: #66A2FE;
    display: block;
  }
`;

export default function App() {
    const [moneda, setMoneda] = useState('');
    const [criptomoneda, setCriptomoneda] = useState('');
    const [precio, setPrecio] = useState({});
    const [load, setLoad] = useState(false);

    useEffect(()=>{
        if (moneda === '') return;
        const cotizar = async () => {
            console.log("Cotizando...");
            const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda},EUR&api_key={2812b294b63c06864f2f48c21852e1af71f7c77130059bb462f58bf8d3f9cc81}`;
            const data = await axios.get(url);

            setLoad(true);

            setTimeout(()=>{
                setLoad(false)
            },3000)

            setPrecio(data.data.DISPLAY[criptomoneda][moneda])
        }
        cotizar();
    },[moneda, criptomoneda])


  return (
    <Contenedor>
      <div>
        <Imagen
        src={cripto}
        alt="criptomonedas"
        />
      </div>
      <div>
          <Heading>Cotiza cripto al instante</Heading>
          <Formulario
            setMoneda={setMoneda}
            setCriptomoneda={setCriptomoneda}
          />
          {load ? <Spinner/> : <Cotizacion precio={precio}/>}

      </div>
    </Contenedor>
  );
}
