import React from 'react';
import { create } from 'react-test-renderer';

import WatchList from '../components/WatchList';
import mockData from '../mockData';

const mockFn = jest.fn();
let testRenderer;
let testInstance;

describe('<WatchList> component testing', () => {
  beforeEach(() => {
    testRenderer = create(
      <WatchList
        userList={mockData.user.wish_list}
        genresList={mockData.genresList}
        currentTab="WATCHLIST"
        changeView={mockFn}
        getSelectedMovie={mockFn}
        deleteFromList={mockFn}
        os={'ios'}
      />
    );
    testInstance = testRenderer.root;
  });

  afterEach(() => jest.clearAllMocks());

  it('renders', () => {
    expect(testRenderer.toJSON()).toBeTruthy();
  });

  it('renders vertical scroll view', () => {
    const elem = testInstance.findByProps({ testID: 'scroll_view' });
    expect(elem.props.horisontal).toBeFalsy();
  });

  it('scroll view shows scroll indicator', () => {
    const elem = testInstance.findByProps({ testID: 'scroll_view' });
    expect(elem.props.showsVerticalScrollIndicator).toBeTruthy();
  });

  it('scroll view displays correct number of movies', () => {
    const elem = testInstance.findAllByProps({ testID: 'inlist_movie' });
    expect(elem.length).toBe(5);
  });

  it('footer has correct styling', () => {
    const elem = testInstance.findByProps({ testID: 'footer' });
    expect(elem.props.style.height).toBe(160);
  });

  it('renders correct text if list is empty', () => {
    testRenderer = create(
      <WatchList
        userList={[]}
        genresList={mockData.genresList}
        currentTab="WATCHLIST"
        changeView={mockFn}
        getSelectedMovie={mockFn}
        deleteFromList={mockFn}
        os={'ios'}
      />
    );
    testInstance = testRenderer.root;
    const elem = testInstance.findByProps({ testID: 'empty_msg' });
    expect(elem.props.children).toContain('any saved lists yet');
  });
});
