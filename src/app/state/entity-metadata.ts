import { EntityMetadataMap, EntityDataModuleConfig } from '@ngrx/data';

const entityMetadata: EntityMetadataMap = {
  Epic: {},
  Label: {}
};

const pluralNames = { Epic: 'Epic', Label: 'Label' };

export const entityConfig: EntityDataModuleConfig = {
  entityMetadata,
  pluralNames
};
