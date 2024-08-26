import { Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { CreateUserDto, UpdateUserDto } from 'src/dto/user.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async readUsers() {
    try {
      const users = await this.prismaService.user.findMany({
        select: {
          id: true,
          username: true,
          email: true,
          role: true,
          createdAt: true,
          updatedAt: true,
          projects: true,
          tasks: true,
        },
      });

      if (users.length === 0) {
        return { message: 'Aucun utilisateur trouve.' };
      }

      return users;
    } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs:', error);
      return { message: 'Erreur lors de la récupération des utilisateurs.' };
    }
  }

  async readUser(userId: string) {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          username: true,
          email: true,
          role: true,
          createdAt: true,
          updatedAt: true,
          projects: true,
          tasks: true,
        },
      });

      if (!user) {
        return { message: 'Aucun utilisateur trouvé avec cet ID.' };
      }

      return user;
    } catch (error) {
      console.error("Erreur lors de la récupération de l'utilisateur:", error);
      return { message: "Erreur lors de la récupération de l'utilisateur." };
    }
  }

  async createUser(createUserDto: CreateUserDto) {
    const { username, email, password, role } = createUserDto;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { message: `L'email fourni est invalide.` };
    }

    try {
      const existingUser = await this.prismaService.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        return { message: `Un utilisateur avec cet email existe déjà.` };
      }

      const hashPass = await this.hashPassword(password);

      const newUser = await this.prismaService.user.create({
        data: { username, email, password: hashPass, role },
        include: { projects: true, tasks: true },
      });

      return newUser;
    } catch (error) {
      console.error("Erreur lors de la création de l'utilisateur:", error);
      return { message: "Erreur lors de la création de l'utilisateur." };
    }
  }

  async updateUser(updateUserDto: UpdateUserDto) {
    const { userId, username, email, password, role } = updateUserDto;

    try {
      const findUser = await this.prismaService.user.findUnique({
        where: { id: userId },
      });

      if (!findUser) {
        return { message: `Utilisateur d'ID ${userId} est introuvable.` };
      }

      if (email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          return { message: "L'email fourni est invalide." };
        }
      }

      // Hacher le mot de passe si fourni
      const updatedData = {
        username,
        email,
        password: password ? await this.hashPassword(password) : undefined,
        role,
      };

      const updatedUser = await this.prismaService.user.update({
        where: { id: userId },
        data: updatedData,
        select: {
          id: true,
          username: true,
          email: true,
          role: true,
          createdAt: true,
          updatedAt: true,
          projects: true,
          tasks: true,
        },
      });

      return updatedUser;
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'utilisateur:", error);
      return { message: "Erreur lors de la mise à jour de l'utilisateur." };
    }
  }

  async deleteUser(userId: string) {
    try {
      const findUser = await this.prismaService.user.findUnique({
        where: { id: userId },
      });

      if (!findUser) {
        return { message: `Utilisateur d'ID ${userId} est introuvable.` };
      }

      await this.prismaService.user.delete({
        where: { id: userId },
      });

      return { message: `Utilisateur d'ID ${userId} supprimé avec succès.` };
    } catch (error) {
      console.error("Erreur lors de la suppression de l'utilisateur:", error);
      return { message: "Erreur lors de la suppression de l'utilisateur." };
    }
  }

  async hashPassword(password: string) {
    const hashedPassword = await hash(password, 10);
    return hashedPassword;
  }
}
