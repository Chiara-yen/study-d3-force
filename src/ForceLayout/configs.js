import * as d3 from 'd3';

export const svgConfig = {
  WIDTH: window.innerWidth || 960,
  HEIGHT: 600,
};

export const nodeConfig = {
  CIRCLE_RADIUS: 30,
  CLASS_NAME_SELECTOR: 'node-group',
  getGroupNumberColor: (number) => d3.schemeTableau10[number % 10],
};

export const linkConfig = {
  LENGTH: 100,
  CLASS_NAME_SELECTOR: 'link',
};
