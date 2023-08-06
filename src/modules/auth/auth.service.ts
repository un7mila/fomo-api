import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { TokensDto } from './dto/tokens.dto';
import { Repository } from 'typeorm';
import { Users } from 'src/entities/Users.entity';
import { SignInDTO } from './dto/sign-in.dto';
import { SignUpDTO } from './dto/sign-up.dto';
const crypto = require('crypto');

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users)
    private usersRep: Repository<Users>,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(user: SignUpDTO): Promise<Users> {
    const { password, passwordSalt } = await this.createPassword(
      user.requestPassword,
    );
    const newUser = { ...user, password, passwordSalt };
    return this.usersRep.create(newUser);
  }

  async signIn({
    requestEmail,
    requestPassword,
  }: SignInDTO): Promise<TokensDto> {
    const user = await this.usersRep.findOne({
      where: { email: requestEmail },
    });

    if (!user) {
      throw new Error('User not found');
    }

    //const isPasswordValid = await bcrypt.compare(password, user.password);

    const cryptPass = await this.getCryptResult(
      requestPassword,
      user.passwordSalt,
    );

    if (cryptPass !== user.password) {
      throw new Error('Invalid password');
    }

    return this.generateTokens({
      id: user.id,
    });
  }

  refreshWithToken(refreshToken: string): TokensDto {
    try {
      const payload = this.jwtService.verify(refreshToken);
      //check db
      const user = { id: '123234' };
      if (user) {
        return this.generateTokens({
          id: user.id,
        });
      } else {
        throw new UnauthorizedException('Invalid or expired refresh token');
      }
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }

  generateTokens(payload: { [key: string]: any }): TokensDto {
    const token = this.jwtService.sign(payload, {
      expiresIn: '7d',
    });
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '1m',
    });
    return {
      token,
      accessToken,
    };
  }

  private async createPassword(
    password: string,
  ): Promise<{ password: string; passwordSalt: string }> {
    const passwordSalt = await this.getCryptSalt();
    const cryptPassword = await this.getCryptResult(password, passwordSalt);
    return { password: cryptPassword, passwordSalt };
  }

  public getCryptResult(string, salt): Promise<string> {
    return new Promise(async (resolve, reject) => {
      crypto.pbkdf2(string, salt, 100000, 64, 'sha512', (err, key) => {
        if (err) {
          reject(err);
        }
        resolve(key.toString('base64'));
      });
    });
  }

  private getCryptSalt(): Promise<string> {
    return new Promise(async (resolve, reject) => {
      crypto.randomBytes(64, (err, buf) => {
        if (err) {
          reject(err);
        }
        resolve(buf.toString('base64'));
      });
    });
  }
}
