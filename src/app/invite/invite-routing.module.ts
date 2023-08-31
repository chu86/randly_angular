import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {InviteLayoutComponent} from "./components/invite-layout/invite-layout.component";

const routes: Routes = [
  {
    path: '',
    component: InviteLayoutComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InviteRoutingModule {
}
