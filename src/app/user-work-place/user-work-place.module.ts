import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserWorkPlaceListComponent } from './user-work-place-list/user-work-place-list.component';
import { SharedModule } from '../shared/shared.module';
import { AddEditUserWorkPlaceDialogComponent } from './add-edit-user-work-place-dialog/add-edit-user-work-place-dialog.component';

@NgModule({
  declarations: [
    UserWorkPlaceListComponent,
    AddEditUserWorkPlaceDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class UserWorkPlaceModule { }