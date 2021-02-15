import React from 'react';
import { create } from 'react-test-renderer';

import MainCarousel from '../components/MainCarousel';

const mockFn = jest.fn();
let testRenderer;
let testInstance;

describe('<MainCarousel> component testing', () => {
  beforeEach(() => {
    testRenderer = create(
      <MainCarousel
        items={[
          { title: 'HOME' },
          { title: 'SEARCH' },
          { title: 'WATCHLIST' },
          { title: 'MOVIE VIEW' },
        ]}
        currentTab="HOME"
        changeView={mockFn}
      />
    );
    testInstance = testRenderer.root;
  });

  afterEach(() => jest.clearAllMocks());

  it('renders', () => {
    expect(testRenderer.toJSON()).toBeTruthy();
  });

  it('renders horizontal scrollview', () => {
    const elem = testInstance.findByProps({ testID: 'scroll_view' });
    expect(elem.props.horizontal).toBe(true);
  });

  it("scrollview doesn't show scroll indicator", () => {
    const elem = testInstance.findByProps({ testID: 'scroll_view' });
    expect(elem.props.showsHorizontalScrollIndicator).toBe(false);
  });

  it('has correct number of buttons', () => {
    const scroll = testInstance.findByProps({ testID: 'scroll_view' });
    expect(scroll.props.children.length).toBe(testInstance.props.items.length);
  });

  it('button has correct text', () => {
    const text = testInstance.findAllByProps({ testID: 'btn_text' })[0];
    expect(text.props.children).toBe('HOME');
  });

  it('button has correct styling when active', () => {
    const bullet = testInstance.findAllByProps({ testID: 'bullet' })[0];
    expect(bullet.props.style.backgroundColor).toBe('green');
  });

  it('button has correct styling when not active', () => {
    const bullet = testInstance.findAllByProps({ testID: 'bullet' })[2];
    expect(bullet.props.style.backgroundColor).toBe('black');
  });

  it('button click changes current tab', () => {
    const btn = testInstance.findAllByProps({ testID: 'tab_btn' })[0];
    btn.props.onPress();
    expect(mockFn).toHaveBeenCalled();
  });
});
