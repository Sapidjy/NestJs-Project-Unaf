import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { LoginDto } from 'src/dto/auth.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const exinstingUser = await this.prismaService.user.findUnique({
      where: { email },
    });

    if (!exinstingUser) {
      return { message: 'Adresse email et/ou mot de passe incorrect.' };
    }

    if (!(await compare(password, exinstingUser.password))) {
      return { message: 'Adresse email et/ou mot de passe incorrect.' };
    }

    return this.authenticate({ userId: exinstingUser.id });
  }

  private async authenticate({ userId }: { userId: string }) {
    const payload = { userId };
    return {
      access_token: await this.jwtService.sign(payload),
    };
  }
}
