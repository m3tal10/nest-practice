import { Role } from 'src/app/common/decorators/roles.decorator';

declare global {
  namespace Express {
    interface User {
      id: string;
      email: string;
      role: Role;
    }
    interface Request {
      user?: User;
    }
  }
}
export {};
