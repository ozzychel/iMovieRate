import React from 'react';
import { render, fireEvent } from 'react-native-testing-library';

import NavBar from '../components/NavBar';

const mockFn = jest.fn();

let comp = render(<NavBar setModalVisible={mockFn}/>);

describe('<NavBar/> component testing', () => {

  beforeEach(() => {
    comp = render(<NavBar setModalVisible={mockFn}/>);
    jest.clearAllMocks();
  });

  afterEach(() => {
    comp.unmount();
  })

  it('renders', () => {
    expect(comp.toJSON()).toBeTruthy();
  });

  it('has 2 childs', () => {
    expect(comp.toJSON().children).toHaveLength(2);
  })

  it('renders app title', () => {
    expect(comp.queryByText('iMovieRate')).not.toBeNull();
  });

  it('has a search button', () => {
    expect(comp.getByTestId('search-btn')).not.toBeNull();
  });

  it('search button has icon', () => {
    expect(comp.getByTestId('search-btn-icon')).not.toBeNull();
  });

  it('click on search button sets modal visible', () => {
    const btn = comp.getByTestId('search-btn');
    fireEvent.press(btn);
    expect(mockFn).toHaveBeenCalled();
  });

});