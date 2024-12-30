import { Component, Inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { Blog } from '../../model/Blog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@ngrx/store';
import { addBlog, getBlog, updateBlog } from '../../Store/Blog.Action';
import { getEmpList, selectBlog } from '../../Store/Blog.Selecter';

@Component({
  selector: 'app-add-blog',
  imports: [
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatIconModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './add-blog.component.html',
  styleUrl: './add-blog.component.css',
})
export class AddBlogComponent implements OnInit {
  title = 'Add News';
  dialodata: any;
  isEdit = false;
  maxId: number = 0;

  constructor(
    private store: Store,
    private ref: MatDialogRef<AddBlogComponent>,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  // ngOnInit(): void {
  //   this.dialodata = this.data;
  //   if(this.dialodata.code > 0){
  //     this.title = 'Edit News';
  //     this.isEdit = true;
  //     this.store.dispatch(getBlog({empId: this.dialodata.code}));
  //     this.store.select(selectBlog).subscribe(item=>{
  //       let _data = item;
  //       if(_data != null){
  //         this.empForm.setValue({
  //           id: _data.id,
  //           newsTitle: _data.newsTitle,
  //           doj: _data.doj,
  //           category: _data.category,
  //           detailsContent: _data.detailsContent
  //         })
  //       }
  //     })
  //   }
  // }

  ngOnInit(): void {
    this.dialodata = this.data;
    if (this.dialodata.code > 0) {
      this.title = 'Edit News';
      this.isEdit = true;
      this.store.dispatch(getBlog({ empId: this.dialodata.code }));
      this.store.select(selectBlog).subscribe((item) => {
        let _data = item;
        if (_data != null) {
          this.empForm.setValue({
            id: _data.id,
            newsTitle: _data.newsTitle,
            doj: _data.doj,
            category: _data.category,
            detailsContent: _data.detailsContent,
          });
        }
      });
    }

  }

  empForm = new FormGroup({
    id: new FormControl(0),
    newsTitle: new FormControl('', Validators.required),
    doj: new FormControl(new Date(), Validators.required),
    category: new FormControl('', Validators.required),
    detailsContent: new FormControl('', Validators.required),
  });

  SaveBlog() {
    if (this.empForm.valid) {
      let _data: Blog = {
        id: this.empForm.value.id as number,
        newsTitle: this.empForm.value.newsTitle as string,
        doj: new Date(this.empForm.value.doj as Date),
        category: this.empForm.value.category as string,
        detailsContent: this.empForm.value.detailsContent as string,
      };

      if (!this.isEdit) {
        this.store.dispatch(addBlog({ data: _data }));
      } else {
        this.store.dispatch(updateBlog({ data: _data }));
      }
      this.closepopup();
    }
  }

  closepopup() {
    this.ref.close();
  }
}
