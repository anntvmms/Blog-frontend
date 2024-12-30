import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddBlogComponent } from '../add-blog/add-blog.component';
import { Blog } from '../../model/Blog';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { deleteBlog, loadBlog } from '../../Store/Blog.Action';
import { getBlgList } from '../../Store/Blog.Selecter';
import { BlogService } from '../../service/blog.service';

@Component({
  selector: 'app-blog',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatTableModule,
    CommonModule,
  ],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css',
})
export class BlogComponent implements OnInit, OnDestroy {
  blgList: Blog[] = [];
  dataSource!: MatTableDataSource<Blog>;
  displayedColumns: string[] = [
    'id',
    'newsTitle',
    'category',
    'detailsContent',
    'doj',
    'action',
  ];
  subscription = new Subscription();

  constructor(
    private dialog: MatDialog,
    private store: Store,
    private blogService: BlogService
  ) {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  ngOnInit(): void {
    this.GetallBlog();
  }

  GetallBlog() {
    this.store.dispatch(loadBlog());
    this.store.select(getBlgList).subscribe((item) => {
      this.blgList = item;
      this.dataSource = new MatTableDataSource(this.blgList);
    });
    // this.blogService.GetAll().subscribe((item) => {
    //   this.blgList = item;
    //   this.dataSource = new MatTableDataSource(this.blgList);
    // });
  }

  addblog() {
    this.openpopup(0);
  }

  addCategory() {}

  DeleteBlog(blgId: number) {
    if (confirm('Are you sure to delete it?')) {
      this.store.dispatch(deleteBlog({ blgId: blgId }));
    }
  }

  EditBlog(blgId: number) {
    this.openpopup(blgId);
  }

  openpopup(empid: number) {
    this.dialog
      .open(AddBlogComponent, {
        width: '50%',
        data: {
          code: empid,
        },
      })
      .afterClosed()
      .subscribe((o) => {
        this.GetallBlog();
      });
  }
}
