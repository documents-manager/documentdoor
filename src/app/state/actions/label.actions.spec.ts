import * as fromLabel from './label.actions';

describe('labelLabels', () => {
  it('should return an action', () => {
    expect(fromLabel.openLabelAddDialog().type).toBe('[Label] Label Labels');
  });
});
