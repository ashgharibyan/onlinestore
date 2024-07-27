import { db } from "@/server/db";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { UserCreateInputSchema } from "prisma/generated/zod";
import { hashPassword, verifyPassword } from "@/util/hashing";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import jwt from "jsonwebtoken";
import { cookies, headers } from "next/headers";

export const userRouter = createTRPCRouter({
  create: publicProcedure
    .input(UserCreateInputSchema)
    .mutation(async ({ input }) => {
      console.log("---------input", input);
      const { email, password, username, first_name, last_name } = input;

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
  login: publicProcedure
    .input(
      z.object({
        username: z.string(),
        password: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { username, password } = input;
      const user = await db.user.findUnique({ where: { username } });

      if (!user || !(await verifyPassword(password, user.password))) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Invalid username or password",
        });
      }

      const token = jwt.sign(
        { username: user.username },
        process.env.JWT_SECRET!,
        {
          expiresIn: "1h",
        }
      );

      // Set the JWT token in a cookie
      const cookieHeader = cookies();
      cookieHeader.set("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60, // 1 hour
        path: "/",
      });

      return new Response("Logged in", {
        status: 200,
      });
    }),
});
