import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { BlogService } from '../service/blog.service';
import {
  addBlog,
  addBlogSuc,
  deleteBlog,
  deleteBlogSuc,
  emptyAction,
  loadBlog,
  loadBlogFail,
  loadBlogSuc,
  updateBlog,
  updateBlogSuc,
} from './Blog.Action';
import { catchError, exhaustMap, map, of, switchMap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class empEffect {
  action$ = inject(Actions);
  service = inject(BlogService);
  toastr = inject(ToastrService);

  _loadBlog = createEffect(() =>
    this.action$.pipe(
      ofType(loadBlog),
      exhaustMap(() => {
        return this.service.GetAll().pipe(
          map((data) => {
            return loadBlogSuc({ list: data });
          }),
          catchError((err) => of(loadBlogFail({ errMsg: err.message })))
        );
      })
    )
  );

  _deleteBlog = createEffect(() =>
    this.action$.pipe(
      ofType(deleteBlog),
      switchMap((action) => {
        return this.service.Delete(action.empId).pipe(
          switchMap((data) => {
            return of(
              deleteBlogSuc({ empId: action.empId }),
              this.Showalert('delete Successfuly', 'pass')
            );
          }),
          catchError((err) => of(this.Showalert(err.message, 'fail')))
        );
      })
    )
  );

  _addBlog = createEffect(() =>
    this.action$.pipe(
      ofType(addBlog),
      switchMap((action) => {
        return this.service.Create(action.data).pipe(
          switchMap((data) => {
            return of(
              addBlogSuc({ data: action.data }),
              this.Showalert('created Successfuly', 'pass')
            );
          }),
          catchError((err) => of(this.Showalert(err.message, 'fail')))
        );
      })
    )
  );

  _updateBlog = createEffect(() =>
    this.action$.pipe(
      ofType(updateBlog),
      switchMap((action) => {
        return this.service.Update(action.data).pipe(
          switchMap((data) => {
            return of(
              updateBlogSuc({ data: action.data }),
              this.Showalert('updated Successfuly', 'pass')
            );
          }),
          catchError((err) => of(this.Showalert(err.message, 'fail')))
        );
      })
    )
  );

  Showalert(message: string, response: string) {
    if (response == 'pass') {
      this.toastr.success(message);
    } else {
      this.toastr.error(message);
    }
    return emptyAction();
  }
}
