import React from 'react';
import mockData from '../mockData';
import CastBlock from '../components/MovieView_comp/CastBlock';
import RenderImage from '../components/helperFunctions/RenderImage';
import { create } from 'react-test-renderer';

let testRenderer;
let testInstance;

describe('<CastBlock> component testing', () => {

  beforeEach(() => {
    testRenderer = create(<CastBlock
      topCastList={mockData.cast["272"].cast}
      movie_omdb={mockData.omdb[0]}
    />);
    testInstance = testRenderer.root;
  });

  it('renders', () => {
    expect(testRenderer.toJSON()).toBeTruthy();
  });

  it('renders component heading text', () => {
    let elem = testInstance.findByProps({testId: 'heading_text'});
    expect(elem.props.children).toBe('Top Billed Cast');
  });

  it('renders "director" heading', () => {
    let elem = testInstance.findByProps({testId: 'director_heading'});
    expect(elem.props.children).toBe('Director');
  });

  it('renders director name', () => {
    let elem = testInstance.findByProps({testID: 'director_name'});
    expect(elem.props.children).toBe(mockData.omdb[0]['Director'])
  });

  it('renders "writer" heading', () => {
    let elem = testInstance.findByProps({testID: 'writer_heading'});
    expect(elem.props.children).toBe('Writer')
  });

  it('renders writer name', () => {
    let elem = testInstance.findByProps({testID: 'writer_name'});
    expect(elem.props.children).toBe(mockData.omdb[0]['Writer'])
  });

  it('carousel should render 20 persons', () => {
    let elem = testInstance.findByProps({testID: 'carousel'});
    expect(elem.props.children).toHaveLength(20);
  });

  it('carousel should be horizontal', () => {
    let elem = testInstance.findByProps({testID: 'carousel'});
    expect(elem.props.horizontal).toBe(true);
  });

  it('carousel should not have scroll indicator', () => {
    let elem = testInstance.findByProps({testID: 'carousel'});
    expect(elem.props.showsHorizontalScrollIndicator).toBe(false);
  });

  it('person card should have correct image', () => {
    let img = testInstance.findAllByType(RenderImage)[0];
    expect(img.props.mainObj.profile_path).toBe('/b7fTC9WFkgqGOv77mLQtmD4Bwjx.jpg')
  });

  it('person card should have correct person name', () => {
    let img = testInstance.findAllByType(RenderImage)[0];
    expect(img.props.mainObj.name).toBe('Christian Bale');
  });

  it('person card should have correct person character', () => {
    let img = testInstance.findAllByType(RenderImage)[0];
    expect(img.props.mainObj.character).toBe('Bruce Wayne / Batman');
  });

});