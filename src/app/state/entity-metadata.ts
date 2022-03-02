import { EntityDataModuleConfig, EntityMetadataMap } from '@ngrx/data';

const entityMetadata: EntityMetadataMap = {
  Epic: {},
  Label: {},
  Document: {}
};

const pluralNames = { Document: 'Documents', Epic: 'Epics', Label: 'Labels' };

export const entityConfig: EntityDataModuleConfig = {
  entityMetadata,
  pluralNames
};
