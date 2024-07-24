import { db } from "@/server/db";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { UserCreateInputSchema } from "prisma/generated/zod";

export const userRouter = createTRPCRouter({
  create: publicProcedure
    .input(UserCreateInputSchema)
    .mutation(async ({ input }) => {
      console.log("---------input", input);
      const { email, password, username, first_name, last_name } = input;

      await db.user.create({
        data: {
          email,
          password,
          username,
          first_name,
          last_name,
        },
      });
    }),
});
