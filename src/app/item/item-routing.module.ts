import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {ItemLayoutComponent} from "./components/item-layout/item-layout.component";

const routes: Routes = [
  {
    path: '',
    component: ItemLayoutComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemRoutingModule {
}
