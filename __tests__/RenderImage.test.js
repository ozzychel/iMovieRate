import React from 'react';
import mockData from '../mockData';
import RenderImage from '../components/helperFunctions/RenderImage';
import { Image, ActivityIndicator } from 'react-native';
import { create } from 'react-test-renderer';

const mockFn = jest.fn();
let testRenderer;
let testInstance;

describe('<RenderImage> component testing(url provided)', () => {

  beforeEach(() => {
    testRenderer = create(<RenderImage
      mainObj={mockData.cast["272"].cast[0]}
      baseUrl={'https://image.tmdb.org/t/p/w154'}
      propToLink={'profile_path'}
      defaultImg={require('../assets/noProfilePic.png')}
      posterContStyle={{height: 225, width: 150}}
      posterStyle={{height: 225,width: 150, borderTopLeftRadius: 10}}
      spinnerSize='large'
      spinnerColor='#FFD700'
      spinnerBg='#1f1f1f'
      defPosterContStyle={{height: 225, width: 150}}
      defPosterStyle={{height: 225, width: 150}}
    />);
    testInstance = testRenderer.root;
  });

  afterEach(() => jest.clearAllMocks());

  it('renders', () => {
    expect(testRenderer.toJSON()).toBeTruthy();
  });

  it('renders image', () => {
    let elem = testInstance.findByProps({testID:'image'});
    expect(elem).toBeTruthy();
  });

  it('image container has correct styling', () => {
    let elem = testInstance.findByProps({testID:'image_cont'});
    expect(elem.props.style).toBe(testInstance.props.posterContStyle);
  })

  it('image has correct address', () => {
    let elem = testInstance.findByProps({testID:'image'});
    expect(elem.props.source.uri).toBe(testInstance.props.baseUrl + testInstance.props.mainObj[testInstance.props.propToLink]);
  });

  it('image has correct styling', () => {
    let elem = testInstance.findByProps({testID:'image'});
    expect(elem.props.style).toBe(testInstance.props.posterStyle);
  });



});

describe('<RenderImage> component testing(with url)', () => {

  beforeEach(() => {
    testRenderer = create(<RenderImage
      mainObj={mockData.cast["1726"].cast[17]}
      baseUrl={'https://image.tmdb.org/t/p/w154'}
      propToLink={'profile_path'}
      defaultImg={require('../assets/noProfilePic.png')}
      posterContStyle={{height: 225, width: 150}}
      posterStyle={{height: 225,width: 150, borderTopLeftRadius: 10}}
      spinnerSize='large'
      spinnerColor='#FFD700'
      spinnerBg='#1f1f1f'
      defPosterContStyle={{height: 225, width: 150}}
      defPosterStyle={{height: 225, width: 150}}
    />);
    testInstance = testRenderer.root;
  });

  afterEach(() => jest.clearAllMocks());

  it('renders', () => {
    expect(testRenderer.toJSON()).toBeTruthy();
  });

  it('renders image', () => {
    let elem = testInstance.findByProps({testID:'image'});
    expect(elem).toBeTruthy();
  });

  it('image container has correct styling', () => {
    let elem = testInstance.findByProps({testID:'image_cont'});
    expect(elem.props.style).toBe(testInstance.props.defPosterContStyle);
  })

  it('image has correct address', () => {
    let elem = testInstance.findByProps({testID:'image'});
    expect(elem.props.source).toBeTruthy();
  });

  it('image has correct styling', () => {
    let elem = testInstance.findByProps({testID:'image'});
    expect(elem.props.style).toBe(testInstance.props.defPosterStyle);
  });

});