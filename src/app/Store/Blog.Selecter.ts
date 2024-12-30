import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BlogModel } from './Blog.Model';

const getBlogState = createFeatureSelector<BlogModel>('emp');

export const getEmpList = createSelector(getBlogState, (state) => {
  return state.list;
});

export const selectBlog = createSelector(getBlogState, (state) => {
  return state.empobj;
});
