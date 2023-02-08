/**
 * @jest-environment jsdom
 */
/* eslint-disable max-len */
import React from 'react';
import ReactDOM from 'react-dom';
import '@testing-library/jest-dom';
import { render, screen, within, fireEvent } from '@testing-library/react';
import { renderWithProviders } from '../__mocks__/test-utils.js';
import { product, styles } from '../__mocks__/mockProductAndStylesData.js';

import ImageGallery from '../ProductDetail/ImageGallery.jsx';
import Styles from '../ProductDetail/Styles.jsx';
import AddToCart from '../ProductDetail/AddToCart.jsx';
import ProductDescription from '../ProductDetail/ProductDescription.jsx';
import ShareSocialMedia from '../ProductDetail/ShareSocialMedia.jsx';

const state = {
  currentProduct: product,
  currentProductStyles: styles
};

describe('Image Gallery Tests', () => {
  it('Should render a display image', async () => {
    render(<ImageGallery style={styles.results[0]} />);
    const mainImage = await screen.getByRole('presentation');
    expect(mainImage).not.toEqual(null);
  });
  it('Should render at most 5 thumbnails at a time', async () => {
    render(<ImageGallery style={styles.results[0]} />);
    const thumbnails = await screen.getAllByRole('img', { class: 'carousel-item-thumbnail' });
    expect(thumbnails).toHaveLength(5);
  });
  it('Should display 2 visible navigation buttons on load', async () => {
    render(<ImageGallery style={styles.results[0]} />);
    const navButtons = await screen.getAllByRole('button', { class: 'navigate', visibility: 'visible' });
    expect(navButtons).toHaveLength(2);
  });
  it('Should change display image to clicked thumbnail', async () => {
    render(<ImageGallery style={styles.results[0]} />);
    const thumbnails = await screen.getAllByRole('img', { class: 'carousel-item-thumbnail' });
    await fireEvent.click(thumbnails[1]);
    const newImage = await screen.getByRole('presentation');
    expect(newImage).toHaveAttribute('src', styles.results[1].url);
  });
});

// describe('Product Styles Tests', () => {
//   it('Should render style name', async () => {
//     const [currentStyle, setCurrentStyle] = React.useState(styles.results.filter((s) => s['default?'])[0] || styles[0]);
//     renderWithProviders(<Styles currentStyle={currentStyle} setCurrentStyle={setCurrentStyle} />, { preloadedState: { pd: state } });
//     const styleName = await screen.getByText(styles.results[0].name);
//     expect(styleName).not.toEqual(null);
//   });
//   it('Should render product description', async () => {
//     const [currentStyle, setCurrentStyle] = React.useState(styles.results.filter((s) => s['default?'])[0] || styles[0]);
//     renderWithProviders(<Styles currentStyle={currentStyle} setCurrentStyle={setCurrentStyle} />, { preloadedState: { pd: state } });
//     const styleItems = await screen.getAllByRole('img', { class: 'style-item' });
//     expect(styleItems).toHaveLength(6);
//   });
//   it('Should only have one selected style at a time', async () => {
//     const [currentStyle, setCurrentStyle] = React.useState(styles.results.filter((s) => s['default?'])[0] || styles[0]);
//     renderWithProviders(<Styles currentStyle={currentStyle} setCurrentStyle={setCurrentStyle} />, { preloadedState: { pd: state } });
//     const styleItems = await screen.getAllByRole('em', { class: 'checkmark' });
//     expect(styleItems).toHaveLength(1);
//   });
// });

describe('Add to Cart Tests', () => {
  it('Should render add to cart button', async () => {
    renderWithProviders(<AddToCart style={styles.results[0]} />, { preloadedState: { pd: state } });
    const addToCartButton = await screen.getByText('Add to Cart');
    expect(addToCartButton).not.toEqual(null);
  });
  it('Should render favorites button', async () => {
    renderWithProviders(<AddToCart style={styles.results[0]} />, { preloadedState: { pd: state } });
    const favsButton = await screen.getByText('☆');
    expect(favsButton).not.toEqual(null);
  });
  // it('Should open size selection on click', async () => {
  //   renderWithProviders(<AddToCart style={styles.results[0]} />, { preloadedState: { pd: state } });
  //   const sizeDropdown = await document.querySelector('#dropdown-size-buttons');
  //   await fireEvent.click(sizeDropdown);
  //   const dropdownButton = await document.querySelector('#size-dropdown');
  //   expect(dropdownButton).toHaveClass('show');
  // });
});

describe('Product Description Tests', () => {
  it('Should render product description', async () => {
    renderWithProviders(<ProductDescription />, { preloadedState: { pd: state } });
    const descrip = await screen.getByText(state.currentProduct.description);
    expect(descrip).not.toEqual(null);
  });

  it('Should render product slogan', async () => {
    renderWithProviders(<ProductDescription />, { preloadedState: { pd: state } });
    const slogan = await screen.getByText(state.currentProduct.slogan);
    expect(slogan).not.toEqual(null);
  });

  it('Should render product features', async () => {
    renderWithProviders(<ProductDescription />, { preloadedState: { pd: state } });
    const list = await screen.getByRole('list');
    const { getAllByRole } = within(list);
    const items = getAllByRole('listitem');
    expect(items).toHaveLength(2);
  });
});

describe('Social Media Icons Test', () => {
  it('Should render the Facebook icon', () => {
    render(<ShareSocialMedia />);
    expect(screen.getByTestId('fb')).not.toEqual(null);
  });
  it('Should render the Twitter icon', () => {
    render(<ShareSocialMedia />);
    expect(screen.getByTestId('twt')).not.toEqual(null);
  });
  it('Should render the Pinterest icon', () => {
    render(<ShareSocialMedia />);
    expect(screen.getByTestId('pnt')).not.toEqual(null);
  });
});
