import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {ListLayoutComponent} from "./components/list-layout/list-layout.component";
import {ListComponent} from "./components/list/list.component";

const routes: Routes = [
  {
    path: '',
    component: ListLayoutComponent,
    children: [
      {
        path: 'id/:id',
        component: ListComponent,
        outlet: 'list'
      },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListRoutingModule {
}
