import './style.scss';

const components = require('./components/factory');
const layouts = require('./layouts/factory');

const localData = localStorage.getItem('state');
const data = localData != null
  ? JSON.parse(localData)
  : require('./data.json');

const BeelineJS = require('beelinejs-core');

BeelineJS
  .create({
    components,
    layouts
  })
  .onLoad(data);
