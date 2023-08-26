import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ItemComponent} from "./list/components/item/item.component";

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
    component: ItemComponent,
  },
  {path: 'profile', loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
