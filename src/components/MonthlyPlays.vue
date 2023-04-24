<template>
    <div class="bg-white text-black shadow-md rounded-lg p-4 h-[325px]">
      <h3 class="text-xl font-semibold mb-4">Monthly Plays</h3>
      <div ref="chartContainer" class="w-full h-64"></div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted, onUnmounted } from 'vue';
  import * as d3 from 'd3';
  
  export default {
    name: 'MonthlyPlays',
    setup() {
      const chartContainer = ref(null);
      let svg;
  
      const data = [
        { month: 'Jan', plays: 1000 },
        { month: 'Feb', plays: 1200 },
        { month: 'Mar', plays: 800 },
        { month: 'Apr', plays: 1800 },
        { month: 'May', plays: 1500 },
        { month: 'Jun', plays: 2000 },
      ];
  
      const drawChart = () => {
        svg = d3
          .select(chartContainer.value)
          .append('svg')
          .attr('width', '100%')
          .attr('height', '100%');
  
        const width = parseInt(svg.style('width'));
        const height = parseInt(svg.style('height'));
  
        const xScale = d3
          .scaleBand()
          .domain(data.map((d) => d.month))
          .range([0, width])
          .padding(0.2);
  
        const yScale = d3
          .scaleLinear()
          .domain([0, d3.max(data, (d) => d.plays)])
          .nice()
          .range([height, 0]);
  
        const xAxis = d3.axisBottom(xScale);
        const yAxis = d3.axisLeft(yScale);
  
        svg
          .append('g')
          .attr('transform', `translate(0, ${height})`)
          .call(xAxis)
          .attr('class', 'text-black');
  
        svg
          .append('g')
          .call(yAxis)
          .attr('class', 'text-black');
  
        svg
          .selectAll('.bar')
          .data(data)
          .join('rect')
          .attr('class', 'bar')
          .attr('x', (d) => xScale(d.month))
          .attr('y', (d) => yScale(d.plays))
          .attr('height', (d) => height - yScale(d.plays))
          .attr('width', xScale.bandwidth())
          .attr('fill', '#1F2937');
      };
  
      onMounted(() => {
        drawChart();
      });
  
      onUnmounted(() => {
        svg.selectAll('*').remove();
      });
  
      return { chartContainer };
    },
  };
  </script>
  
  <style scoped>
  .bar:hover {
    fill: #374151;
    cursor: pointer;
  }
  </style>
  