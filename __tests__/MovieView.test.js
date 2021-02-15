import { jest } from '@jest/globals';
import React from 'react';
import { create, act } from 'react-test-renderer';

import MovieView from '../components/MovieView';
import api from '../components/helperFunctions/serverRequests';
import mockData from '../mockData';

const mockFn = jest.fn();
let testRenderer;
let testInstance;

let getMovieTrailerSpy;
let getCastListFromServerSpy;
let getDataFromOMDBSpy;
let getRecommendedListSpy;
let getMovieImagesSpy;

const initSpies = () => {
  getMovieTrailerSpy = jest
    .spyOn(api, 'getMovieTrailer')
    .mockImplementation(() => Promise.resolve(mockData.trailer['272']));

  getCastListFromServerSpy = jest
    .spyOn(api, 'getCastListFromServer')
    .mockImplementation(() =>
      Promise.resolve([
        [...mockData.cast['272'].cast],
        [...mockData.cast['272'].cast],
        [...mockData.cast['272'].cast],
      ])
    );

  getDataFromOMDBSpy = jest
    .spyOn(api, 'getDataFromOMDB')
    .mockImplementation(() => Promise.resolve(mockData.omdb[0]));

  getRecommendedListSpy = jest
    .spyOn(api, 'getRecommendedList')
    .mockImplementation(() => Promise.resolve(mockData.trending.results));

  getMovieImagesSpy = jest
    .spyOn(api, 'getMovieImages')
    .mockImplementation(() => Promise.resolve(mockData.images['272']));
};

describe('<MovieView> component testing', () => {
  beforeEach(async () => {
    await initSpies();
    await act(async () => {
      testRenderer = create(
        <MovieView
          selectedMovie={[mockData.movie_tmdb]}
          genresList={mockData.genresList}
          userList={mockData.user.wish_list}
          addToList={mockFn}
          getSelectedMovie={mockFn}
          changeView={mockFn}
        />
      );
    });
    testInstance = testRenderer.root;
  });

  afterEach(() => jest.clearAllMocks());

  it('renders', () => {
    expect(testRenderer.toJSON()).toBeTruthy();
  });

  it('renders vertical scroll view', () => {
    const elem = testInstance.findByProps({ testID: 'scroll_view' });
    expect(elem.props.horizontal).toBeFalsy();
  });

  it("scroll view doesn't have scroll indicator", () => {
    const elem = testInstance.findByProps({ testID: 'scroll_view' });
    expect(elem.props.showsVerticalScrollIndicator).toBeFalsy();
  });

  it('renders correct movie title', () => {
    const elem = testInstance.findAllByProps({ testID: 'movie_title' })[0];
    expect(elem.props.children).toBe('Batman Begins');
  });

  it('renders correct movie release year', () => {
    const elem = testInstance.findAllByProps({ testID: 'movie_year' })[0];
    expect(elem.props.children).toBe('2005');
  });

  it('renders correct movie duration', () => {
    const elem = testInstance.findByProps({ testID: 'movie_duration' });
    expect(elem.props.children).toBe('2:20h');
  });

  it('renders InfoBlock component', () => {
    const elem = testInstance.findByProps({ testID: 'info_block' });
    expect(elem).toBeTruthy();
  });

  it('renders AddToListButtonBlock component', () => {
    const elem = testInstance.findByProps({ testID: 'add_btn_block' });
    expect(elem).toBeTruthy();
  });

  it('renders RatingsBlock component', () => {
    const elem = testInstance.findByProps({ testID: 'ratings_block' });
    expect(elem).toBeTruthy();
  });

  it('renders CastBlock component', () => {
    const elem = testInstance.findByProps({ testID: 'cast_block' });
    expect(elem).toBeTruthy();
  });

  it('renders TrailerBlock component', async () => {
    const elem = testInstance.findByProps({ testID: 'trailer_block' });
    expect(elem).toBeTruthy();
  });

  it('renders MovieCarousel component', () => {
    const elem = testInstance.findByProps({ testID: 'movie_carousel' });
    expect(elem).toBeTruthy();
  });

  it('renders ImagesBlock component', () => {
    const elem = testInstance.findByProps({ testID: 'images_block' });
    expect(elem).toBeTruthy();
  });
});
