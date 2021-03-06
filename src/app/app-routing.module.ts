import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserWorkplaceListComponent } from './user-workplace/user-workplace-list/user-workplace-list.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'workplaces'
  },
  {
    path: 'workplaces',
    component: UserWorkplaceListComponent
  },
  {
    path: 'users',
    component: UserListComponent,
    loadChildren: () => import('./user/user.module').then(m => m.UserModule)
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
