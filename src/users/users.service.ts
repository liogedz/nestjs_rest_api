import { Injectable } from '@nestjs/common';
import { User } from 'src/common/user/user';
import { Role } from 'src/common/role';
import { CreateUserDto } from './dto/create-user-dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user-dto/update-user-dto';

@Injectable()
export class UsersService {
  private users: User[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: Role.ADMIN },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: Role.ENGINEER,
    },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: Role.INTERN },
  ];

  findAll(role?: Role): User[] {
    if (role) {
      return this.users.filter((user) => user.role === role);
    }
    return this.users;
  }
  findOne(id: number) {
    return this.users.find((user) => user.id === id);
  }
  create(createUserDto: CreateUserDto) {
    const maxId =
      this.users.length > 0 ? Math.max(...this.users.map((u) => u.id)) : 0;

    const user: User = {
      id: maxId + 1,
      ...createUserDto,
    };
    this.users.push(user);
    return user;
  }
  update(id: number, userUpdate: UpdateUserDto) {
    const user = this.findOne(id);
    if (user) {
      Object.assign(user, userUpdate);
      return user;
    }
    return null;
  }

  remove(id: number) {
    const index = this.users.findIndex((user) => user.id === id);
    if (index !== -1) {
      const removedUser = this.users.splice(index, 1)[0];
      return removedUser;
    }
    return null;
  }
}
