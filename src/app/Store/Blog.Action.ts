import { createAction, props } from '@ngrx/store';
import { Blog } from '../model/Blog';

export const LOAD_BLOG = '[blog] getall';
export const LOAD_BLOG_SUCCESS = 'blog getall suc';
export const LOAD_BLOG_FAIL = 'blog getall fail';

export const DELETE_BLOG = '[blog] delete';
export const DELETE_BLOG_SUCC = '[blog] delete succ';

export const ADD_BLOG = '[blog] add';
export const ADD_BLOG_SUCC = '[blog] add succ';

export const UPDATE_BLOG = '[blog] update';
export const UPDATE_BLOG_SUCC = '[blog] update succ';

export const GET_BLOG = '[blog] get blog';

export const loadBlog = createAction(LOAD_BLOG);
export const loadBlogSuc = createAction(
  LOAD_BLOG_SUCCESS,
  props<{ list: Blog[] }>()
);
export const loadBlogFail = createAction(
  LOAD_BLOG_FAIL,
  props<{ errMsg: string }>()
);

export const deleteBlog = createAction(DELETE_BLOG, props<{ blgId: number }>());
export const deleteBlogSuc = createAction(
  DELETE_BLOG_SUCC,
  props<{ blgId: number }>()
);

export const addBlog = createAction(ADD_BLOG, props<{ data: Blog }>());
export const addBlogSuc = createAction(ADD_BLOG_SUCC, props<{ data: Blog }>());

export const updateBlog = createAction(UPDATE_BLOG, props<{ data: Blog }>());
export const updateBlogSuc = createAction(
  UPDATE_BLOG_SUCC,
  props<{ data: Blog }>()
);

export const getBlog = createAction(GET_BLOG, props<{ blgId: number }>());

export const emptyAction = createAction('empty');
