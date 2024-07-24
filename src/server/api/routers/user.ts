import { db } from "@/server/db";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { UserCreateInputSchema } from "prisma/generated/zod";
import { hashPassword } from "@/util/hashing";

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
});
