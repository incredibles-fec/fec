import React from 'react';
import { render } from 'react-dom';
import App from './App.jsx';
import './assets/qa.css';

const root = document.createElement('div');
const modal = document.createElement('modal');
root.setAttribute('id', 'root');
modal.setAttribute('id', 'modal');
document.body.appendChild(root);
document.body.appendChild(modal);

render(<App />, root);
