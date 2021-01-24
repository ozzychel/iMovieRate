import React from 'react';
import mockData from '../mockData';
import MovieView from '../components/MovieView';
import { create, act } from 'react-test-renderer';

const mockFn = jest.fn();
let testRenderer;
let testInstance;

jest.mock('../components/helperFunctions/serverRequests.js', () => mockData.omdb[0]);

describe('<MovieView> component testing', () => {

  beforeEach(() => {
    act(() => {
      testRenderer = create (<MovieView
        selectedMovie={[mockData.movie_tmdb]}
        genresList={mockData.genresList}
        userList={mockData.user.wish_list}
        addToList={mockFn}
        getSelectedMovie={mockFn}
        changeView={mockFn}
      />)
    })
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

  it('scroll view doesn\'t have scroll indicator', () => {
    let elem = testInstance.findByProps({testID:'scroll_view'});
    expect(elem.props.showsVerticalScrollIndicator).toBeFalsy();
  });

  it('renders correct movie title', () => {
    let elem = testInstance.findByProps({testID:'movie_title'});
    expect(elem.props.children).toBe('Batman Begins');
  });

  it('renders correct movie release year', () => {
    let elem = testInstance.findByProps({testID:'movie_year'});
    expect(elem.props.children).toBe('2005');
  });

  it('renders correct movie duration', () => {
    let elem = testInstance.findByProps({testID:'movie_duration'});
    expect(elem.props.children).toBe('2:20h');
  });



});