import React from 'react';
import mockData from '../mockData';
import App from '../App';
import { create, act } from 'react-test-renderer';

let testRenderer;
let testInstance;
jest.useFakeTimers();
jest.mock('../components/helperFunctions/helpers.js', () => {
  const originalModule = jest.requireActual('../components/helperFunctions/helpers.js');
  return ({
    ...originalModule,
    getOS: jest.fn().mockReturnValue('ios'),
  });
});

describe('<App> component testing', () => {

  beforeEach(async () => {
    act(() => {
      testRenderer = create(<App/>);
    })
    testInstance = testRenderer.root;
  });

  afterEach(() => { jest.clearAllMocks() });

  it('renders', () => {
    expect(testRenderer.toJSON()).toBeTruthy();
  });

  it('renders status bar with correct style', () => {
    let elem = testInstance.findByProps({testID:'status_bar'});
    expect(elem.props.barStyle).toBe('light-content');
  });

  it('renders NavBar component', () => {
    let elem = testInstance.findByProps({testID:'nav_bar'});
    expect(elem).toBeTruthy();
  });

  it('renders MainCarousel component', () => {
    let elem = testInstance.findByProps({testID:'main_carousel'});
    expect(elem).toBeTruthy();
  });

  it('renders search modal', () => {
    let elem = testInstance.findByProps({testID:'search_modal'});
    // console.log(elem.props.children)
    expect(elem).toBeTruthy();
  });

  it('modal is invisible by default', () => {
    let elem = testInstance.findByProps({testID:'search_modal'});
    expect(elem.props.visible).toBe(false);
  });

  it('click on search icon sets modal visible', () => {
    let btn = testInstance.findAllByProps({testID:'search_btn'})[0];
    act(() => { btn.props.onPress() });
    let modal = testInstance.findByProps({testID:'search_modal'});
    expect(modal.props.visible).toBe(true);
  });

  it('click outside modal sets modal invisible', () => {
    let btn = testInstance.findAllByProps({testID:'search_btn'})[0];
    let modal = testInstance.findByProps({testID:'search_modal'});
    let out = testInstance.findByProps({testID:'modal_touchable'})
    //set visible
    act(() => { btn.props.onPress() });
    expect(modal.props.visible).toBe(true);
    //set invisible
    act(() => { out.props.onPressOut() })
    expect(modal.props.visible).toBe(false);
  });

  it('renders SearchBar component', () => {
    let elem = testInstance.findByProps({testID:'search_bar'});
    expect(elem).toBeTruthy();
  });

  it('renders HomeTab view by default', () => {
    let elem = testInstance.findByProps({testID:'home_tab'});
    expect(elem).toBeTruthy();
  });

  it('renders SearchTab view after "SEARCH" tab click', async () => {
    let btn = testInstance.findAllByProps({testID:'tab_btn'})[6];
    act(() => { btn.props.onPress() });
    let tab = testInstance.findByProps({testID:'search_tab'});
    expect(tab).toBeTruthy();
  });

  it('renders WatchList view after "WATCHLIST" tab click', async () => {
    let btn = testInstance.findAllByProps({testID:'tab_btn'})[12];
    act(() => { btn.props.onPress() });
    let tab = testInstance.findByProps({testID:'watchlist_tab'});
    expect(tab).toBeTruthy();
  });

  it('renders MovieView view after "MOVIE VIEW" tab click', async () => {
    let btn = testInstance.findAllByProps({testID:'tab_btn'})[18];
    act(() => { btn.props.onPress() });
    let tab = testInstance.findByProps({testID:'movieview_msg'});
    expect(tab).toBeTruthy();
  });

});