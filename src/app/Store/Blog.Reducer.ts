import { createReducer, on } from '@ngrx/store';
import { blogState } from './Blog.State';
import {
  addBlogSuc,
  deleteBlogSuc,
  getBlog,
  loadBlogFail,
  loadBlogSuc,
  updateBlogSuc,
} from './Blog.Action';

const _blogReducer = createReducer(
  blogState,
  on(loadBlogSuc, (state, action) => {
    return {
      ...state,
      list: action.list,
      errormessage: '',
    };
  }),
  on(loadBlogFail, (state, action) => {
    return {
      ...state,
      list: [],
      errormessage: action.errMsg,
    };
  }),
  on(deleteBlogSuc, (state, action) => {
    const _newdata = state.list.filter((o) => o.id != action.blgId);
    return {
      ...state,
      list: _newdata,
      errormessage: '',
    };
  }),

  on(addBlogSuc, (state, action) => {
    const _newdata = { ...action.data };
    return {
      ...state,
      list: [...state.list, _newdata],
      errormessage: '',
    };
  }),

  on(updateBlogSuc, (state, action) => {
    const _newdata = state.list.map((o) => {
      return o.id === action.data.id ? action.data : o;
    });
    return {
      ...state,
      list: _newdata,
      errormessage: '',
    };
  }),

  on(getBlog, (state, action) => {
    let _newdata = state.list.find((o) => o.id === action.blgId);
    if (_newdata == null) {
      _newdata = state.blgobj;
    }
    return {
      ...state,
      blgobj: _newdata,
    };
  })
);

export function blogReducer(state: any, action: any) {
  return _blogReducer(state, action);
}
