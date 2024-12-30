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
import { Employee } from '../../model/Employee';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@ngrx/store';
import { addEmployee, getEmployee, updateEmployee } from '../../Store/Employee.Action';
import { getEmpList, selectEmployee } from '../../Store/Employee.Selecter';

@Component({
  selector: 'app-add-employee',
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
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css',
})
export class AddEmployeeComponent implements OnInit {

  title = 'Add News';
  dialodata: any;
  isEdit =  false;
  maxId: number = 0;

  constructor(private store: Store, private ref: MatDialogRef<AddEmployeeComponent>,
    private toastr: ToastrService, @Inject(MAT_DIALOG_DATA) public data: any
  ){

  }
  // ngOnInit(): void {
  //   this.dialodata = this.data;
  //   if(this.dialodata.code > 0){
  //     this.title = 'Edit News';
  //     this.isEdit = true;
  //     this.store.dispatch(getEmployee({empId: this.dialodata.code}));
  //     this.store.select(selectEmployee).subscribe(item=>{
  //       let _data = item;
  //       if(_data != null){
  //         this.empForm.setValue({
  //           id: _data.id,
  //           Newstitle: _data.Newstitle,
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
      this.store.dispatch(getEmployee({ empId: this.dialodata.code }));
      this.store.select(selectEmployee).subscribe(item => {
        let _data = item;
        if (_data != null) {
          this.empForm.setValue({
            id: _data.id,
            Newstitle: _data.Newstitle,
            doj: _data.doj,
            category: _data.category,
            detailsContent: _data.detailsContent,
          });
        }
      });
    }
    // else {
    //   // Lấy danh sách tất cả nhân viên để tính toán id lớn nhất
    //   this.store.select(getEmpList).subscribe(empList => {
    //     this.maxId = Math.max(...empList.map(emp => emp.id)); // Lấy id lớn nhất
    //     let nextId = this.maxId + 1
    //     this.empForm.setValue({
    //         id: nextId,
    //         Newstitle: '',
    //         doj: new Date,
    //         category: '',
    //         detailsContent: '',
    //     }); // Gán id mới là id lớn nhất + 1
    //   });
    // }
  }

  empForm = new FormGroup({
    id: new FormControl(0),
    Newstitle: new FormControl('', Validators.required),
    doj: new FormControl(new Date(), Validators.required),
    category: new FormControl('', Validators.required),
    detailsContent: new FormControl('', Validators.required),
  });



  SaveEmployee() {
    if (this.empForm.valid) {

      let _data: Employee = {
        id: this.empForm.value.id as number,
        Newstitle: this.empForm.value.Newstitle as string,
        doj: new Date(this.empForm.value.doj as Date),
        category: this.empForm.value.category as string,
        detailsContent: this.empForm.value.detailsContent as string,
      };

      if(!this.isEdit){
        this.store.dispatch(addEmployee({data: _data}))
      }else{
        this.store.dispatch(updateEmployee({data: _data}))
      }
      this.closepopup()
    }
  }

  closepopup(){
    this.ref.close()
  }
}
