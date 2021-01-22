import React from 'react';
import mockData from '../mockData';
import SearchTab from '../components/SearchTab';
import { create, act } from 'react-test-renderer';

const mockFn = jest.fn();
let testRenderer;
let testInstance;

describe('<SearchTab> component testing', () => {

  beforeEach(async () => {
    await act(async () => {
      testRenderer = create(<SearchTab
        movieList={mockData.searchResults.results}
        currentPageNum={2}
        totalPages={3}
        genresList={mockData.genresList}
        currentTab={'SEARCH'}
        changeView={mockFn}
        getSelectedMovie={mockFn}
        getMoreMovies={mockFn}
        deleteFromList={mockFn}
        setModalVisible={mockFn}
        isLoading={false}
        noResult={false}
        os={'ios'}
      />);
    })
    testInstance = testRenderer.root;
  });

  afterEach(() => jest.clearAllMocks());

  it('renders', () => {
    expect(testRenderer.toJSON()).toBeTruthy();
  });

  it('renders vertical scroll view', () => {
    let elem = testInstance.findByProps({testID:'scroll_view'});
    expect(elem.props.horisontal).toBeFalsy();
  });

  it('scroll view shows scroll indicator', () => {
    let elem = testInstance.findByProps({testID:'scroll_view'});
    expect(elem.props.showsVerticalScrollIndicator).toBeTruthy();
  });

  it('scroll view displays correct number of movies', () => {
    let elem = testInstance.findAllByProps({testID:'movie'});
    expect(elem.length).toBe(19);
  });

  it('footer has correct styling', () => {
    let elem = testInstance.findByProps({testID:'footer'});
    expect(elem.props.style.height).toBe(160);
  });

  it('renders "load more" button', () => {
    let btn = testInstance.findByProps({testID:'load_more_btn'});
    expect(btn).toBeTruthy();
  });

  it('doesn\'t render "load more" button if last page', () => {
    testRenderer = create(<SearchTab
      movieList={mockData.searchResults.results}
      currentPageNum={4}
      totalPages={3}
      genresList={mockData.genresList}
      currentTab={'SEARCH'}
      changeView={mockFn}
      getSelectedMovie={mockFn}
      getMoreMovies={mockFn}
      deleteFromList={mockFn}
      setModalVisible={mockFn}
      isLoading={false}
      noResult={false}
      os={'ios'}
    />)
    testInstance = testRenderer.root;
    let elem = testInstance.findAllByProps({testID:'load_more_btn'});
    expect(elem.length).toBeFalsy();
  });

  it('button has correct text', () => {
    let elem = testInstance.findByProps({testID:'btn_text'});
    expect(elem.props.children).toBe('Load more...')
  });

  it('click on a button loads more movies', () => {
    let btn = testInstance.findByProps({testID:'load_more_btn'});
    btn.props.onPress();
    expect(mockFn).toHaveBeenCalled();
  });

  it('renders background during data fetch', () => {
    testRenderer = create(<SearchTab
      movieList={[]}
      currentPageNum={4}
      totalPages={3}
      genresList={mockData.genresList}
      currentTab={'SEARCH'}
      changeView={mockFn}
      getSelectedMovie={mockFn}
      getMoreMovies={mockFn}
      deleteFromList={mockFn}
      setModalVisible={mockFn}
      isLoading={true}
      noResult={false}
      os={'ios'}
    />)
    testInstance = testRenderer.root;
    let back = testInstance.findByProps({testID:'back'});
    expect(back).toBeTruthy();
  });

  it('renders correct text if no data found', () => {
    testRenderer = create(<SearchTab
      movieList={[]}
      currentPageNum={4}
      totalPages={3}
      genresList={mockData.genresList}
      currentTab={'SEARCH'}
      changeView={mockFn}
      getSelectedMovie={mockFn}
      getMoreMovies={mockFn}
      deleteFromList={mockFn}
      setModalVisible={mockFn}
      isLoading={false}
      noResult={true}
      os={'ios'}
    />)
    testInstance = testRenderer.root;
    let elem = testInstance.findByProps({testID:'not_found'});
    expect(elem.props.children).toContain("don't have info");
  });

  it('renders correct text if no search yet', () => {
    testRenderer = create(<SearchTab
      movieList={[]}
      currentPageNum={4}
      totalPages={3}
      genresList={mockData.genresList}
      currentTab={'SEARCH'}
      changeView={mockFn}
      getSelectedMovie={mockFn}
      getMoreMovies={mockFn}
      deleteFromList={mockFn}
      setModalVisible={mockFn}
      isLoading={false}
      noResult={false}
      os={'ios'}
    />)
    testInstance = testRenderer.root;
    let elem = testInstance.findByProps({testID:'not_searched'});
    expect(elem.props.children).toContain('results will be');
  });

});