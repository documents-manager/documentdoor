import * as fromEpic from './epic.actions';

describe('loadEpics', () => {
  it('should return an action', () => {
    expect(fromEpic.loadEpics().type).toBe('[Epic] Load Epics');
  });
});
