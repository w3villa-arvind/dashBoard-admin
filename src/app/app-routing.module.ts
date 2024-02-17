import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuperadminComponent } from './superadmin/superadmin.component';
import { UsersComponent } from './components/users/users.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'superadmin/user',
    pathMatch: 'full',
  },
  {
    path: 'superadmin',
    component: SuperadminComponent,
    children: [
      {
        path: 'user',
        component: UsersComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
