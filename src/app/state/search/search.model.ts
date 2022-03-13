import { DocumentLink, DocumentList, Epic, Label } from '@state';

export interface SearchResult extends QueryResult<DocumentList> {}

export interface AutocompleteResult extends QueryResult<DocumentLink> {}

export interface QueryResult<T> {
  document?: SearchEntityResult<T>;
  epic: SearchEntityResult<Epic>;
  label: SearchEntityResult<Label>;
}

export interface SearchEntityResult<T> {
  hits: T[];
  hitCount: number;
}

export interface Page {
  index: number;
  size: number;
}

export interface Filters {
  term?: {
    [property: string]: string;
  };
  range?: {
    [property: string]: {
      gt: any;
      lt: any;
    };
  };
  anyOf?: {
    [property: string]: string[];
  };
}

export interface Sort {
  field: string;
  order?: SortOrder;
}

export enum SortOrder {
  ASC = 'ASC',
  DESC = 'DESC'
}

export interface SearchRequest {
  query: string;
  sort?: Sort[];
  page?: Page;
  filters?: Filters;
}
