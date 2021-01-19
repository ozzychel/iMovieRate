import React from 'react';
import mockData from '../mockData';
import TrailerBlock from '../components/MovieView_comp/TrailerBlock';
import { create } from 'react-test-renderer';

const mockFn = jest.fn();
let testRenderer;
let testInstance;

describe('<TrailerBlock> component testing', () => {

  beforeEach(() => {
    testRenderer = create(<TrailerBlock movieTrailer={mockData.trailer["272"]}/>);
    testInstance = testRenderer.root;
  });

  afterEach(() => jest.clearAllMocks());

  it('renders', () => {
    expect(testRenderer.toJSON()).toBeTruthy();
  });

  it('renders correct title', () => {
    let elem = testInstance.findByProps({testID:'title'});
    expect(elem.props.children).toBe('Trailer');
  });

  it('renders correct trailer', () => {
    let elem = testInstance.findByProps({testID:'webview'});
    expect(elem.props.source).toBeTruthy();
  });

  it('doesn\'t render if no trailer provided', () => {
    testRenderer = create(<TrailerBlock movieTrailer={[]}/>);
    testInstance = testRenderer.root;
    expect(testRenderer.toJSON()).toBeFalsy();
  })

});