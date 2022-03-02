import { DocumentList } from '@state';

export interface SearchResult {
  documents?: SearchEntityResult<DocumentList>;
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
