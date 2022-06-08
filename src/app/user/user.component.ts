import { Component, Input, OnInit,ViewChild } from '@angular/core';
import { ApiService } from '../services/api.service';
import { UserFormDialogComponent } from '../user-form-dialog/user-form-dialog.component';
import { IUser } from '../models/user.interface';

import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import { ConfirmationPopupComponent } from '../confirmation-popup/confirmation-popup.component';



@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  @Input() currentUser!: IUser;

  displayedColumns: string[] = ["id", "lastName", "firstName", "role", "creationDate", "action"];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private dialog: MatDialog, private api: ApiService) {}

  ngOnInit(): void {
    this.getAllUser();
  }
  
  openDialog() {
    this.dialog.open(UserFormDialogComponent, {
      width:'40%'
    }).afterClosed().subscribe(val => {
      if(val === "save"){
        this.getAllUser();
      }
    })
  }

  getAllUser(){
    this.api.getUser().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource<IUser>(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) =>{
        alert(err);
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editUser(row: IUser){
    this.dialog.open(UserFormDialogComponent, {
      width: '40%',
      data: row
    }).afterClosed().subscribe(val => {
      if(val === "update"){
        this.getAllUser()
      }
    })
  }

  deleteUser(id: number){
    this.dialog.open(ConfirmationPopupComponent, {
      width: '40%',
      data: id
    }).afterClosed().subscribe(val => {
        this.getAllUser()
    })
  }
}
