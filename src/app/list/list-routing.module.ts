import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {ListComponent} from "./components/list/list.component";
import {ListLayoutComponent} from "./components/list-layout/list-layout.component";

const routes: Routes = [
  {
    path: '',
    component: ListLayoutComponent,
  },
  {
    path: ':id',
    component: ListComponent,
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListRoutingModule {
}
