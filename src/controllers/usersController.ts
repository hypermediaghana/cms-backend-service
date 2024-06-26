import { Request, Response } from "express";
import JWT from "jsonwebtoken";

import { prisma } from "../utils/context";
import { comparePassword, hashPassword } from "../utils/hashpasswords";

import * as dotenv from "dotenv";
dotenv.config();

const JWT_SECRET: string = process.env.JWT_SECRET;

const selectStatement = {
  id: true,
  email: true,
  first_name: true,
  last_name: true,
  other_name: true,
  active: true,
  profile_image: true,
  role: true,
};

export class userController {
  async createUser(req: Request, res: Response) {
    try {
      const {
        first_name,
        last_name,
        other_name,
        email,
        password,
        created_by,
        profile_image,
      } = req.body;
      const existingUser = await prisma.user.findMany({
        where: {
          email,
        },
      });
      if (existingUser.length >= 1) {
        res.status(409).json({ message: "Email already exists", data: null });
      } else {
        const response = await prisma.user.create({
          data: {
            first_name,
            last_name,
            other_name,
            email,
            password: await hashPassword(password),
            created_by,
            profile_image,
          },
          select: selectStatement,
        });
        res
          .status(200)
          .json({ message: "User Created Succesfully", data: response });
      }
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Internal Server Error", data: error });
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      const {
        id,
        first_name,
        last_name,
        other_name,
        email,
        password,
        updated_by,
        profile_image,
      } = req.body;
      const existingUser = await prisma.user.findFirst({
        where: {
          id: Number(id),
        },
      });
      if (!existingUser) {
        res.status(409).json({ message: "Id does not Exist", data: null });
      } else {
        const response = await prisma.user.update({
          where: {
            id: Number(id),
          },
          data: {
            first_name,
            last_name,
            other_name,
            email,
            password: await hashPassword(password),
            updated_by,
            updated_at: new Date(),
            profile_image,
          },
          select: selectStatement,
        });
        res
          .status(200)
          .json({ message: "User Updated Succesfully", data: response });
      }
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Internal Server Error", data: error });
    }
  }
  async deleteUser(req: Request, res: Response) {
    try {
      const { id } = req.body;
      const existingUser = await prisma.user.findFirst({
        where: {
          id: Number(id),
        },
      });
      if (!existingUser) {
        res.status(409).json({ message: "Id does not Exist", data: null });
      } else {
        const response = await prisma.user.delete({
          where: {
            id: Number(id),
          },
          select: selectStatement,
        });
        res
          .status(200)
          .json({ message: "User Deleted Succesfully", data: response });
      }
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Internal Server Error", data: error });
    }
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
      const existance: any = await prisma.user.findUnique({
        where: {
          email,
        },
        select: {
          id: true,
          email: true,
          first_name: true,
          last_name: true,
          other_name: true,
          role: true,
          password: true,
        },
      });

      if (!existance) {
        return res
          .status(404)
          .json({ message: "No user with Email", data: null });
      }

      if (await comparePassword(password, existance?.password)) {
        const token = JWT.sign(
          {
            id: existance.id,
            name: `${existance.first_name} ${existance.other_name} ${existance.last_name}`,
            email: existance.email,
            role: existance.role,
            image: existance.profile_image,
          },
          JWT_SECRET,
          {
            expiresIn: "12h",
          }
        );

        return res
          .status(200)
          .json({ status: "Login Successfully", token: token });
      } else {
        return res
          .status(401)
          .json({ message: "Invalid Credentials", data: null });
      }
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Internal Server Error", data: error });
    }
  }

  async ListUsers(req: Request, res: Response) {
    const { active, name } = req.body;

    try {
      const response = await prisma.user.findMany({
        orderBy: {
          id: "desc",
        },
        where: {
          AND: {
            active,
            first_name: {
              contains: name ? name.trim() : undefined,
            },
          },
        },
        select: selectStatement,
      });
      res.status(200).json({ message: "Operation Succesful", data: response });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Something Went Wrong", data: error });
    }
  }
}
