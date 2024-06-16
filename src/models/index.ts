export type User = {
  id?: number;
  login?: string;
  password?: string;
  roles?: Role[];
  profile?: Profile;
};

export type Role = Permission[];

export type Permission = {
  resource: Resource;
  create: boolean;
  read: boolean;
  update: boolean;
  delete: boolean;
};
export type Resource = "bike" | "sled" | "scooter";

export type Profile = {
  firstname: string;
  lastname: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  zipCode: string;
  country: string;
};

// interface IUser {
//   login: string;
//   password: string;
// }

// class User {
//   constructor(
//     private readonly login: string,
//     private readonly password: string
//   ) {}
// }
