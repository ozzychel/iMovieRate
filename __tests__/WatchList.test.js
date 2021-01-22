import React from 'react';
import mockData from '../mockData';
import WatchList from '../components/WatchList';
import { create } from 'react-test-renderer';

const mockFn = jest.fn();
let testRenderer;
let testInstance;

describe('<WatchList> component testing', () => {

  beforeEach(() => {
    testRenderer = create(<WatchList
      userList={mockData.user.wish_list}
      genresList={mockData.genresList}
      currentTab='WATCHLIST'
      changeView={mockFn}
      getSelectedMovie={mockFn}
      deleteFromList={mockFn}
      os={'ios'}
    />);
    testInstance = testRenderer.root;
  });

  afterEach(() => jest.clearAllMocks());

  it('renders', () => {
    expect(testRenderer.toJSON()).toBeTruthy();
  });

  it('renders vertical scroll view', () => {
    let elem = testInstance.findByProps({testID:'scroll_view'});
    expect(elem.props.horisontal).toBeFalsy();
  });

  it('scroll view shows scroll indicator', () => {
    let elem = testInstance.findByProps({testID:'scroll_view'});
    expect(elem.props.showsVerticalScrollIndicator).toBeTruthy();
  });

  it('scroll view displays correct number of movies', () => {
    let elem = testInstance.findAllByProps({testID:'movie'});
    expect(elem.length).toBe(5);
  });

  it('footer has correct styling', () => {
    let elem = testInstance.findByProps({testID:'footer'});
    expect(elem.props.style.height).toBe(160);
  });

  it('renders correct text if list is empty', () => {
    testRenderer = create(<WatchList
      userList={[]}
      genresList={mockData.genresList}
      currentTab='WATCHLIST'
      changeView={mockFn}
      getSelectedMovie={mockFn}
      deleteFromList={mockFn}
      os={'ios'}
    />);
    testInstance = testRenderer.root;
    let elem = testInstance.findByProps({testID:'empty_msg'});
    expect(elem.props.children).toContain('any saved lists yet');
  });

  it('as', () => {
    let elem = testInstance.findByProps({testID:'scroll_view'});
  });

  it('as', () => {
    let elem = testInstance.findByProps({testID:'scroll_view'});
  });

  it('as', () => {
    let elem = testInstance.findByProps({testID:'scroll_view'});
  });

  it('as', () => {
    let elem = testInstance.findByProps({testID:'scroll_view'});
  });

  it('as', () => {
    let elem = testInstance.findByProps({testID:'scroll_view'});
  });

  it('as', () => {
    let elem = testInstance.findByProps({testID:'scroll_view'});
  });

  it('as', () => {
    let elem = testInstance.findByProps({testID:'scroll_view'});
  });

});
