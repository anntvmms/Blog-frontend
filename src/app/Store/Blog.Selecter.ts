import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BlogModel } from './Blog.Model';

const getBlogState = createFeatureSelector<BlogModel>('emp');

export const getBlgList = createSelector(getBlogState, (state) => {
  return state.list;
});

export const selectBlog = createSelector(getBlogState, (state) => {
  return state.blgobj;
});
