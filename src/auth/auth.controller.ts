import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { LoginDto } from 'src/dto/auth.dto';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth-guard';

@ApiTags('Authentification')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get()
  @ApiOperation({ summary: 'Authentifier un utilisateur' })
  @ApiResponse({
    status: 200,
    description: 'Utilisateur authentifié avec succès.',
  })
  @ApiResponse({ status: 401, description: 'Non autorisé.' })
  async authenticate(@Req() request) {
    return await this.userService.readUser(request.user.userId);
  }

  @Post('login')
  @ApiOperation({ summary: 'Connexion' })
  @ApiResponse({
    status: 201,
    description: 'Utilisateur connecté avec succès.',
  })
  @ApiResponse({ status: 401, description: 'Identifiants invalides.' })
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }
}
