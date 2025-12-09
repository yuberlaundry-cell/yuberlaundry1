export type UserRole =
  | 'public'
  | 'consumer'
  | 'business_admin'
  | 'business_employee'
  | 'driver'
  | 'laundromat_staff'
  | 'superadmin'
  | 'support';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatarUrl: string;
  role: UserRole;
  companyName?: string;
}

// Mock user data
export const mockUsers: Record<string, User> = {
  consumer: {
    id: 'user-consumer-1',
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane.doe@example.com',
    avatarUrl: 'https://picsum.photos/seed/user1/100/100',
    role: 'consumer',
  },
  business_admin: {
    id: 'user-bizadmin-1',
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@acmecorp.com',
    avatarUrl: 'https://picsum.photos/seed/user2/100/100',
    role: 'business_admin',
    companyName: 'Acme Corp',
  },
  business_employee: {
    id: 'user-bizemployee-1',
    firstName: 'Emily',
    lastName: 'Jones',
    email: 'emily.jones@acmecorp.com',
    avatarUrl: 'https://picsum.photos/seed/user6/100/100',
    role: 'business_employee',
    companyName: 'Acme Corp',
  },
  driver: {
    id: 'user-driver-1',
    firstName: 'Alex',
    lastName: 'Ray',
    email: 'alex.ray@example.com',
    avatarUrl: 'https://picsum.photos/seed/user3/100/100',
    role: 'driver',
  },
  laundromat_staff: {
    id: 'user-laundromat-1',
    firstName: 'Maria',
    lastName: 'Garcia',
    email: 'maria.g@example.com',
    avatarUrl: 'https://picsum.photos/seed/user5/100/100',
    role: 'laundromat_staff',
  },
  superadmin: {
    id: 'user-superadmin-1',
    firstName: 'Sam',
    lastName: 'Admin',
    email: 'sam.admin@yuberlaundry.com',
    avatarUrl: 'https://picsum.photos/seed/user4/100/100',
    role: 'superadmin',
  },
};

export const getRedirectPathForRole = (role: UserRole): string => {
  switch (role) {
    case 'consumer':
      return '/app';
    case 'business_admin':
    case 'business_employee':
      return '/business';
    case 'driver':
      return '/driver';
    case 'laundromat_staff':
      return '/laundromat';
    case 'superadmin':
    case 'support':
      return '/admin';
    default:
      return '/';
  }
};
