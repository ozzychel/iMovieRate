import React from 'react';
import { create } from 'react-test-renderer';

import NavBar from '../components/NavBar';

const mockFn = jest.fn();
let testRenderer;
let testInstance;

describe('<NavBar> component testing', () => {
  beforeEach(() => {
    testRenderer = create(<NavBar setModalVisible={mockFn} />);
    testInstance = testRenderer.root;
  });

  afterEach(() => jest.clearAllMocks());

  it('renders', () => {
    expect(testRenderer.toJSON()).toBeTruthy();
  });

  it('renders app title', () => {
    const elem = testInstance.findByProps({ testID: 'app_title' });
    expect(elem.props.children).toBe('iMovieRate');
  });

  it('renders search button', () => {
    expect(testInstance.findByProps({ testID: 'nav_search_btn' })).not.toBeNull();
  });

  it('renders search button icon', () => {
    expect(testInstance.findByProps({ testID: 'search_btn_icon' })).not.toBeNull();
  });

  it('click on search button sets modal visible', () => {
    const btn = testInstance.findByProps({ testID: 'nav_search_btn' });
    btn.props.onPress();
    expect(mockFn).toHaveBeenCalled();
  });
});
