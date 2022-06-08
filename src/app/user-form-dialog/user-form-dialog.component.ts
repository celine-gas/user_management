import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'; 
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-user-form-dialog',
  templateUrl: './user-form-dialog.component.html',
  styleUrls: ['./user-form-dialog.component.scss'],
  providers: [DatePipe]
})
export class UserFormDialogComponent implements OnInit {

  rightList = ["User", "Project Leader", "Admin"];
  userForm !: FormGroup; 
  actionButton:  string = "Save";
  currentCreationDate : Date = new Date();
  popupTitle: string = "New User";
  submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef : MatDialogRef<UserFormDialogComponent>,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      login: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
      creationDate: [''],
    })
    
    if(this.editData){
      this.submitted = false;
      this.popupTitle = "Update User"
      this.currentCreationDate = this.editData.creationDate;
      this.actionButton = "Update";
      this.userForm.controls['firstName'].setValue(this.editData.firstName);
      this.userForm.controls['lastName'].setValue(this.editData.lastName);
      this.userForm.controls['login'].setValue(this.editData.login);
      this.userForm.controls['email'].setValue(this.editData.email);
      this.userForm.controls['role'].setValue(this.editData.role);
      this.userForm.controls['creationDate'].setValue(this.editData.creationDate);
    }
  }

    // convenience getter for easy access to form fields
    get f() { return this.userForm.controls; }

  addUser(){
    if (this.userForm.invalid) {
      this.submitted = true;
      console.log("invalid")
      return;
    }

    if(!this.editData){
          this.api.postUser(this.userForm.value).subscribe({
            next: (res) => {
              this.userForm.reset();
              this.dialogRef.close("save");
            },
            error: (e) => {
              alert(e);
            }
          })
    }else{
      this.updateUser();
    }
  }

  updateUser(){
    this.api.putUser(this.userForm.value, this.editData.id).subscribe({
      next: (res) => {
        this.userForm.reset()
        this.dialogRef.close("update");
      }, 
      error: (err) => {
        alert(err);
      }
    })
    
  }

}
