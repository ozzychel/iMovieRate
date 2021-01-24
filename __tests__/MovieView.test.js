import React from 'react';
import mockData from '../mockData';
import MovieView from '../components/MovieView';
import { create, act } from 'react-test-renderer';

import axios from 'axios';
import {jest} from '@jest/globals';
import api from '../components/helperFunctions/serverRequests';

const mockFn = jest.fn();
let testRenderer;
let testInstance;

jest.spyOn(api, 'getMovieTrailer').mockImplementation(() =>
  Promise.resolve(mockData.trailer['272'])
);
jest.spyOn(api, 'getCastListFromServer').mockImplementation(() =>
  Promise.resolve([
    [...mockData.cast['272'].cast],
    [...mockData.cast['272'].cast],
    [...mockData.cast['272'].cast],
  ])
);
jest.spyOn(api, 'getDataFromOMDB').mockImplementation(() =>
  Promise.resolve(mockData.omdb[0])
);
jest.spyOn(api, 'getRecommendedList').mockImplementation(() =>
  Promise.resolve(mockData.trending.results)
);

jest.spyOn(api, 'getMovieImages').mockImplementation(() => Promise.resolve(mockData.images['272']));


describe('<MovieView> component testing', () => {

  beforeEach(async () => {
    await act(async () => {
      testRenderer = create (<MovieView
        selectedMovie={[mockData.movie_tmdb]}
        genresList={mockData.genresList}
        userList={mockData.user.wish_list}
        addToList={mockFn}
        getSelectedMovie={mockFn}
        changeView={mockFn}
      />);
    });
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
    let elem = testInstance.findAllByProps({testID:'movie_title'})[0];
    expect(elem.props.children).toBe('Batman Begins');
  });

  it('renders correct movie release year', () => {
    let elem = testInstance.findAllByProps({testID:'movie_year'})[0];
    expect(elem.props.children).toBe('2005');
  });

  it('renders correct movie duration', () => {
    let elem = testInstance.findByProps({testID:'movie_duration'});
    expect(elem.props.children).toBe('2:20h');
  });

  it('renders InfoBlock component', () => {
    let elem = testInstance.findByProps({testID:'info_block'});
    expect(elem).toBeTruthy();
  });

  it('renders AddToListButtonBlock component', () => {
    let elem = testInstance.findByProps({testID:'add_btn_block'});
    expect(elem).toBeTruthy();
  });

  it('renders RatingsBlock component', () => {
    let elem = testInstance.findByProps({testID:'ratings_block'});
    expect(elem).toBeTruthy();
  });

  it('renders CastBlock component', () => {
    let elem = testInstance.findByProps({testID:'cast_block'});
    expect(elem).toBeTruthy();
  });

  it('renders TrailerBlock component', async () => {
    let elem = testInstance.findByProps({testID:'trailer_block'});
    expect(elem).toBeTruthy();
  });

  it('renders MovieCarousel component', () => {
    let elem = testInstance.findByProps({testID:'movie_carousel'});
    expect(elem).toBeTruthy();
  });

  it('renders ImagesBlock component', () => {
    let elem = testInstance.findByProps({testID:'images_block'});
    expect(elem).toBeTruthy();
  });

});