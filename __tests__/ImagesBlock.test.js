import React from 'react';
import mockData from '../mockData';
import ImagesBlock from '../components/MovieView_comp/ImagesBlock';
import RenderImage from '../components/helperFunctions/RenderImage'
import { create, act } from 'react-test-renderer';

let testRenderer;
let testInstance;

describe('<ImagesBlock> component testing', () => {

  beforeEach(() => {
    testRenderer = create(<ImagesBlock
      movie_title={'Batman Begins'}
      release_date={'2005-06-10'}
      imageUrls={mockData.images["272"]}
    />);
    testInstance = testRenderer.root;
  });

  it('renders', () => {
    expect(testRenderer.toJSON()).toBeTruthy();
  });

  it('renders component heading text', () => {
    let elem = testInstance.findByProps({testID:'title'});
    expect(elem.props.children[0]).toBe('Images (');
  });

  it('renders number of images in heading', () => {
    let elem = testInstance.findByProps({testID:'title'});
    let arrLeng = mockData.images["272"].length;
    expect(elem.props.children[1]).toBe(arrLeng);
  });

  it('carousel has 2 blocks', () => {
    let elem = testInstance.findByProps({testID:'carousel'});
    expect(elem.props.children.length).toBe(Math.ceil(mockData.images["272"].length / 9));
  });

  it('carousel block has 9 images', () => {
    let block = testInstance.findAllByProps({testID:'block'})[0];
    expect(block.props.children.length).toBe(9);
  });

  it('click on image sets image viewer visible', () => {
    let images = testInstance.findAllByProps({testID:'image'});
    let viewer = testInstance.findByProps({testID:'image_view'});
    act(() => { images[0].parent.props.onClick() });
    expect(viewer.props.visible).toBe(true);
  });

  it('image viewer recieves all images', () => {
    let elem = testInstance.findByProps({testID:'image_view'});
    expect(elem.props.images.length).toBe(mockData.images["272"].length);
  });

  it('image viewer recieves full-size images not previews', () => {
    let elem = testInstance.findByProps({testID:'image_view'});
    expect(elem.props.images[0].uri).toBe(mockData.images["272"][0]['image']);
  });

  it('doesn\'t render anything if no urls provided', () => {
    testRenderer2 = create(<ImagesBlock
      movie_title={'Batman Begins'}
      release_date={'2005-06-10'}
      imageUrls={[]}
    />);
    testInstance2 = testRenderer2.toJSON();
    expect(testInstance2).toBeFalsy();
  });

});