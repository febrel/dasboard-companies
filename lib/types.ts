export type Company = {
  id: string;
  userId: string;
  name: string;
  description: string | null;
  profileImage: string;
  cif: string;
  phone: string;
  country: string;
  website: string;
  createAt: Date;
  updateAt: Date;
};

export type Contact = {
  id: string;
  companyId: string | null;
  name: string;
  role: string;
  email: string;
  phone: string;
  createAt: Date;
  updateAt: Date;
};

export type Event = {
  id: string;
  companyId: string;
  title: string;
  start: Date;
  allDay: boolean;
  timeFormat: string;
  createAt: Date;
  updateAt: Date;
};
