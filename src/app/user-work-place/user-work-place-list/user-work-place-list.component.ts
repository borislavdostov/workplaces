import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { IUserWorkPlace } from 'src/app/shared/interfaces/user-work-place';
import { IUserWorkPlaceAddEdit } from 'src/app/shared/interfaces/user-work-place-add-edit';
import { AddEditUserWorkPlaceDialogComponent } from '../add-edit-user-work-place-dialog/add-edit-user-work-place-dialog.component';
import { UserWorkPlaceService } from '../user-work-place.service';

@Component({
  selector: 'app-work-place-list',
  templateUrl: './user-work-place-list.component.html',
  styleUrls: ['./user-work-place-list.component.css']
})
export class UserWorkPlaceListComponent implements OnInit {

  workPlaces!: IUserWorkPlace[];
  workPlacesTitle: string = '';
  displayedColumns: string[] = ['user', 'workPlace', 'fromDate', 'toDate', 'options'];

  constructor(
    private userWorkPlaceService: UserWorkPlaceService,
    private snackBar: MatSnackBar,
    private confirmationDialog: MatDialog,
    private addEditWorkPlaceDialog: MatDialog) { }

  ngOnInit(): void {
    this.getUserWorkPlaces();
  }

  getUserWorkPlaces() {
    this.userWorkPlaceService.getUserWorkPlaces().subscribe(workPlaces => {
      this.workPlaces = workPlaces;
      this.workPlacesTitle = `${this.workPlaces.length} Work Places`;
    });
  }

  openNewDialog() {
    let dialogRef = this.addEditWorkPlaceDialog.open(AddEditUserWorkPlaceDialogComponent, {
      data: {
        isCreate: true
      }
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult?.confirmed) {
        this.createWorkPlace(dialogResult.userWorkPlace);
      }
    });
  }

  createWorkPlace(userWorkPlace: IUserWorkPlaceAddEdit) {
    this.userWorkPlaceService.createUserWorkPlace(userWorkPlace).subscribe({
      next: (data) => {
        this.getUserWorkPlaces();
      },
      error: (response) => {
        alert("Implement backend errors:" + response.error.errors);
      }
    });
  }

  openEditDialog(workPlace: IUserWorkPlace) {
    let dialogRef = this.addEditWorkPlaceDialog.open(AddEditUserWorkPlaceDialogComponent, {
      data: {
        title: `Edit Work Place ${workPlace.workPlace} for user ${workPlace.user}`,
      }
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult?.confirmed) {
        this.editWorkPlace(workPlace);
      }
    });
  }

  editWorkPlace(workPlace: IUserWorkPlace) {

  }

  openDeleteDialog(workPlace: IUserWorkPlace) {
    let dialogRef = this.confirmationDialog.open(ConfirmationDialogComponent, {
      data: {
        message: `Are you sure you want to delete work place ${workPlace.workPlace} for user ${workPlace.user}?`
      }
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.deleteWorkPlace(workPlace.id);
      }
    })
  }

  deleteWorkPlace(id: number) {
    this.userWorkPlaceService.deleteUserWorkPlace(id).subscribe({
      next: (data) => {
        this.getUserWorkPlaces();
      },
      error: (err) => {
        let snackBarRef = this.snackBar.open("Error deleting work place!", "RETRY");
        snackBarRef.onAction().subscribe(() => this.deleteWorkPlace(id));
      }
    });
  }

}
