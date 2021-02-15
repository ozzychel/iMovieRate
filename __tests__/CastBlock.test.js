import React from 'react';
import { create } from 'react-test-renderer';

import CastBlock from '../components/MovieView_comp/CastBlock';
import RenderImage from '../components/helperFunctions/RenderImage';
import mockData from '../mockData';

let testRenderer;
let testInstance;

describe('<CastBlock> component testing', () => {
  beforeEach(() => {
    testRenderer = create(
      <CastBlock topCastList={mockData.cast['272'].cast} movie_omdb={mockData.omdb[0]} />
    );
    testInstance = testRenderer.root;
  });

  it('renders', () => {
    expect(testRenderer.toJSON()).toBeTruthy();
  });

  it('renders component heading text', () => {
    const elem = testInstance.findByProps({ testId: 'heading_text' });
    expect(elem.props.children).toBe('Top Billed Cast');
  });

  it('renders "director" heading', () => {
    const elem = testInstance.findByProps({ testId: 'director_heading' });
    expect(elem.props.children).toBe('Director');
  });

  it('renders director name', () => {
    const elem = testInstance.findByProps({ testID: 'director_name' });
    expect(elem.props.children).toBe(mockData.omdb[0]['Director']);
  });

  it('renders "writer" heading', () => {
    const elem = testInstance.findByProps({ testID: 'writer_heading' });
    expect(elem.props.children).toBe('Writer');
  });

  it('renders writer name', () => {
    const elem = testInstance.findByProps({ testID: 'writer_name' });
    expect(elem.props.children).toBe(mockData.omdb[0]['Writer']);
  });

  it('carousel should render 20 persons', () => {
    const elem = testInstance.findByProps({ testID: 'carousel' });
    expect(elem.props.children).toHaveLength(20);
  });

  it('carousel should be horizontal', () => {
    const elem = testInstance.findByProps({ testID: 'carousel' });
    expect(elem.props.horizontal).toBe(true);
  });

  it('carousel should not have scroll indicator', () => {
    const elem = testInstance.findByProps({ testID: 'carousel' });
    expect(elem.props.showsHorizontalScrollIndicator).toBe(false);
  });

  it('person card should have correct image', () => {
    const img = testInstance.findAllByType(RenderImage)[0];
    expect(img.props.mainObj.profile_path).toBe('/b7fTC9WFkgqGOv77mLQtmD4Bwjx.jpg');
  });

  it('person card should have correct person name', () => {
    const img = testInstance.findAllByType(RenderImage)[0];
    expect(img.props.mainObj.name).toBe('Christian Bale');
  });

  it('person card should have correct person character', () => {
    const img = testInstance.findAllByType(RenderImage)[0];
    expect(img.props.mainObj.character).toBe('Bruce Wayne / Batman');
  });
});
