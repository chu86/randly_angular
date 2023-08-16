import {ListType} from "./list-type-enum.model";

export interface BasicList {
    id: string;
    name: string;
    description1: string;
    type: ListType
}
