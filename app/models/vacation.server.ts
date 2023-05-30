import type { User } from "@prisma/client";

import { prisma } from "~/db.server";

export function getVacation({ userId }: { userId: User["id"] }) {
  return prisma.vacation.findFirst({
    where: { userId },
    include: {
      // activities: {
      //   include: {
      //     // tags: true,
      //     ActivityTag: {
      //       include: {
      //         tag: true,
      //       },
      //     },
      //     ActivityBooking: true,
      //   },
      // },
      VacationActivity: {
        include: {
          activity: {
            include: {
              ActivityTag: {
                include: {
                  tag: true,
                },
              },
              ActivityBooking: true,
            },
          },
        },
      },
      location: true,
    },
  });
}
