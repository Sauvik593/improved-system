export interface UserDTO {
  email: string;
  firstname: string;
  id: number;
  lastname?: string;
}

export interface User extends UserDTO {
  initials: string;
}
