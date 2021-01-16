import React from 'react';
import mockData from '../mockData';
import Movie from '../components/Movie';
import RenderImage from '../components/helperFunctions/RenderImage'
import { create } from 'react-test-renderer';

const mockFn = jest.fn();
let testRenderer;
let testInstance;

describe('<Movie> component testing', () => {

  beforeEach(() => {
    testRenderer = create(<Movie
      movie = {mockData.singleMovie}
      genresList = {mockData.genresList}
      currentTab = {'WATCHLIST'}
      getSelectedMovie={mockFn}
      changeView={mockFn}
      deleteFromList={mockFn}
    />);
    testInstance = testRenderer.root;
  });

  afterEach(() => jest.clearAllMocks());

  it('renders', () => {
    expect(testRenderer).toBeTruthy();
  });

  it('renders correct title and release year', () => {
    const elem = testInstance.findByProps({testID:'title_text'}).props.children;
    const mock = mockData.singleMovie.title + ` (${mockData.singleMovie.release_date.slice(0,4)})`;
    expect(elem).toBe(mock);
  });

  it('renders correct genres', async () => {
    const elem = testInstance.findByProps({testID:'movie_genres'}).props.children;
    expect(elem).toBe('Action, Crime, Drama');
  });

  it('renders delete button', () => {
    const btn = testInstance.findByProps({testID: 'delete_btn'});
    expect(btn).toBeTruthy();
  });

  it('click on delete button removes movie', () => {
    const btn = testInstance.findByProps({testID: 'delete_btn'});
    btn.props.onPress();
    expect(mockFn).toHaveBeenCalled();
  });

  it('renders correct picture', () => {
    let elem = testInstance.findByType(RenderImage);
    expect(elem.props.mainObj.poster_path).toEqual(mockData.singleMovie.poster_path);
  });

  it('doesn\'t render delete button if current tab != "WATCHLIST"', () => {
    testRenderer.update(<Movie
      movie = {mockData.singleMovie}
      genresList = {mockData.genresList}
      currentTab = {'MOVIE VIEW'}
      getSelectedMovie={mockFn}
      changeView={mockFn}
      deleteFromList={mockFn}
    />)
    testInstance = testRenderer.root;
    let buttons = testInstance.findAllByProps({testID: 'delete_btn'});
    expect(buttons.length).not.toBeTruthy();
  });

  it('click on movie switches tabs', () => {
    let elem = testInstance.findByProps({testID:'movie_inst'});
    elem.props.onPress();
    expect(mockFn).toHaveBeenCalled();
  })

})