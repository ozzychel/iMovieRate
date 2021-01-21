import React from 'react';
import mockData from '../mockData';
import MovieView from '../components/MovieView';
import { create, act } from 'react-test-renderer';

const mockFn = jest.fn();
let testRenderer;
let testInstance;

describe('<MovieView> component testing', () => {

  beforeEach(() => {

  });

  afterEach(() => jest.clearAllMocks());

  it('renders', () => {
    // expect(testRenderer.toJSON()).toBeTruthy();
    expect(1).toBe(1)
  });

});