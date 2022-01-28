import {useEffect, useState} from "react";
import styled from '@emotion/styled';
import useMoneda from "../hooks/useMoneda";
import useCripto from "../hooks/useCripto";
import axios from "axios";
import Error from "./Error";

const Boton = styled.button`
  margin-top: 20px;
  font-weight: bold;
  font-size: 20px;
  padding: 10px;
  background-color: #66A2FE;
  border: none;
  width: 100%;
  border-radius: 10px;
  color: #FFF;
  transition: background-color .3s ease;
  
  &:hover{
    background-color: #326AC0;
    cursor: pointer;
  }
`;

export default function Formulario({setMoneda, setCriptomoneda}){

    const [criptomonedas, setCriptomonedas] = useState([]);
    const [error, setError] = useState(false);

    const MONEDAS = [
        {codigo: 'USD', nombre: 'Dolar'},
        {codigo: 'EUR', nombre: 'Euro'},
        {codigo: 'GBP', nombre: 'Libra'}
    ]

    const [moneda, Select] = useMoneda('Elige tu moneda', '',MONEDAS);
    const [cripto, Seleccionar ] = useCripto('Elige tu criptomoneda', '', criptomonedas);


    useEffect(()=>{
        const consultar = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD&api_key={2812b294b63c06864f2f48c21852e1af71f7c77130059bb462f58bf8d3f9cc81}'
            const resultado = await axios.get(url);
            setCriptomonedas(resultado.data.Data);
        }
        consultar();
    },[]);

    const cotizarMoneda = (e) => {
        e.preventDefault();

        if(moneda === "" || cripto === ""){
            setError(true)
            return;
        }

        setError(false);
        setMoneda(moneda);
        setCriptomoneda(cripto);
    }

    return(
        <form
        onSubmit={cotizarMoneda}
        >
            {error ? <Error mensaje="Todos los campos son obligatorio"/>: null}
            <Select/>
             <Seleccionar/>
            <Boton
                type="submit"
                value="calculator">
                Calcular
            </Boton>
        </form>
    );
}
