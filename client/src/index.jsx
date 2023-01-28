import { render } from 'react-dom';
import React from 'react';
import App from './App.jsx';
import './assets/qa.css';
import './assets/pd.css';

const root = document.createElement('div');
root.setAttribute('id', 'root');
document.body.appendChild(root);

render(<App />, root);
