/* ---- FEC Testing Requirements --------------

Controller functions (via unit tests)
Custom models (via unit tests)
React components (via unit tests)
Seeding function (via unit tests)
One end-to-end test for each service

  ---------------------------------------------
  */
/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import ProductList from '../itemsComparison/ProductList.jsx';

// does component render to the screen (example - title)

let container = null;
beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it('Renders product cards to the dom upon page load', () => {
  act(() => {
    render(<ProductList />, container);
  });
  expect(container.textContent).toEqual('Related Productspreviousnext');
});

// /* ---- FEC Testing Requirements --------------

// Controller functions (via unit tests)
// Custom models (via unit tests)
// React components (via unit tests)
// Seeding function (via unit tests)
// One end-to-end test for each service

//   ---------------------------------------------
// */
