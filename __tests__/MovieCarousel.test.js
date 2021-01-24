import React from 'react';
import mockData from '../mockData';
import MovieCarousel from '../components/helperFunctions/MovieCarousel';
import RenderImage from '../components/helperFunctions/RenderImage';
import { create } from 'react-test-renderer';

const mockFn = jest.fn();
let testRenderer;
let testInstance;

describe('<MovieCarousel> component testing', () => {

  beforeEach(() => {
    testRenderer = create(<MovieCarousel
      movieList={mockData.trending.results}
      carouselHeader={"In Theaters Now"}
      changeView={mockFn}
      getSelectedMovie={mockFn}
    />);
    testInstance = testRenderer.root;
  });

  afterEach(() => jest.clearAllMocks());

  it('renders', () => {
    expect(testRenderer.toJSON()).toBeTruthy();
  });

  it('renders correct carousel header', () => {
    let elem = testInstance.findByProps({testID:'header_text'});
    expect(elem.props.children).toBe('In Theaters Now');
  });

  it('carousel should scroll horizontally', () => {
    let elem = testInstance.findByProps({testID:'scroll_view'});
    expect(elem.props.horizontal).toBe(true);
  });

  it('carousel should not have scroll indicator', () => {
    let elem = testInstance.findByProps({testID:'scroll_view'});
    expect(elem.props.showsHorizontalScrollIndicator).toBe(false);
  });

  it('carousel should display all movies', () => {
    let elem = testInstance.findByProps({testID:'scroll_view'});
    expect(elem.props.children.length).toBe(10);
  });

  it('renders movie with correct image', () => {
    let image = testInstance.findAllByProps({testID:'movie_image'})[0];
    expect(image.props.mainObj.poster_path).toBe('/1P3ZyEq02wcTMd3iE4ebtLvncvH.jpg')
  });

  it('renders movie with correct title', () => {
    let mov = testInstance.findAllByProps({testID:'movie_title'})[0];
    expect(mov.props.children).toBe('Batman Begins');
  });

  it('movie title fontSize depends on title length', () => {
    let elem = testInstance.findAllByProps({testID:'movie_title'})[0];
    expect(elem.props.style.fontSize).toBe(16);
  })

  it('renders movie with correct date', () => {
    let mov = testInstance.findAllByProps({testID:'movie_year'})[0];
    expect(mov.props.children).toBe('2005');
  });

  it('doesn\'t display star if movie is not in list', () => {
    let mov = testInstance.findAllByProps({testID:'inlist_star'})[0];
    expect(mov.props.children).toBeFalsy();
  });

  it('displays star if movie is in list', () => {
    testRenderer = create(<MovieCarousel
      movieList={addToList(mockData.trending.results)}
      carouselHeader={"In Theaters Now"}
      changeView={mockFn}
      getSelectedMovie={mockFn}
    />);
    testInstance = testRenderer.root;
    let mov = testInstance.findAllByProps({testID:'inlist_star'})[0];
    expect(mov.props.children.props.children).toBe('★ ')
  });

  it('click on movie should change view and get selected', () => {
    let movie = testInstance.findAllByProps({testID:'movie'})[0];
    movie.props.onPress();
    expect(mockFn.mock.calls.length).toBe(2)
  });

});

const addToList = (list) => {
  let newList = [...list];
  newList[0].inList = true;
  return newList;
}