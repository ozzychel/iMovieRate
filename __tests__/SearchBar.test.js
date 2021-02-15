import React from 'react';
import { create, act } from 'react-test-renderer';

import SearchBar from '../components/SearchBar';

const mockFn = jest.fn();
let testRenderer;
let testInstance;

describe('<SearchBar> component testing', () => {
  beforeEach(() => {
    testRenderer = create(
      <SearchBar getUserInput={mockFn} setModalVisible={mockFn} changeView={mockFn} os="ios" />
    );
    testInstance = testRenderer.root;
  });

  afterEach(() => jest.clearAllMocks());

  it('renders', () => {
    expect(testRenderer.toJSON()).toBeTruthy();
  });

  it('renders with correct margin', () => {
    const elem = testInstance.findByProps({ testID: 'container' });
    expect(elem.props.style.marginTop).toBe(135);
  });

  it('renders input field', () => {
    const elem = testInstance.findByProps({ testID: 'input' });
    expect(elem).toBeTruthy();
  });

  it('input field has correct placeholder', () => {
    const elem = testInstance.findByProps({ testID: 'input' });
    expect(elem.props.placeholder).toBe('Search movie title...');
  });

  it('input field changes value on user input', () => {
    const input = testInstance.findByProps({ testID: 'input' });
    act(() => {
      input.props.onChangeText('test-text');
    });
    expect(input.props.value).toBe('test-text');
  });

  it('renders search button', () => {
    const elem = testInstance.findByProps({ testID: 'search_btn' });
    expect(elem).toBeTruthy();
  });

  it('search button has correct text', () => {
    const elem = testInstance.findByProps({ testID: 'btn_text' });
    expect(elem.props.children).toBe('SEARCH');
  });

  it('click on search button changes view after user input', async () => {
    const input = testInstance.findByProps({ testID: 'input' });
    await act(async () => {
      await input.props.onChangeText('test string');
      const btn = testInstance.findByProps({ testID: 'search_btn' });
      await btn.props.onPress();
    });
    expect(mockFn).toHaveBeenCalled();
  });

  it("click on search button doesn't change view if input is empty", () => {
    const btn = testInstance.findByProps({ testID: 'search_btn' });
    btn.props.onPress();
    expect(mockFn).not.toHaveBeenCalled();
  });
});
