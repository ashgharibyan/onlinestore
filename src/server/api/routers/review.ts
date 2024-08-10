import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { ReviewOptions } from "@prisma/client";
import { TRPCError } from "@trpc/server";

export const reviewRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        review: z.nativeEnum(ReviewOptions),
        description: z.string(),
        itemId: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const user = ctx.session.user;

      const todayStart = new Date();
      todayStart.setHours(0, 0, 0, 0);

      const reviewCountToday = await ctx.db.review.count({
        where: {
          userUsername: user.username,
          created_at: {
            gte: todayStart,
          },
        },
      });

      if (reviewCountToday >= 3) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You can only submit 3 reviews per day.",
        });
      }

      await ctx.db.review.create({
        data: {
          review: input.review,
          description: input.description,
          itemId: input.itemId,
          userUsername: user.username,
        },
      });
    }),
});
