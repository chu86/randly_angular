import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {FormControl} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
    selector: 'app-input-filter',
    templateUrl: './input-filter.component.html',
    styleUrls: ['./input-filter.component.scss']
})
export class InputFilterComponent implements OnInit, OnDestroy {

    public filterInput = new FormControl('');

    public hasValue = false;

    @Output()
    public valueChanged = new EventEmitter<string | null>();

    private formSubscription: Subscription | undefined;

    resetValue() {
        this.filterInput?.reset();
    }

    ngOnInit(): void {
        this.formSubscription = this.filterInput.valueChanges.subscribe(value => this.onValueChanged(value))
        this.resetValue();
    }

    ngOnDestroy(): void {
        this.formSubscription?.unsubscribe();
    }

    private onValueChanged(value: string | null) {
        this.hasValue = value != null && value != '';
        this.valueChanged.emit(value);
    }
}
