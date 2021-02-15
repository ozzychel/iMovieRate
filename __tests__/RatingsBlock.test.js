import React from 'react';
import { create } from 'react-test-renderer';

import RatingsBlock from '../components/MovieView_comp/RatingsBlock';
import mockData from '../mockData';

let testRenderer;
let testInstance;

describe('<RatingsBlock> component testing', () => {
  beforeEach(() => {
    testRenderer = create(<RatingsBlock movie_omdb={mockData.omdb[0]} />);
    testInstance = testRenderer.root;
  });

  afterEach(() => jest.clearAllMocks());

  it('renders', () => {
    expect(testRenderer.toJSON()).toBeTruthy();
  });

  it('renders correct imdb logo', () => {
    const elem = testInstance.findByProps({ testID: 'imdb_logo' });
    expect(elem.props.source.uri).toBe(
      'https://ia.media-imdb.com/images/M/MV5BODc4MTA3NjkzNl5BMl5BcG5nXkFtZTgwMDg0MzQ2OTE@._V1_.png'
    );
  });

  it('renders correct imdb rating', () => {
    const elem = testInstance.findByProps({ testID: 'imdb_rating' });
    expect(elem.props.children).toBe('8.2 / 10');
  });

  it('renders N/A if no imbd rating provided', () => {
    testRenderer = create(
      <RatingsBlock movie_omdb={deleteRating(mockData.omdb[0], 'imdbRating')} />
    );
    testInstance = testRenderer.root;
    const elem = testInstance.findByProps({ testID: 'imdb_rating' });
    expect(elem.props.children).toBe('N/A');
  });

  it('renders correct metascore rating', () => {
    const elem = testInstance.findByProps({ testID: 'mscore_rating' });
    expect(elem.props.children).toBe('70');
  });

  it('renders N/A if no metascore rating provided', () => {
    testRenderer = create(
      <RatingsBlock movie_omdb={deleteRating(mockData.omdb[0], 'Metascore')} />
    );
    testInstance = testRenderer.root;
    const elem = testInstance.findByProps({ testID: 'mscore_rating' });
    expect(elem.props.children).toBe('N/A');
  });

  it('renders correct RT logo', () => {
    const elem = testInstance.findByProps({ testID: 'rt_logo' });
    expect(elem.props.source).toBeTruthy();
  });

  it('renders correct RT rating', () => {
    const elem = testInstance.findByProps({ testID: 'rt_rating' });
    expect(elem.props.children.props.children).toBe('84%');
  });

  it('renders N/A if no RT rating provided', () => {
    testRenderer = create(<RatingsBlock movie_omdb={deleteRT(mockData.omdb[0])} />);
    testInstance = testRenderer.root;
    const elem = testInstance.findByProps({ testID: 'rt_rating' });
    expect(elem.props.children.props.children).toBe('N/A');
  });
});

const deleteRating = (movie, param) => {
  const newMovie = {};
  for (const key in movie) newMovie[key] = movie[key];
  delete newMovie[param];
  return newMovie;
};

const deleteRT = (movie) => {
  if (movie['Ratings']) {
    for (let i = 0; i < movie['Ratings'].length; i++) {
      if (movie['Ratings'][i]['Source'] === 'Rotten Tomatoes') {
        movie['Ratings'].splice(i, 1);
        break;
      }
    }
  }
  return movie;
};
