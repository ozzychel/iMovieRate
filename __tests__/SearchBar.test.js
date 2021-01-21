import React from 'react';
import SearchBar from '../components/SearchBar';
import { create, act } from 'react-test-renderer';

const mockFn = jest.fn();
let testRenderer;
let testInstance;

describe('<SearchBar> component testing', () => {

  beforeEach(() => {
    testRenderer = create(<SearchBar
      getUserInput={mockFn}
      setModalVisible={mockFn}
      changeView={mockFn}
      os='ios'
    />);
    testInstance = testRenderer.root;
  });

  afterEach(() => jest.clearAllMocks());

  it('renders', () => {
    expect(testRenderer.toJSON()).toBeTruthy();
  });

  it('renders with correct margin', () => {
    let elem = testInstance.findByProps({testID:'container'});
    expect(elem.props.style.marginTop).toBe(135);
  });

  it('renders input field', () => {
    let elem = testInstance.findByProps({testID:'input'});
    expect(elem).toBeTruthy();
  });

  it('input field has correct placeholder', () => {
    let elem = testInstance.findByProps({testID: 'input'});
    expect(elem.props.placeholder).toBe('Search movie title...');
  });

  it('input field changes value on user input', () => {
    let input = testInstance.findByProps({testID: 'input'});
    act(() => {
      input.props.onChangeText('test-text');
    });
    expect(input.props.value).toBe('test-text');
  });

  it('renders search button', () => {
    let elem = testInstance.findByProps({testID: 'search_btn'});
    expect(elem).toBeTruthy();
  });

  it('search button has correct text', () => {
    let elem = testInstance.findByProps({testID: 'btn_text'});
    expect(elem.props.children).toBe('SEARCH');
  });

  it('click on search button changes view after user input', async () => {
    let input = testInstance.findByProps({testID: 'input'});
    await act(async () => {
      await input.props.onChangeText('test string');
      let btn = testInstance.findByProps({testID: 'search_btn'});
      await btn.props.onPress();
    });
    expect(mockFn).toHaveBeenCalled();
  });

  it('click on search button doesn\'t change view if input is empty', () => {
    let btn = testInstance.findByProps({testID:'search_btn'});
    btn.props.onPress();
    expect(mockFn).not.toHaveBeenCalled();
  });

});