import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {ListHomeComponent} from "./components/list-home/list-home.component";
import {ListComponent} from "./components/list/list.component";

const routes: Routes = [
  {
    path: '',
    component: ListHomeComponent,
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
