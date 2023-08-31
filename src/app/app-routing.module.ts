import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: 'list',
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
    loadChildren: () => import('./invite/invite.module').then(m => m.InviteModule)
  },
  {path: 'profile', loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
