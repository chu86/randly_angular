import {FormArray, FormControl} from "@angular/forms";
import { BasicList } from "./basic-list.model";

export interface ListItemForm {
    listitems: FormArray<FormControl<BasicList>>;
}
