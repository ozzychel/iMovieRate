import React from 'react';
import { create, act } from 'react-test-renderer';

import App from '../App';
import helpers from '../components/helperFunctions/helpers';
import api from '../components/helperFunctions/serverRequests';
import mockData from '../mockData';

let testRenderer;
let testInstance;

let getOS_Spy;
let getGenresListSpy;
let getUserListSpy;
let getTrendingSpy;
let getNowPlayingSpy;
let getMovieListSpy;

const initSpies = () => {
  getOS_Spy = jest.spyOn(helpers, 'getOS').mockImplementation(() => 'ios');
  getGenresListSpy = jest
    .spyOn(api, 'getGenresList')
    .mockImplementation(() => Promise.resolve(mockData.genresList));
  getUserListSpy = jest
    .spyOn(api, 'getUserList')
    .mockImplementation(() => Promise.resolve(mockData.user.wish_list));
  getTrendingSpy = jest
    .spyOn(api, 'getTrending')
    .mockImplementation(() => Promise.resolve(mockData.trending.results));
  getNowPlayingSpy = jest
    .spyOn(api, 'getNowPlaying')
    .mockImplementation(() => Promise.resolve(mockData.trending.results));
  getMovieListSpy = jest
    .spyOn(api, 'getMovieList')
    .mockImplementation(() => Promise.resolve([3, mockData.searchResults.results]));
};

describe('<App> component testing', () => {
  beforeEach(async () => {
    await initSpies();
    await act(async () => {
      testRenderer = create(<App />);
    });
    testInstance = testRenderer.root;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders', () => {
    expect(testRenderer.toJSON()).toBeTruthy();
  });

  it('renders status bar with correct style', () => {
    const elem = testInstance.findByProps({ testID: 'status_bar' });
    expect(elem.props.barStyle).toBe('light-content');
  });

  it('renders NavBar component', () => {
    const elem = testInstance.findByProps({ testID: 'nav_bar' });
    expect(elem).toBeTruthy();
  });

  it('renders MainCarousel component', () => {
    const elem = testInstance.findByProps({ testID: 'main_carousel' });
    expect(elem).toBeTruthy();
  });

  it('renders search modal', () => {
    const elem = testInstance.findByProps({ testID: 'search_modal' });
    expect(elem).toBeTruthy();
  });

  it('modal is not visible by default', () => {
    const elem = testInstance.findByProps({ testID: 'search_modal' });
    expect(elem.props.visible).toBe(false);
  });

  it('click on search icon sets modal visible', () => {
    const btn = testInstance.findByProps({ testID: 'nav_search_btn' });
    act(() => {
      btn.props.onPress();
    });
    const modal = testInstance.findByProps({ testID: 'search_modal' });
    expect(modal.props.visible).toBe(true);
  });

  it('modal can be set not visible on request', () => {
    const btn = testInstance.findByProps({ testID: 'nav_search_btn' });
    act(() => {
      btn.props.onPress();
    });
    const modal = testInstance.findByProps({ testID: 'search_modal' });
    act(() => {
      modal.props.onRequestClose();
    });
    expect(modal.props.visible).toBe(false);
  });

  it('click outside modal sets modal not visible', () => {
    const btn = testInstance.findByProps({ testID: 'nav_search_btn' });
    const modal = testInstance.findByProps({ testID: 'search_modal' });
    const out = testInstance.findByProps({ testID: 'modal_touchable' });
    //set visible
    act(() => {
      btn.props.onPress();
    });
    expect(modal.props.visible).toBe(true);
    //set not visible
    act(() => {
      out.props.onPressOut();
    });
    expect(modal.props.visible).toBe(false);
  });

  it('renders SearchBar component', () => {
    const elem = testInstance.findByProps({ testID: 'search_bar' });
    expect(elem).toBeTruthy();
  });

  it('renders HomeTab view by default', () => {
    const elem = testInstance.findByProps({ testID: 'home_tab' });
    expect(elem).toBeTruthy();
  });

  it('renders SearchTab view after "SEARCH" tab click', async () => {
    const btn = testInstance.findAllByProps({ testID: 'tab_btn' })[6];
    act(() => {
      btn.props.onPress();
    });
    const tab = testInstance.findByProps({ testID: 'search_tab' });
    expect(tab).toBeTruthy();
  });

  it('renders WatchList view after "WATCHLIST" tab click', async () => {
    const btn = testInstance.findAllByProps({ testID: 'tab_btn' })[12];
    act(() => {
      btn.props.onPress();
    });
    const tab = testInstance.findByProps({ testID: 'watchlist_tab' });
    expect(tab).toBeTruthy();
  });

  it('renders MovieView view after "MOVIE VIEW" tab click', async () => {
    const btn = testInstance.findAllByProps({ testID: 'tab_btn' })[18];
    act(() => {
      btn.props.onPress();
    });
    const tab = testInstance.findByProps({ testID: 'movieview_msg' });
    expect(tab).toBeTruthy();
  });

  it('changes view to "SEARCH" after user input', async () => {
    const nav_btn = testInstance.findByProps({ testID: 'nav_search_btn' });
    const search_btn = testInstance.findByProps({ testID: 'search_btn' });
    const input = testInstance.findByProps({ testID: 'input' });
    await act(async () => {
      await nav_btn.props.onPress();
      await input.props.onChangeText('terminator');
      await search_btn.props.onPress();
    });
    const tab = testInstance.findByProps({ testID: 'search_tab' });
    expect(tab).toBeTruthy();
  });

  it("doesn't call api on exactly the same input", async () => {
    const nav_btn = testInstance.findByProps({ testID: 'nav_search_btn' });
    const search_btn = testInstance.findByProps({ testID: 'search_btn' });
    const input = testInstance.findByProps({ testID: 'input' });
    await act(async () => {
      await nav_btn.props.onPress();
      await input.props.onChangeText('terminator');
      await search_btn.props.onPress();
      await nav_btn.props.onPress();
      await input.props.onChangeText('terminator');
      await search_btn.props.onPress();
    });
    expect(getMovieListSpy).toHaveBeenCalledTimes(1);
  });

  it('loads more movies if "load more" is clicked', async () => {
    const nav_btn = testInstance.findByProps({ testID: 'nav_search_btn' });
    const search_btn = testInstance.findByProps({ testID: 'search_btn' });
    const input = testInstance.findByProps({ testID: 'input' });
    await act(async () => {
      await nav_btn.props.onPress();
      await input.props.onChangeText('batman');
      await search_btn.props.onPress();
    });
    await act(async () => {
      const more = testInstance.findByProps({ testID: 'load_more_btn' });
      more.props.onPress();
    });
    expect(getMovieListSpy).toHaveBeenCalledTimes(2);
  });

  it('displays alert if movie not found', async () => {
    getMovieListSpy = jest
      .spyOn(api, 'getMovieList')
      .mockImplementation(() => Promise.resolve([0, []]));
    const nav_btn = testInstance.findByProps({ testID: 'nav_search_btn' });
    const search_btn = testInstance.findByProps({ testID: 'search_btn' });
    const input = testInstance.findByProps({ testID: 'input' });
    await act(async () => {
      await nav_btn.props.onPress();
      await input.props.onChangeText('ftkvtkqw1!w');
      await search_btn.props.onPress();
    });
    const search_tab = testInstance.findByProps({ testID: 'search_tab' });
    expect(search_tab.props.noResult).toBe(true);
  });
});
