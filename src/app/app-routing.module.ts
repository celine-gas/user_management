import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { UserComponent } from './components/user/user.component';
import { AuthGuardGuard } from './guards/auth-guard.guard';
import { RoleGuardGuard } from './guards/role-guard.guard';

const routes: Routes = [
  {
    path: 'userList', 
    component: UserComponent, 
    canActivate: [AuthGuardGuard, RoleGuardGuard], 
    data: { 
      expectedRoles:  ['Admin', 'Project Leader'] //liste des roles autorisés
    } 
  },
  {
    path: 'home', 
    component: HomeComponent, 
    canActivate: [AuthGuardGuard, RoleGuardGuard], 
    data: { 
      expectedRoles:  ['Admin', 'Project Leader', 'User']
    }
  },
  {path: '**', redirectTo: '/home', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [UserComponent, HomeComponent]