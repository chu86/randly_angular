
export interface BasicList {
    parent?: BasicList
    id?: string;
    name: string;
    description1: string;
    created: Date;
    tags: string[];
}
