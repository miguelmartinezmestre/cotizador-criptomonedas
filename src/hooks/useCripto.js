import {Fragment, useState} from "react";
import styled from "@emotion/styled";

const Label = styled.label`
  font-family: 'Bebas Neue', cursive;
  color: #FFF;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 2.4rem;
  margin-top: 2rem;
  display: block;
`;

const Select = styled.select`
    width: 100%;
    display: block;
    padding: 1rem;
    -webkit-appearance: none;
    border-radius: 10px;
    border: none;
    font-size: 1.2rem;
`;

export default function useCripto(label, stateinicial, opciones){

    const [state, setState] = useState(stateinicial);

    const Seleccionar = () =>(
        <Fragment>
            <Label>{label}</Label>
            <Select
                onChange={e => setState(e.target.value)}
                value={state}
            >
                {opciones.map(option=>(
                    <option key={option.CoinInfo.Id} value={option.CoinInfo.Name}>
                        {option.CoinInfo.FullName}</option>
                ))}
            </Select>
        </Fragment>
    )
    return [state, Seleccionar, setState]
}
