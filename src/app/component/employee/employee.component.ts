import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddEmployeeComponent } from '../add-blog/add-blog.component';
import { Employee } from '../../model/Employee';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { deleteEmployee, loadEmployee } from '../../Store/Employee.Action';
import { getEmpList } from '../../Store/Employee.Selecter';

@Component({
  selector: 'app-employee',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatTableModule,
    CommonModule,
  ],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css',
})
export class EmployeeComponent implements OnInit, OnDestroy {
  empList: Employee[] = [];
  dataSource!: MatTableDataSource<Employee>;
  displayedColumns: string[] = [
    'id',
    'Newstitle',
    'category',
    'detailsContent',
    'doj',
    'action',
  ];
  subscription = new Subscription();

  constructor(private dialog: MatDialog, private store: Store) {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  ngOnInit(): void {
    this.GetallEmployee();
  }

  GetallEmployee() {
    this.store.dispatch(loadEmployee());
    this.store.select(getEmpList).subscribe((item) => {
      this.empList = item;
      this.dataSource = new MatTableDataSource(this.empList);
    });
  }

  addemployee() {
    this.openpopup(0);
  }

  addCategory() {}

  DeleteEmployee(empId: number) {
    if (confirm('Are you sure to delete it?')) {
      this.store.dispatch(deleteEmployee({ empId: empId }));
    }
  }

  EditEmployee(empId: number) {
    this.openpopup(empId);
  }

  openpopup(empid: number) {
    this.dialog
      .open(AddEmployeeComponent, {
        width: '50%',
        data: {
          code: empid,
        },
      })
      .afterClosed()
      .subscribe((o) => {
        this.GetallEmployee();
      });
  }
}
