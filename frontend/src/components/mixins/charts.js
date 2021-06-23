import * as d3 from 'd3';

export function makeScatterPlot(id, w, h, data, xAttrName, yAttrName, title, [xTitle, yTitle]) {
  const margin = {
    top: 40, right: 30, bottom: 60, left: 100,
  };
  const width = w - margin.left - margin.right;
  const height = h - margin.bottom - margin.top;

  const chart = d3.select(id)
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

  const x = d3.scaleLinear()
    .range([0, width]);

  const y = d3.scaleLinear()
    .range([height, 0]);

  const xAxis = chart.append('g')
    .attr(
      'transform',
      `translate(0, ${height})`,
    )
    .style('font-size', '14px');

  const yAxis = chart.append('g')
    .style('font-size', '14px');

  const color = d3.scaleOrdinal()
    .domain([d3.min(data, (d) => d.label), d3.max(data, (d) => d.label)])
    .range(d3.schemeSet2);

  const xDeviation = Math.max(...data.map((d) => d[xAttrName])) * 0.02;
  const yDeviation = Math.max(...data.map((d) => d[yAttrName])) * 0.02;

  x.domain([d3.min(data, (d) => d[xAttrName]) - xDeviation,
    d3.max(data, (d) => d[xAttrName]) + xDeviation]);
  y.domain([d3.min(data, (d) => d[yAttrName]) - yDeviation,
    d3.max(data, (d) => d[yAttrName]) + yDeviation]);

  xAxis.call(d3.axisBottom(x));
  yAxis.call(d3.axisLeft(y));

  chart.selectAll('point')
    .data(data)
    .join('g')
    .attr('transform', (d) => `translate(${x(d[xAttrName])}, ${y(d[yAttrName])})`)
    .append('circle')
    .attr('r', 4)
    .style('fill', (d) => color(d.label));

  chart.append('text')
    .attr('transform', 'rotate(-90)')
    .attr('y', 0 - margin.left)
    .attr('x', 0 - (height / 2))
    .attr('dy', '1em')
    .style('text-anchor', 'middle')
    .text(yTitle);

  chart.append('text')
    .attr('transform',
      `translate(${width / 2} ,${
        height + margin.top + 10})`)
    .style('text-anchor', 'middle')
    .text(xTitle);

  chart.append('text')
    .attr('x', (width / 2))
    .attr('y', 0 - (margin.top / 2))
    .attr('text-anchor', 'middle')
    .style('font-size', '18px')
    .style('letter-spacing', '4px')
    .text(title);
}

export function makeHistogram(id, w, h, data, attrName, xTitle) {
  const margin = {
    top: 40, right: 30, bottom: 60, left: 100,
  };
  const width = w - margin.left - margin.right;
  const height = h - margin.bottom - margin.top;

  const deviation = Math.max(...data.map((d) => d[attrName])) * 0.1;

  const chart = d3.select(id)
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

  const x = d3.scaleLinear()
    .range([0, width])
    .domain([d3.min(data, (d) => d[attrName]) - deviation,
      d3.max(data, (d) => d[attrName]) + deviation]);
  chart.append('g')
    .attr('transform', `translate(0,${height})`)
    .style('font-size', '14px')
    .call(d3.axisBottom(x))
    .selectAll('text')
    .style('text-anchor', 'end')
    .attr('transform', 'rotate(-25)');

  const histogram = d3.histogram()
    .value((d) => d[attrName])
    .domain(x.domain())
    .thresholds(x.ticks(15));

  const bins = histogram(data);

  const y = d3.scaleLinear()
    .range([height, 0])
    .domain([0, d3.max(bins, (d) => d.length)]);
  chart.append('g')
    .style('font-size', '14px')
    .call(d3.axisLeft(y));

  chart.selectAll('rect')
    .data(bins)
    .enter()
    .append('rect')
    .attr('x', 1)
    .attr('transform', (d) => `translate(${x(d.x0)},${y(d.length)})`)
    .attr('width', (d) => x(d.x1) - x(d.x0) - 1)
    .attr('height', (d) => height - y(d.length))
    .style('fill', '#69b3a2');

  chart.append('text')
    .attr('transform', 'rotate(-90)')
    .attr('y', 0 - margin.left)
    .attr('x', 0 - (height / 2))
    .attr('dy', '1em')
    .style('text-anchor', 'middle')
    .text('Частота');

  chart.append('text')
    .attr('transform',
      `translate(${width / 2} ,${
        height + margin.top + 10})`)
    .style('text-anchor', 'middle')
    .text(xTitle);
}
