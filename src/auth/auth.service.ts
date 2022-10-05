import { Injectable } from '@nestjs/common';
import { compareSync } from 'bcrypt';
import { EmployeesService } from 'src/app/employees/employees.service';
import { ManagersService } from 'src/app/managers/managers.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/app/users/entities/users.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly employeeService: EmployeesService,
    private readonly managerService: ManagersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: User) {
    const payload = { sub: user.id, email: user.email };

    return {
      user,
      token: this.jwtService.sign(payload),
    };
  }

  async validateUser(email: string, password: string) {
    let user: User;
    try {
      user = await this.employeeService.findOneOrFail({ where: { email } });
    } catch (error) {
      try {
        user = await this.managerService.findOneOrFail({ where: { email } });
      } catch (error) {
        return null;
      }
    }

    const isPasswordValid = compareSync(password, user.password);
    if (!isPasswordValid) return null;

    delete user.password;
    return user;
  }
}
