import React from 'react';
import { create } from 'react-test-renderer';

import TrailerBlock from '../components/MovieView_comp/TrailerBlock';
import mockData from '../mockData';

let testRenderer;
let testInstance;

describe('<TrailerBlock> component testing', () => {
  beforeEach(() => {
    testRenderer = create(<TrailerBlock movieTrailer={mockData.trailer['272']} />);
    testInstance = testRenderer.root;
  });

  afterEach(() => jest.clearAllMocks());

  it('renders', () => {
    expect(testRenderer.toJSON()).toBeTruthy();
  });

  it('renders correct title', () => {
    const elem = testInstance.findByProps({ testID: 'title' });
    expect(elem.props.children).toBe('Trailer');
  });

  it('renders correct trailer', () => {
    const elem = testInstance.findByProps({ testID: 'webview' });
    expect(elem.props.source).toBeTruthy();
  });

  it("doesn't render if no trailer provided", () => {
    testRenderer = create(<TrailerBlock movieTrailer={[]} />);
    testInstance = testRenderer.root;
    expect(testRenderer.toJSON()).toBeFalsy();
  });
});
