import {FormArray, FormControl} from "@angular/forms";
import {ListItem} from "./list-item.model";

export interface ListItemForm {
    listitems: FormArray<FormControl<ListItem>>;
}
