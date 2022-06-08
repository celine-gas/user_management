import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'; 
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-confirmation-popup',
  templateUrl: './confirmation-popup.component.html',
  styleUrls: ['./confirmation-popup.component.scss']
})
export class ConfirmationPopupComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public id: number,
    private api: ApiService,
    private dialogRef : MatDialogRef<ConfirmationPopupComponent>) { }

  ngOnInit(): void {
  }

  confirmationDeleteUser(){
    this.api.deleteUser(this.id).subscribe({
      next: (res) =>{
        this.dialogRef.close();
      },
      error: (err) =>{

      }
    })
  }
  
}
