import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import { StartComponent } from "./components/start/start.component";

const routes: Routes = [
  {
    path: '',
    component: StartComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StartRoutingModule {
}
