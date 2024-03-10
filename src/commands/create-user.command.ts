import { Command, CommandRunner, Option } from 'nest-commander';
import { UserService } from '../modules/common/user.service';
import { Role } from '../modules/common/rbac/role.enum';
import * as bcrypt from 'bcrypt';

@Command({ name: 'create-user', description: 'Create a new user' })
export class CreateUserCommand extends CommandRunner {
  constructor(private readonly userService: UserService) {
    super();
  }

  async run(
    passedParam: string[],
    options: { login: string; password: string; name: string; roles: Role[] },
  ): Promise<void> {
    const userExists = await this.userService.userExists(options.login);

    if (userExists) {
      console.log(`User with login '${options.login}' already exists\n`);
    } else {
      const hashedPassword = await bcrypt.hash(options.password, 10);

      const user = {
        login: options.login,
        passwordHash: hashedPassword,
        name: options.name,
        roles: options.roles,
      };

      try {
        const createdUser = await this.userService.create(user);

        console.log(`User created with ID: ${createdUser.id}\n`);
      } catch (error) {
        console.log(`${error}\n`);
      }
    }
  }

  @Option({
    flags: '-l, --login <login>',
    description: 'User login',
    required: true,
  })
  parseLogin(val: string): string {
    if (val.length < 1 || val.length > 255) {
      throw new Error('Login must be between 1 and 255 characters long\n');
    }
    return val;
  }

  @Option({
    flags: '-p, --password <password>',
    description: 'User password',
    required: true,
  })
  parsePassword(val: string): string {
    if (val.length < 8 || val.length > 255) {
      throw new Error('Password must be between 8 and 255 characters long\n');
    }
    return val;
  }

  @Option({
    flags: '-n, --name <name>',
    description: 'User name',
    required: true,
  })
  parseName(val: string): string {
    if (val.length < 1 || val.length > 255) {
      throw new Error('Name must be between 1 and 255 characters long\n');
    }
    return val;
  }

  @Option({
    flags: '-r, --roles <roles>',
    description: 'User roles',
    choices: [Role.ADMIN, Role.TEACHER],
    required: true,
  })
  parseRoles(val: string): Role[] {
    const roles = val.split(',').map((role) => role.trim() as Role);
    roles.forEach((role) => {
      if (!Object.values(Role).includes(role)) {
        throw new Error(
          `Invalid role: ${role}. Valid roles are: ${Object.values(Role).join(', ')}\n`,
        );
      }
    });

    return roles;
  }
}
