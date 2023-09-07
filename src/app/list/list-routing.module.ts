import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {ListLayoutComponent} from "./components/list-layout/list-layout.component";
import {CollectionsLayoutComponent} from "./components/collections-layout/collections-layout.component";

const routes: Routes = [
  {
    path: '',
    component: CollectionsLayoutComponent,
  },
  {
    path: ':id',
    component: ListLayoutComponent,
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListRoutingModule {
}
