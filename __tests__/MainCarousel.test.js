import React from 'react';
import mockData from '../mockData';
import MainCarousel from '../components/MainCarousel';
import { create } from 'react-test-renderer';

const mockFn = jest.fn();
let testRenderer;
let testInstance;

describe('<MainCarousel> component testing', () => {

  beforeEach(() => {
    testRenderer = create(<MainCarousel
      items={[
        {title: 'HOME'},
        {title: 'SEARCH'},
        {title: 'WATCHLIST'},
        {title: 'MOVIE VIEW'}
      ]}
      currentTab='HOME'
      changeView={mockFn}
    />);
    testInstance = testRenderer.root;
  });

  afterEach(() => jest.clearAllMocks());

  it('renders', () => {
    expect(testRenderer.toJSON()).toBeTruthy();
  });

  it('renders horizontal scrollview', () => {
    let elem = testInstance.findByProps({testID:'scroll_view'});
    expect(elem.props.horizontal).toBe(true);
  });

  it('scrollview doesn\'t show scroll indicator', () => {
    let elem = testInstance.findByProps({testID:'scroll_view'});
    expect(elem.props.showsHorizontalScrollIndicator).toBe(false);
  });

  it('has correct number of buttons', () => {
    let scroll = testInstance.findByProps({testID:'scroll_view'});
    expect(scroll.props.children.length).toBe(testInstance.props.items.length);
  });

  it('button has correct text', () => {
    let text = testInstance.findAllByProps({testID:'btn_text'})[0];
    expect(text.props.children).toBe('HOME');
  });

  it('button has correct styling when active', () => {
    let bullet = testInstance.findAllByProps({testID:'bullet'})[0];
    expect(bullet.props.style.backgroundColor).toBe('green');
  });

  it('button has correct styling when not active', () => {
    let bullet = testInstance.findAllByProps({testID:'bullet'})[2];
    expect(bullet.props.style.backgroundColor).toBe('black');
  });

  it('button click changes current tab', () => {
    let btn = testInstance.findAllByProps({testID:'tab_btn'})[0];
    btn.props.onPress();
    expect(mockFn).toHaveBeenCalled();
  });





});