import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./auth/components/login/login.component";
import {UserListComponent} from "./list/components/user-list/user-list.component";
import {ListComponent} from "./list/components/list/list.component";

const routes: Routes = [
    // {path: '', component: UserListComponent},
    // {path: 'login', component: LoginComponent},
    // {path: 'list', component: ListComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
