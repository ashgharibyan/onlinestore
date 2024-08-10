import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { ItemCreateWithoutUserInputSchema } from "prisma/generated/zod";
import { TRPCError } from "@trpc/server";

export const itemRouter = createTRPCRouter({
  create: protectedProcedure
    .input(ItemCreateWithoutUserInputSchema)
    .mutation(async ({ ctx, input }) => {
      const todayStart = new Date();
      todayStart.setHours(0, 0, 0, 0);

      const itemCountToday = await ctx.db.item.count({
        where: {
          userUsername: ctx.session.user.username,
          created_at: {
            gte: todayStart,
          },
        },
      });

      if (itemCountToday >= 2) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You can only create 2 items per day.",
        });
      }

      await ctx.db.item.create({
        data: {
          title: input.title,
          description: input.description,
          category: input.category,
          price: input.price,
          userUsername: ctx.session.user.username,
        },
      });
    }),
  getAll: protectedProcedure
    .input(
      z.object({ category: z.string().optional(), sort: z.string().optional() })
    )
    .query(async ({ ctx, input }) => {
      const searchCategory = input.category ? input.category : "";

      const categorizedItems = ctx.db.item.findMany({
        where: {
          category: {
            contains: searchCategory,
            mode: "insensitive",
          },
        },
      });

      if (input.sort) {
        return (await categorizedItems).sort((a, b) => {
          if (input.sort === "asc") {
            return a.price - b.price;
          }
          return b.price - a.price;
        });
      }

      return categorizedItems;
    }),
  getOne: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.item.findUnique({
        where: { id: input.id },
        include: { reviews: true },
      });
    }),
});
