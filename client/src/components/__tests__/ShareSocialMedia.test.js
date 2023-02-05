/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import ShareSocialMedia from '../ProductDetail/ShareSocialMedia';

describe('Social Media Icons', () => {
  test('Should render the Facebook icon', () => {
    render(<ShareSocialMedia />);
    expect(screen.getByTestId('fb')).not.toEqual(null);
  });
  test('Should render the Twitter icon', () => {
    render(<ShareSocialMedia />);
    expect(screen.getByTestId('twt')).not.toEqual(null);
  });
  test('Should render the Pinterest icon', () => {
    render(<ShareSocialMedia />);
    expect(screen.getByTestId('pnt')).not.toEqual(null);
  });
});
