import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromDashboard from './dashboard.reducer';

export const selectDashboardState = createFeatureSelector<fromDashboard.State>(fromDashboard.dashboardFeatureKey);

export const loadingDashboard = createSelector(selectDashboardState, state => state.loading);

export const stats = createSelector(selectDashboardState, state => state.count);

export const lastUpdated = createSelector(selectDashboardState, state => state.lastUpdated);

export const lastCreated = createSelector(selectDashboardState, state => state.lastCreated);
