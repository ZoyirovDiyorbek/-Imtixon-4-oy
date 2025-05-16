import {
  ConflictException,
  Injectable,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models';
import { LoginDto, RegisterDto } from './dtos';
import * as bcrypt from 'bcryptjs';
import { JwtHelper } from 'src/helpers/jwt.helper';
import { UserRoles } from './enums';

@Injectable()
export class UserService implements OnModuleInit {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    private jwtService: JwtHelper,
  ) {}

  async onModuleInit() {
    await this.seedUser();
  }

  async register(payload: RegisterDto) {
    const founded = await this.userModel.findOne({
      where: { email: payload.email },
    });

    if (founded) {
      throw new ConflictException(`Bunday foydalanuvchi tizimda bor`);
    }

    const passwordHash = bcrypt.hashSync(payload.password);
    const newUser = await this.userModel.create({
      name: payload.name,
      email: payload.email,
      password: passwordHash,
    });

    return {
      message: "Foydalanuvchi muofaqqiyatli muofaqiyatli ro'yhatdan o'tdi!",
      data: newUser,
    };
  }

  async login(payload: LoginDto) {
    const foundedUser = await this.userModel.findOne({
      where: { email: payload.email },
    });

    if (!foundedUser) {
      throw new NotFoundException(`Bunday emaillik foydalanuvchi mavjud emas`);
    }

    const password = await bcrypt.compare(
      payload.password,
      foundedUser.dataValues.password,
    );

    if (!password) {
      throw new ConflictException(
        'Parol xato kiritildi! Iltimos tekshirib qaytadan kiring!',
      );
    }

    const role = foundedUser.dataValues.role;
    const { token } = await this.jwtService.generateToken({
      id: foundedUser.id,
      role: role,
    });

    return {
      message: 'Foydalanuvchi tizimga kirdi',
      data: {
        token,
        founded: foundedUser,
      },
    };
  }

  async seedUser() {
    const defultUser = [
      {
        name: 'Tom',
        email: 'tom@gmail.com',
        password: 'tom123',
        role: UserRoles.ADMIN,
      },
    ];

    for (let user of defultUser) {
      const foundedUser = await this.userModel.findOne({
        where: { email: user.email },
      });

      if (!foundedUser) {
        const passwordHash = bcrypt.hashSync(user.password);
        await this.userModel.create({
          name: user.name,
          role: user.role,
          email: user.email,
          password: passwordHash,
        });
      }
      console.log('Admin mufaqqiyatli yaratildi!');
    }
  }
}
