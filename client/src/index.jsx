import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './App.jsx';
import { setupStore } from './state/store';
import './assets/pd.css';
import './assets/david.css';
import './assets/ro.css';
<<<<<<< HEAD
import './assets/dark.css';
=======
import './assets/darkMode.css';
>>>>>>> 08389baa2452c368cd2ac1a947e09e83deb99ac5

render(
  <Provider store={setupStore()}>
    <App />
  </Provider>,
  document.getElementById('root')
);
