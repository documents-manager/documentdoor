import { Action, createReducer, on } from '@ngrx/store';
import * as DashboardActions from './dashboard.actions';
import { Stats } from './dashboard.model';
import { DocumentList } from '@state';

export const dashboardFeatureKey = 'dashboard';

export interface State {
  loading: {
    count: boolean;
    lastUpdated: boolean;
    lastCreated: boolean;
    reindex: boolean;
  };
  count: Stats | null;
  lastUpdated: DocumentList[] | null;
  lastCreated: DocumentList[] | null;
}

export const initialState: State = {
  loading: {
    count: false,
    lastUpdated: false,
    lastCreated: false,
    reindex: false
  },
  count: null,
  lastUpdated: null,
  lastCreated: null
};

export const reducer = createReducer(
  initialState,

  on(DashboardActions.loadStats, state => ({ ...state, loading: { ...state.loading, count: true } })),
  on(DashboardActions.loadStatsSuccess, (state, action) => ({ ...state, loading: { ...state.loading, count: false }, count: action.data })),
  on(DashboardActions.loadStatsFail, (state, action) => ({ ...state, loading: { ...state.loading, count: false } })),
  on(DashboardActions.loadLastUpdatedDocuments, state => ({ ...state, loading: { ...state.loading, lastUpdated: true } })),
  on(DashboardActions.loadLastUpdatedDocumentsSuccess, (state, action) => ({
    ...state,
    loading: { ...state.loading, lastUpdated: false },
    lastUpdated: action.data
  })),
  on(DashboardActions.loadLastUpdatedDocumentsFail, (state, action) => ({ ...state, loading: { ...state.loading, lastUpdated: false } })),
  on(DashboardActions.loadLastCreatedDocuments, state => ({ ...state, loading: { ...state.loading, lastCreated: true } })),
  on(DashboardActions.loadLastCreatedDocumentsSuccess, (state, action) => ({
    ...state,
    loading: { ...state.loading, lastCreated: false },
    lastCreated: action.data
  })),
  on(DashboardActions.loadLastCreatedDocumentsFail, (state, action) => ({ ...state, loading: { ...state.loading, lastCreated: false } })),
  on(DashboardActions.reindex, state => ({ ...state, loading: { ...state.loading, reindex: true } })),
  on(DashboardActions.reindexSuccess, (state, action) => ({ ...state, loading: { ...state.loading, reindex: false } })),
  on(DashboardActions.reindexFail, (state, action) => ({ ...state, loading: { ...state.loading, reindex: false } }))
);
