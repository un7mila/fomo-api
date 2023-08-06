import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './AuthGuard';
import { TokensDto } from './dto/tokens.dto';
import { SignInDTO } from './dto/sign-in.dto';
import { Users } from 'src/entities/Users.entity';
import { SignUpDTO } from './dto/sign-up.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('validate')
  @UseGuards(AuthGuard)
  validate() {
    return true;
  }

  @Post('refresh')
  async refreshWithToken(@Req() request): Promise<TokensDto> {
    const refreshToken = request.headers.authorization?.split(' ')[1];
    const tokens = await this.authService.refreshWithToken(refreshToken);

    return tokens;
  }

  @Post('signin')
  async signIn(@Body() signInDto: SignInDTO): Promise<TokensDto> {
    const tokens = await this.authService.signIn(signInDto);

    return tokens;
  }

  @Post('signup')
  async signUp(@Body() signUpDto: SignUpDTO): Promise<Users> {
    const user = await this.authService.signUp(signUpDto);

    return user;
  }
}
