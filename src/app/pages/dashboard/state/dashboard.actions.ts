import { createAction, props } from '@ngrx/store';

export const loadLastUpdatedDocuments = createAction('[Dashboard] Load Last Updated Documents');

export const loadLastUpdatedDocumentsSuccess = createAction('[Dashboard] Load Last Updated Documents Success', props<{ data: any }>());

export const loadLastUpdatedDocumentsFail = createAction('[Dashboard] Load Last Updated Documents Failure', props<{ error: any }>());

export const loadLastCreatedDocuments = createAction('[Dashboard] Load Last Created Documents');

export const loadLastCreatedDocumentsSuccess = createAction('[Dashboard] Load Last Created Documents Success', props<{ data: any }>());

export const loadLastCreatedDocumentsFail = createAction('[Dashboard] Load Last Created Documents Failure', props<{ error: any }>());

export const loadStats = createAction('[Dashboard] Load Stats');

export const loadStatsSuccess = createAction('[Dashboard] Load Stats Success', props<{ data: any }>());

export const loadStatsFail = createAction('[Dashboard] Load Stats Failure', props<{ error: any }>());

export const reindex = createAction('[Dashboard] Reindex');

export const reindexSuccess = createAction('[Dashboard] Reindex Success');

export const reindexFail = createAction('[Dashboard] Reindex Failure', props<{ error: any }>());
