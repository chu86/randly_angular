import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import { authenticationGuard } from './auth/services/auth-guard.service';

const routes: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: 'list'
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'list',
    loadChildren: () => import('./list/list.module').then(m => m.ListModule)
  },
  {
    path: 'item/:listId/:docId',
    loadChildren: () => import('./item/item.module').then(m => m.ItemModule)
  },
  {
    path: 'invite/:id',
    loadChildren: () => import('./invite/invite.module').then(m => m.InviteModule),
    canActivate: [authenticationGuard()]
  },
  { path: 'profile', loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule),
    canActivate: [authenticationGuard()]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
