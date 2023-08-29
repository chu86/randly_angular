import {Component} from '@angular/core';
import {Router} from "@angular/router";

@Component({
    selector: 'app-list-layout',
    templateUrl: './list-layout.component.html',
    styleUrls: ['./list-layout.component.scss']
})
export class ListLayoutComponent {
    constructor(
        private router: Router) {
    }

    onListSelected($event: string) {
        this.router.navigate(['list', {outlets: {list: ['id', $event]}}]);
    }
}
