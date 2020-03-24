import * as d3 from 'd3';
import './tree.css';
import { makeFileElement } from './utils';
export const data = {
  name: 'D6',
  children: [
    {
      name: 'D4',
      data: 0,
      children: [
        makeFileElement({ name: 'F1', data: 1 }),
        makeFileElement({ name: 'F2', data: 2 })
      ]
    },
    {
      name: 'D5',
      data: 0,
      children: [makeFileElement({ name: 'F3', data: 3 })]
    }
  ]
};

const width = 500;
const root = d3.hierarchy(data);
const dx = 20;
const dy = width / (root.height + 1);
const tree = d3.tree().nodeSize([dx, dy]);
tree(root);

let x0 = Infinity;
let x1 = -x0;
root.each(d => {
  if (d.x > x1) x1 = d.x;
  if (d.x < x0) x0 = d.x;
});

const svg = d3
  .select(document.getElementsByTagName('svg')[0])
  .style('width', '100%')
  .style('height', 'auto');

const g = svg
  .append('g')
  .attr('font-family', 'sans-serif')
  .attr('font-size', 10)
  .attr('transform', `translate(${dy / 3},${dx - x0})`);

const link = g
  .append('g')
  .attr('fill', 'none')
  .attr('stroke', '#555')
  .attr('stroke-opacity', 0.4)
  .attr('stroke-width', 1.5)
  .selectAll('path')
  .data(root.links())
  .enter()
  .append('path')
  .attr(
    'd',
    d3
      .linkHorizontal()
      .x(d => d.y)
      .y(d => d.x)
  );

const node = g
  .append('g')
  .selectAll('g')
  .data(root.descendants())
  .enter()
  .append('g')
  .attr('transform', d => `translate(${d.y},${d.x})`);

node
  .append('circle')
  .attr('fill', d => (d.children ? '#555' : '#999'))
  .attr('r', 2.5);

node
  .append('text')
  .attr('dy', '0.31em')
  .attr('x', d => (d.children ? -6 : 6))
  .attr('text-anchor', d => (d.children ? 'end' : 'start'))
  .text(d => d.data.name)
  .select(function() {
    return this.parentNode.insertBefore(this.cloneNode(true), this);
  })
  .attr('stroke', 'white')
  .attr('stroke-linejoin', 'round')
  .attr('stroke-width', 3);

// const el = svg.node();
