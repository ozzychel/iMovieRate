import React from 'react';
import { create, act } from 'react-test-renderer';

import ImagesBlock from '../components/MovieView_comp/ImagesBlock';
import mockData from '../mockData';

let testRenderer;
let testInstance;

describe('<ImagesBlock> component testing', () => {
  beforeEach(() => {
    testRenderer = create(
      <ImagesBlock
        movie_title={'Batman Begins'}
        release_date={'2005-06-10'}
        imageUrls={mockData.images['272']}
      />
    );
    testInstance = testRenderer.root;
  });

  it('renders', () => {
    expect(testRenderer.toJSON()).toBeTruthy();
  });

  it('renders component heading text', () => {
    const elem = testInstance.findByProps({ testID: 'title' });
    expect(elem.props.children[0]).toBe('Images (');
  });

  it('renders number of images in heading', () => {
    const elem = testInstance.findByProps({ testID: 'title' });
    const arrLeng = mockData.images['272'].length;
    expect(elem.props.children[1]).toBe(arrLeng);
  });

  it('carousel has 2 blocks', () => {
    const elem = testInstance.findByProps({ testID: 'carousel' });
    expect(elem.props.children.length).toBe(Math.ceil(mockData.images['272'].length / 9));
  });

  it('carousel block has 9 images', () => {
    const block = testInstance.findAllByProps({ testID: 'block' })[0];
    expect(block.props.children.length).toBe(9);
  });

  it('image viewer is invisible by default', () => {
    const elem = testInstance.findByProps({ testID: 'image_view' });
    expect(elem.props.visible).toBe(false);
  });

  it('click on image sets image viewer visible', () => {
    const image = testInstance.findAllByProps({ testID: 'image' })[0];
    const viewer = testInstance.findByProps({ testID: 'image_view' });
    act(() => {
      image.parent.props.onClick();
    });
    expect(viewer.props.visible).toBe(true);
  });

  it('image viewer can be set invisible again', () => {
    const image = testInstance.findAllByProps({ testID: 'image' })[0];
    const viewer = testInstance.findByProps({ testID: 'image_view' });
    act(() => {
      image.parent.props.onClick();
    });
    act(() => {
      viewer.props.onRequestClose();
    });
    expect(viewer.props.visible).toBe(false);
  });

  it('image viewer recieves all images', () => {
    const elem = testInstance.findByProps({ testID: 'image_view' });
    expect(elem.props.images.length).toBe(mockData.images['272'].length);
  });

  it('image viewer recieves full-size images not previews', () => {
    const elem = testInstance.findByProps({ testID: 'image_view' });
    expect(elem.props.images[0].uri).toBe(mockData.images['272'][0]['image']);
  });

  it("doesn't render anything if no urls provided", () => {
    const testRenderer2 = create(
      <ImagesBlock movie_title={'Batman Begins'} release_date={'2005-06-10'} imageUrls={[]} />
    );
    const testInstance2 = testRenderer2.toJSON();
    expect(testInstance2).toBeFalsy();
  });
});
