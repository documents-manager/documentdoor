import * as fromSearch from './search.actions';

describe('searchSearchs', () => {
  it('should return an action', () => {
    expect(fromSearch.search().type).toBe('[Search] Search Searchs');
  });
});
