/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen, fireEvent, queryByTestId } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Outfit from '../itemsComparison/Outfit';
import OutfitList from '../itemsComparison/OutfitList';
import Product from '../itemsComparison/Product';
import ProductModal from '../itemsComparison/ProductModal';
import { renderWithProviders } from '../__mocks__/test-utils.js';
import {
  sampleOutfitDefault, sampleOutfitSale, sampleOutfitList, sampleProductDefault, sampleProductSale
} from '../__mocks__/RO/mockData';

const mockedFunction = jest.fn();

test('loads and displays a product', async () => {
  render(<Product item={sampleOutfitDefault} />);
  expect(screen.getByText('Morning Joggers')).toHaveTextContent('Morning Joggers');
});

test('loads and displays an outfit item', async () => {
  render(<Outfit item={sampleOutfitDefault} />);
  expect(screen.getByText('Morning Joggers')).toHaveTextContent('Morning Joggers');
});

test('loads and displays the correct price in outfit card when sale price not present', async () => {
  render(<Outfit item={sampleOutfitDefault} />);
  expect(screen.getByTestId('outfitDefault')).toBeTruthy();
});

test('loads and displays the correct price  in outfit card when sale price is present', async () => {
  render(<Outfit item={sampleOutfitSale} />);
  expect(screen.getByTestId('outfitSale')).toBeTruthy();
});

test('loads and displays the correct price in product card when sale price not present', async () => {
  render(<Product item={sampleProductDefault} />);
  expect(screen.getByTestId('productDefault')).toBeTruthy();
});

test('loads and displays the correct price  in product card when sale price is present', async () => {
  render(<Product item={sampleProductSale} />);
  expect(screen.getByTestId('productSale')).toBeTruthy();
});

test('loads and displays outfit component elements', async () => {
  renderWithProviders(<OutfitList relatedList={sampleOutfitList} />);
  expect(screen.getByText('Add to Outfit')).toHaveTextContent('Add to Outfit');
});

test('invokes function on click of remove from outfit icon', async () => {
  renderWithProviders(<Outfit item={sampleOutfitDefault} onRemoveFromOutfit={mockedFunction} />);
  const icon = screen.getByTestId('iconRemove');
  fireEvent.click(icon);
  expect(mockedFunction).toHaveBeenCalled();
});

test('displays modal on click of star icon', async () => {
  renderWithProviders(<Product item={sampleOutfitDefault} count={1} onUpdate={mockedFunction} changeModal={mockedFunction} />);
  const modalIcon = screen.getByTestId('modal');
  fireEvent.click(modalIcon);
  expect(mockedFunction).toHaveBeenCalled();
});

test('renders modal with correct product information', async () => {
  renderWithProviders(<ProductModal count={1} visible currentProduct={sampleProductSale} />);
  expect(screen.getByText('category')).toBeTruthy();
});

test('renders modal with information from products that contain arrays', async () => {
  renderWithProviders(<ProductModal count={1} visible currentProduct={sampleProductDefault} />);
  expect(screen.getByText('Rubber')).toBeTruthy();
});

test('renders modal with correct product information from current card', async () => {
  renderWithProviders(<ProductModal count={1} visible item={sampleProductSale} currentProduct={sampleProductSale} />);
  expect(screen.getByText('category')).toBeTruthy();
});

test('renders modal with information from current card that contain arrays', async () => {
  renderWithProviders(<ProductModal count={1} visible item={sampleProductDefault} currentProduct={sampleProductSale}/>);
  expect(screen.getByText('sole')).toBeTruthy();
});

test('invalid properties should not appear in the modal', async () => {
  const { queryByTestId } = renderWithProviders(<ProductModal count={1} visible item={sampleProductSale} currentProduct={sampleProductDefault}/>);
  expect(queryByTestId('campus')).toBeNull();
});

test('outfit items should be present in the outfit list', async () => {
  renderWithProviders(<OutfitList relatedList={sampleOutfitList} />);
  expect(screen.getByText('Add to Outfit')).toBeTruthy();
});


// TODO: FIX ISSUE WITH REDUX
test('invokes function on click of add to outfit container', async () => {
  renderWithProviders(<OutfitList relatedList={sampleOutfitList} onAddToOutfit={mockedFunction}
  currentProduct={sampleOutfitDefault} />);
  const outfitContainer = screen.getByTestId('addToOutfit');
  fireEvent.click(outfitContainer);
  expect(mockedFunction).toHaveBeenCalled();
});

test('invokes function on click of next item button', async () => {
  renderWithProviders(<OutfitList relatedList={sampleOutfitList} nextOutfitItem={mockedFunction}
  currentProduct={sampleOutfitDefault} outfitList={OutfitList}/>);
  const outfitContainer = screen.getByTestId('nextItem');
  fireEvent.click(outfitContainer);
  expect(mockedFunction).toHaveBeenCalled();
});
