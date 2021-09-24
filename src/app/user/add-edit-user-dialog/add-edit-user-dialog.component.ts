import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IUserAddEdit } from 'src/app/shared/interfaces/user-add-edit';
import { UserService } from '../user.service';

@Component({
  selector: 'app-add-edit-user-dialog',
  templateUrl: './add-edit-user-dialog.component.html',
  styleUrls: ['./add-edit-user-dialog.component.css']
})
export class AddEditUserDialogComponent {

  title: string;
  submitButtonTitle: string;
  submitButtonColor: string;
  userId: number;
  user: IUserAddEdit;

  errors!: string[]

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<AddEditUserDialogComponent>,
    private userService: UserService) {
    this.title = data.title || 'Create User';
    this.submitButtonTitle = data.isCreate ? 'Create' : 'Save';
    this.submitButtonColor = data.isCreate ? 'accent' : 'primary';
    this.userId = data.userId;
    this.user = data.user;
  }

  onSubmit(user: IUserAddEdit) {
    if (this.data.isCreate) {
      this.userService.createUser(user).subscribe(
        () => {
          this.dialogRef.close({ confirmed: true });
        },
        (error: HttpErrorResponse) => {
          this.errors = error.error;
        }
      );
    } else {
      this.userService.editUser(this.userId, user).subscribe(
        () => {
          this.dialogRef.close({ confirmed: true });
        },
        (error: HttpErrorResponse) => {
          this.errors = error.error;
        }
      );
    }
  }
}
