import React from 'react';
import mockData from '../mockData';
import HomeTab from '../components/HomeTab';
import { create } from 'react-test-renderer';

const mockFn = jest.fn();
let testRenderer;
let testInstance;

describe('<HomeTab> component testing', () => {

  beforeEach(() => {
    testRenderer = create(<HomeTab
      trendingDayList={mockData.trending.results}
      trendingWeekList={mockData.trending.results}
      nowPlayingList={mockData.trending.results}
      changeView={mockFn}
      getSelectedMovie={mockFn}
    />);
    testInstance = testRenderer.root;
  });

  afterEach(() => jest.clearAllMocks());

  it('renders', () => {
    expect(testRenderer.toJSON()).toBeTruthy();
  });

  it('renders vertical scroll view', () => {
    let elem = testInstance.findByProps({testID:'scroll_view'});
    expect(elem.props.horizontal).toBeFalsy();
  });

  it('scroll view doesn\'t show vertical scroll indicator', () => {
    let elem = testInstance.findByProps({testID:'scroll_view'});
    expect(elem.props.showsVerticalScrollIndicator).toBeFalsy();
  });

  it('renders 3 movie carousels', () => {
    let elem = testInstance.findByProps({testID: 'scroll_view'});
    expect(elem.props.children.length).toBe(3);
  });

});