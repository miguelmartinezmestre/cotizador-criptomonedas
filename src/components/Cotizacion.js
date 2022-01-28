import styled from "@emotion/styled";

const Resultado = styled.div`
    font-family: Arial, Helvetica, sans-serif;
    color: #FFF;
`;
const Parrafo = styled.p`
    font-size: 18px;
  span{
    font-weight: bold;
  }
`;
const Precio = styled.p`
    font-size: 30px;
`;

export default function Cotizacion({precio}){
    if (Object.keys(precio).length === 0) return null;
    return (
        <Resultado>
            <Precio>El precio es: <span>{precio.PRICE}</span></Precio>
            <Parrafo>El precio mas alta del dia es: <span>{precio.HIGHDAY}</span></Parrafo>
            <Parrafo>El precio mas bajo del dia es: <span>{precio.LOWDAY}</span></Parrafo>
            <Parrafo>Variacion ultimas 24 horas es: <span>{precio.CHANGEPCT24HOUR}</span></Parrafo>
            <Parrafo>Ultimo precio es: <span>{precio.LASTUPDATE}</span></Parrafo>
        </Resultado>
    );
}
