import {UserListRole} from "./user-list-role-enum.model";

export interface UserList {
  listUid: string,
  role: UserListRole,
  userUid: string
}
