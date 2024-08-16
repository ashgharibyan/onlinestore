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
  //       the search will return the
  // user (or users) who (the same user) posted two different items on the same day, such that one
  // item has a category in the first text field and the other has a category in the second text field

  twoCategories: protectedProcedure
    .input(z.object({ category1: z.string(), category2: z.string() }))
    .query(async ({ input }) => {
      const { category1, category2 } = input;
      console.log("category1", category1);
      console.log("category2", category2);

      const today = new Date();
      today.setHours(0, 0, 0, 0); // Set time to the start of the day

      const users = await db.user.findMany({
        where: {
          items: {
            some: {},
          },
        },
        select: {
          username: true,
          items: {
            select: {
              title: true,
              category: true,
              created_at: true,
            },
          },
        },
      });

      const usersWithMultipleItemsSameDayDifferentCategories = users.filter(
        (user) => {
          // Group items by creation date
          const itemsByDate: Record<
            string,
            { category1: boolean; category2: boolean }
          > = {};

          user.items.forEach((item) => {
            const date = item.created_at.toISOString().split("T")[0];

            if (!date) {
              return false;
            }
            if (!itemsByDate[date]) {
              itemsByDate[date] = { category1: false, category2: false };
            }
            if (item.category === category1) {
              itemsByDate[date].category1 = true;
            } else if (item.category === category2) {
              itemsByDate[date].category2 = true;
            }
          });

          // Check if there is any date where both categories are true
          return Object.values(itemsByDate).some(
            (itemCategories) =>
              itemCategories.category1 && itemCategories.category2
          );
        }
      );
      console.log(
        "usersWithMultipleItemsSameDay",
        usersWithMultipleItemsSameDayDifferentCategories
      );

      return usersWithMultipleItemsSameDayDifferentCategories;
    }),

  getAllUsers: protectedProcedure.query(async () => {
    return db.user.findMany();
  }),
  // List the users who posted the most number of items on 7/4/2024; if there is a tie, list all the users who have a tie.
  mostListed: protectedProcedure
    .input(z.object({ date: z.string() }))
    .query(async ({ input }) => {
      const { date } = input;

      const startOfDay = new Date(date + "T00:00:00");
      const endOfDay = new Date(date + "T23:59:59");

      const users = await db.user.findMany({
        where: {
          items: {
            some: {
              created_at: {
                gte: startOfDay,
                lt: endOfDay,
              },
            },
          },
        },
        select: {
          username: true,
          items: {
            where: {
              created_at: {
                gte: startOfDay,
                lt: endOfDay,
              },
            },
            select: {
              id: true,
            },
          },
        },
      });

      const userItems = users.map((user) => ({
        username: user.username,
        count: user.items.length,
      }));

      const maxItems = Math.max(...userItems.map((user) => user.count));

      return userItems.filter((user) => user.count === maxItems);
    }),
  // get  all the users who posted some reviews, but each of them is "POOR".
  poorReviewers: protectedProcedure.query(async () => {
    const users = await db.user.findMany({
      select: {
        username: true,
        reviews: {
          select: {
            review: true,
          },
        },
      },
      where: {
        AND: [
          {
            reviews: {
              some: {},
            },
          },
          {
            reviews: {
              every: {
                review: "POOR",
              },
            },
          },
        ],
      },
    });

    console.log("poorReviewers", users);

    return users;
  }),
  noPoorReviews: protectedProcedure.query(async () => {
    const users = await db.user.findMany({
      select: {
        username: true,
        items: {
          select: {
            title: true,
            reviews: {
              select: {
                review: true,
              },
            },
          },
        },
      },
      where: {
        items: {
          some: {},
          every: {
            reviews: {
              none: {
                review: "POOR",
              },
            },
          },
        },
      },
    });

    console.log("noPoorReviews", users);

    return users;
  }),
});
