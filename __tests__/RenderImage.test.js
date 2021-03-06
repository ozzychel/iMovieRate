import React from 'react';
import { create, act } from 'react-test-renderer';

import RenderImage from '../components/helperFunctions/RenderImage';
import mockData from '../mockData';

let testRenderer;
let testInstance;

describe('<RenderImage> component testing(url provided)', () => {
  beforeEach(() => {
    testRenderer = create(
      <RenderImage
        mainObj={mockData.cast['272'].cast[0]}
        baseUrl={'https://image.tmdb.org/t/p/w154'}
        propToLink={'profile_path'}
        defaultImg={require('../assets/noProfilePic.png')}
        posterContStyle={{ height: 225, width: 150 }}
        posterStyle={{ height: 225, width: 150, borderTopLeftRadius: 10 }}
        spinnerSize="large"
        spinnerColor="#FFD700"
        spinnerBg="#1f1f1f"
        defPosterContStyle={{ height: 225, width: 150 }}
        defPosterStyle={{ height: 225, width: 150 }}
      />
    );
    testInstance = testRenderer.root;
  });

  afterEach(() => jest.clearAllMocks());

  it('renders', () => {
    expect(testRenderer.toJSON()).toBeTruthy();
  });

  it('renders image', () => {
    const elem = testInstance.findByProps({ testID: 'image' });
    expect(elem).toBeTruthy();
  });

  it('image container has correct styling', () => {
    const elem = testInstance.findByProps({ testID: 'image_cont' });
    expect(elem.props.style).toBe(testInstance.props.posterContStyle);
  });

  it('image has correct address', () => {
    const elem = testInstance.findByProps({ testID: 'image' });
    expect(elem.props.source.uri).toBe(
      testInstance.props.baseUrl + testInstance.props.mainObj[testInstance.props.propToLink]
    );
  });

  it('image has correct styling', () => {
    const elem = testInstance.findByProps({ testID: 'image' });
    expect(elem.props.style).toBe(testInstance.props.posterStyle);
  });
});

describe('<RenderImage> component testing(url not provided)', () => {
  beforeEach(() => {
    testRenderer = create(
      <RenderImage
        mainObj={mockData.cast['1726'].cast[17]}
        baseUrl={'https://image.tmdb.org/t/p/w154'}
        propToLink={'profile_path'}
        defaultImg={require('../assets/noProfilePic.png')}
        posterContStyle={{ height: 225, width: 150 }}
        posterStyle={{ height: 225, width: 150, borderTopLeftRadius: 10 }}
        spinnerSize="large"
        spinnerColor="#FFD700"
        spinnerBg="#1f1f1f"
        defPosterContStyle={{ height: 225, width: 150 }}
        defPosterStyle={{ height: 225, width: 150 }}
      />
    );
    testInstance = testRenderer.root;
  });

  afterEach(() => jest.clearAllMocks());

  it('renders', () => {
    expect(testRenderer.toJSON()).toBeTruthy();
  });

  it('renders image', () => {
    const elem = testInstance.findByProps({ testID: 'image' });
    expect(elem).toBeTruthy();
  });

  it('image container has correct styling', () => {
    const elem = testInstance.findByProps({ testID: 'image_cont' });
    expect(elem.props.style).toBe(testInstance.props.defPosterContStyle);
  });

  it('image has correct address', () => {
    const elem = testInstance.findByProps({ testID: 'image' });
    expect(elem.props.source).toBeTruthy();
  });

  it('image has correct styling', () => {
    const elem = testInstance.findByProps({ testID: 'image' });
    expect(elem.props.style).toBe(testInstance.props.defPosterStyle);
  });
});

describe('<RenderImage> component testing(spinner)', () => {
  beforeEach(() => {
    testRenderer = create(
      <RenderImage
        mainObj={mockData.cast['1726'].cast[17]}
        baseUrl={'https://image.tmdb.org/t/p/w154'}
        propToLink={'profile_path'}
        defaultImg={require('../assets/noProfilePic.png')}
        posterContStyle={{ height: 225, width: 150 }}
        posterStyle={{ height: 225, width: 150, borderTopLeftRadius: 10 }}
        spinnerSize="large"
        spinnerColor="#FFD700"
        spinnerBg="#1f1f1f"
        defPosterContStyle={{ height: 225, width: 150 }}
        defPosterStyle={{ height: 225, width: 150 }}
      />
    );
    testInstance = testRenderer.root;
  });

  it('renders spinner during data fetch', () => {
    const elem = testInstance.findByProps({ testID: 'image' });
    act(() => {
      elem.props.onLoadStart();
    });
    const spinwrap = testInstance.findByProps({ testID: 'spin_wrap' });
    const spin = testInstance.findByProps({ testID: 'spinner' });
    expect(spinwrap).toBeTruthy();
    expect(spin).toBeTruthy();
    act(() => {
      elem.props.onLoadEnd();
    });
  });
});
