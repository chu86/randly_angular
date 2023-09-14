import {UserListRole} from "./user-list-role-enum.model";

export interface UserList {
  id?: string;
  listUid: string,
  role: UserListRole,
  userUid: string
}
