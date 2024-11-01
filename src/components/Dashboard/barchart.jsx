import * as d3 from "d3";
import { useRef, useEffect } from "react";

export default function BarChart({
  data,
  width = 640,
  height = 400,
  marginTop = 20,
  marginRight = 20,
  marginBottom = 30,
  marginLeft = 40
}) {
  const gx = useRef();
  const gy = useRef();

  // Definindo escalas para o eixo X e Y
  const x = d3.scaleBand()
    .domain(d3.range(data.length))
    .range([marginLeft, width - marginRight])
    .padding(0.1); // Adiciona espaçamento entre as barras

  const y = d3.scaleLinear()
    .domain([0, d3.max(data)]) // o domínio começa do 0 até o valor máximo dos dados
    .nice() // Ajusta os limites para números "bonitos"
    .range([height - marginBottom, marginTop]);

  useEffect(() => {
    d3.select(gx.current).call(d3.axisBottom(x).tickFormat(i => i + 1)); // Mostra índices no eixo X
    d3.select(gy.current).call(d3.axisLeft(y));
  }, [gx, gy, x, y]);

  return (
    <svg width={width} height={height}>
      {/* Eixo X */}
      <g ref={gx} transform={`translate(0,${height - marginBottom})`} />
      
      {/* Eixo Y */}
      <g ref={gy} transform={`translate(${marginLeft},0)`} />

      {/* Renderização das barras */}
      <g fill="steelblue">
        {data.map((d, i) => (
          <rect
            key={i}
            x={x(i)}
            y={y(d)}
            width={x.bandwidth()} // Largura de cada barra
            height={y(0) - y(d)} // Altura com base no valor
          />
        ))}
      </g>
    </svg>
  );
}
