export interface Dependant {
  name: string;
  lastName: string;
  role: string;
}

export interface RegistrationFormData {
  name: string;
  address: string;
  birthday?: Date;
  dependants: Dependant[];
}
