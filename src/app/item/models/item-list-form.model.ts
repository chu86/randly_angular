import {FormArray, FormControl} from "@angular/forms";
import {ItemListItem} from "./item-list-item.model";

export interface ItemListForm {
  listitems: FormArray<FormControl<ItemListItem>>;
}
