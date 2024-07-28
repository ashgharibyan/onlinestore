import { db } from "@/server/db";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { UserCreateInputSchema } from "prisma/generated/zod";
import { hashPassword, verifyPassword } from "@/util/hashing";
import { z } from "zod";

export const userRouter = createTRPCRouter({
  create: publicProcedure
    .input(UserCreateInputSchema)
    .mutation(async ({ input }) => {
      const { email, password, username, first_name, last_name } = input;

      await db.user.findUnique({ where: { email } }).then((user) => {
        if (user) {
          throw new Error("Email already in use");
        }
      });
      await db.user.findUnique({ where: { username } }).then((user) => {
        if (user) {
          throw new Error("Username already in use");
        }
      });
      //  hash the password and create user
      const hashedPassword = await hashPassword(password);

      await db.user.create({
        data: {
          email,
          password: hashedPassword,
          username,
          first_name,
          last_name,
        },
      });
    }),
  getByUsername: protectedProcedure
    .input(z.object({ username: z.string() }))
    .query(async ({ input }) => {
      return db.user.findUnique({ where: { username: input.username } });
    }),
  login: publicProcedure
    .input(
      z.object({
        username: z.string(),
        password: z.string().min(6),
      })
    )
    .mutation(async ({ input }) => {
      const { username, password } = input;

      const user = await db.user.findUnique({
        where: { username },
      });

      if (!user || !(await verifyPassword(password, user.password))) {
        throw new Error("Invalid username or password");
      }

      return user;
    }),
});
