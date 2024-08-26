import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';
import {
  CreateUserDto,
  DeleteUserDto,
  UpdateUserDto,
  UserDto,
} from 'src/dto/user.dto';
import { UserService } from './user.service';

@ApiTags('Utilisateurs')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'Récupérer tous les utilisateurs' })
  readAll() {
    return this.userService.readUsers();
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Récupérer un utilisateur par ID' })
  @ApiParam({ name: 'id', description: "L'ID de l'utilisateur à récupérer" })
  readOne(@Param('id') userId: string) {
    return this.userService.readUser(userId);
  }

  @Post()
  @ApiOperation({ summary: 'Créer un nouvel utilisateur' })
  @ApiBody({
    type: CreateUserDto,
    description: 'Les informations pour créer un nouvel utilisateur',
  })
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.createUser(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  @ApiOperation({ summary: 'Mettre à jour un utilisateur' })
  @ApiParam({
    name: 'id',
    description: "L'ID de l'utilisateur à mettre à jour",
  })
  @ApiBody({
    type: UserDto,
    description: "Les nouvelles informations de l'utilisateur",
  })
  async update(@Param('id') userId: string, @Body() userDto: UserDto) {
    const updateUserDto: UpdateUserDto = { userId, ...userDto };
    return await this.userService.updateUser(updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  @ApiOperation({ summary: 'Supprimer un utilisateur' })
  @ApiBody({
    type: DeleteUserDto,
    description: "Les informations de l'utilisateur à supprimer",
  })
  async delete(@Body() deleteUserDto: DeleteUserDto) {
    return await this.userService.deleteUser(deleteUserDto.userId);
  }
}
