import { Orderable } from "src/app/shared/model/orderable.model";

export interface ItemListItem extends Orderable {
    id?: string;
    name: string;
    count: string;
    order: number;
}
