import { EntityDataModuleConfig, EntityMetadataMap } from '@ngrx/data';

const entityMetadata: EntityMetadataMap = {
  Epic: {},
  Label: {},
  Document: {}
};

const pluralNames = { Epic: 'Epic', Label: 'Label', Document: 'Document' };

export const entityConfig: EntityDataModuleConfig = {
  entityMetadata,
  pluralNames
};
