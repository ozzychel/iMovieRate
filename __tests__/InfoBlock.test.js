import React from 'react';
import { create } from 'react-test-renderer';

import InfoBlock from '../components/MovieView_comp/InfoBlock';
import mockData from '../mockData';

let testRenderer;
let testInstance;

const deleteTagline = (movie) => {
  const newMovie = {};
  for (const key in movie) newMovie[key] = movie[key];
  newMovie.tagline = '';
  return newMovie;
};

describe('<InfoBlock> component testing', () => {
  beforeEach(() => {
    testRenderer = create(
      <InfoBlock movie_tmdb={mockData.movie_tmdb} genres={['Action', 'Crime', 'Drama']} />
    );
    testInstance = testRenderer.root;
  });

  afterEach(() => jest.clearAllMocks());

  it('renders', () => {
    expect(testRenderer.toJSON()).toBeTruthy();
  });

  it('renders correct image', () => {
    const elem = testInstance.findByProps({ testID: 'image' });
    expect(elem.props.mainObj.poster_path).toBe('/1P3ZyEq02wcTMd3iE4ebtLvncvH.jpg');
  });

  it('renders correct number of genres', () => {
    const elem = testInstance.findByProps({ testID: 'genres' });
    expect(elem.props.children.length).toBe(3);
  });

  it('renders correct genres', () => {
    const elem = testInstance.findByProps({ testID: 'genres' });
    const genreObj = elem.props.children[0];
    expect(genreObj.props.children.props.children).toBe('Action');
  });

  it('renders genres as horizontal scroll view', () => {
    const elem = testInstance.findByProps({ testID: 'genres' });
    expect(elem.props.horizontal).toBe(true);
  });

  it("genres scroll view doesn't show scroll indicator", () => {
    const elem = testInstance.findByProps({ testID: 'genres' });
    expect(elem.props.showsHorizontalScrollIndicator).toBe(false);
  });

  it('renders correct movie overview', () => {
    const elem = testInstance.findByProps({ testID: 'overview' });
    expect(elem.props.children).toContain(
      'a symbol of fear for the criminal underworld - The Batman.'
    );
  });

  it('movie overview is a vertical scrollview', () => {
    const elem = testInstance.findByProps({ testID: 'overview_scroll' });
    expect(elem.props.horizontal).toBeFalsy();
  });

  it("movie overview doesn't show scroll indicator", () => {
    const elem = testInstance.findByProps({ testID: 'overview_scroll' });
    expect(elem.props.showsVerticalScrollIndicator).toBe(false);
  });

  it('renders correct tagline text', () => {
    const elem = testInstance.findByProps({ testID: 'tagline' });
    expect(elem.props.children).toBe('"Evil fears the knight."');
  });

  it("doesn't render tagline if not provided", () => {
    testRenderer = create(
      <InfoBlock
        movie_tmdb={deleteTagline(mockData.movie_tmdb)}
        genres={['Action', 'Crime', 'Drama']}
      />
    );
    testInstance = testRenderer.root;
    const elem = testInstance.findAllByProps({ testID: 'tagline' });
    expect(elem.length).toBeFalsy();
  });
});
