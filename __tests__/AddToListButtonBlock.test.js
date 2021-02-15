import React from 'react';
import { create } from 'react-test-renderer';

import AddToListButtonBlock from '../components/MovieView_comp/AddToListButtonBlock';
import mockData from '../mockData';

const mockFn = jest.fn();
let testRenderer;
let testInstance;

const copyMovie = (mov) => {
  const inListMovie = {};
  for (const key in mov) inListMovie[key] = mov[key];
  inListMovie['inList'] = true;
  return inListMovie;
};

describe('<AddToListButtonBlock> component testing(inlist=false)', () => {
  beforeEach(() => {
    testRenderer = create(
      <AddToListButtonBlock movie_tmdb={mockData.movie_tmdb} addToList={mockFn} />
    );
    testInstance = testRenderer.root;
  });

  afterEach(() => jest.clearAllMocks());

  it('renders', () => {
    expect(testRenderer.toJSON()).toBeTruthy();
  });

  it('active when movie is not in list', () => {
    const elem = testInstance.findByProps({ testID: 'btn_clickable' });
    expect(elem.props.disabled).toBeFalsy();
  });

  it('filled with green when movie is not in list', () => {
    const elem = testInstance.findByProps({ testID: 'btn_cont' });
    expect(elem.props.style.backgroundColor).toBe('#008122');
  });

  it('displays "+" when movie is not in list', () => {
    const elem = testInstance.findByProps({ testID: 'btn_icon' });
    expect(elem.props.children).toBe('+');
  });

  it('button text is white when movie is not in list', () => {
    const elem = testInstance.findByProps({ testID: 'btn_icon' });
    expect(elem.props.style.color).toBe('white');
  });

  it('displays "ADD TO WATCHLIST" text when movie is not in list', () => {
    const elem = testInstance.findByProps({ testID: 'btn_text' });
    expect(elem.props.children).toEqual('ADD TO WATCHLIST');
  });

  it('adds movie to the list when clicked', () => {
    const btn = testInstance.findByProps({ testID: 'btn_clickable' });
    btn.props.onPress();
    expect(mockFn).toHaveBeenCalled();
  });
});

describe('<AddToListButtonBlock> component testing(inlist=true)', () => {
  beforeEach(() => {
    testRenderer = create(
      <AddToListButtonBlock movie_tmdb={copyMovie(mockData.movie_tmdb)} addToList={mockFn} />
    );
    testInstance = testRenderer.root;
  });

  afterEach(() => jest.clearAllMocks());

  it('renders', () => {
    expect(testRenderer).toBeTruthy();
  });

  it('disabled when movie is in list', () => {
    const elem = testInstance.findByProps({ testID: 'btn_clickable' });
    expect(elem.props.disabled).toBeTruthy();
  });

  it('filled with grey when movie is in list', () => {
    const elem = testInstance.findByProps({ testID: 'btn_cont' });
    expect(elem.props.style.backgroundColor).toBe('#313131');
  });

  it('displays "✔" when movie is in list', () => {
    const elem = testInstance.findByProps({ testID: 'btn_icon' });
    expect(elem.props.children).toBe('✔');
  });

  it('button text is white when movie is in list', () => {
    const elem = testInstance.findByProps({ testID: 'btn_icon' });
    expect(elem.props.style.color).toBe('green');
  });

  it('displays "IN YOUR WATCHLIST" text when movie is in list', () => {
    const elem = testInstance.findByProps({ testID: 'btn_text' });
    expect(elem.props.children).toEqual('IN YOUR WATCHLIST');
  });
});
