import * as d3 from 'd3';

export const EVENTS = {
  CLICK_NODE: 'click_node',
  CLICK_HULL: 'click_hull',
};

export const eventDispatch = d3.dispatch(EVENTS.CLICK_NODE, EVENTS.CLICK_HULL);

export const svgConfig = {
  WIDTH: window.innerWidth || 960,
  HEIGHT: 600,
};

export const hullConfig = {
  GROUP_CLASS_NAME_SELECTOR: 'hulls',
  CLASS_NAME_SELECTOR: 'hull',
};

export const nodeConfig = {
  CIRCLE_RADIUS: 30,
  CLASS_NAME_SELECTOR: 'node-group',
  getGroupNumberColor: (number) => d3.schemeTableau10[number % 10],
};

export const linkConfig = {
  GROUP_CLASS_NAME_SELECTOR: 'links',
  CLASS_NAME_SELECTOR: 'link',
  LENGTH: 100,
};
