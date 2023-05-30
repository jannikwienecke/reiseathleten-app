import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function seed() {
  const email = "admin@admin.de";

  const hashedPassword = await bcrypt.hash("admin", 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });

  await prisma.note.create({
    data: {
      title: "My first note",
      body: "Hello, world!",
      userId: user.id,
    },
  });

  await prisma.note.create({
    data: {
      title: "My second note",
      body: "Hello, world!",
      userId: user.id,
    },
  });

  const fitnessTag = await prisma.tag.create({
    data: {
      name: "Fitness",
      color: "red",
    },
  });

  const funTag = await prisma.tag.create({
    data: {
      name: "Fun",
      color: "green",
    },
  });

  const personalTrainingActivity = await prisma.activity.create({
    data: {
      name: "Personal Training Session",
      description: "Personal Training Session with a professional trainer",
    },
  });

  const fixedActivity = await prisma.activity.create({
    data: {
      name: "Hiking Trip to the Teide",
      fixedDate: true,
      description: "Hiking Trip to the Teide: 3 hours up, 2 hours down",
      // unsplash image of the Teide
      image:
        "https://images.unsplash.com/photo-1611095772763-4b0b2b0d9b0f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dGVuZXJpZmV8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80",
    },
  });

  await prisma.activityBooking.create({
    data: {
      activityId: fixedActivity.id,
      date: new Date(),
    },
  });

  await prisma.activityTag.create({
    data: {
      activityId: personalTrainingActivity.id,
      tagId: fitnessTag.id,
    },
  });

  await prisma.activityTag.create({
    data: {
      activityId: fixedActivity.id,
      tagId: funTag.id,
    },
  });

  const location = await prisma.location.create({
    data: {
      name: "Tenerife",
      description: "Beautiful island in the Atlantic Ocean",
      image:
        "https://images.unsplash.com/photo-1611095772763-4b0b2b0d9b0f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dGVuZXJpZmV8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80",
    },
  });

  const vacation = await prisma.vacation.create({
    data: {
      name: "All inclusive Tenerife",
      startDate: new Date(),
      endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      userId: user.id,
      locationId: location.id,
      description: "Enjoy the sun and the beach in Tenerife",
    },
  });

  await prisma.vacationActivity.create({
    data: {
      vacationId: vacation.id,
      activityId: personalTrainingActivity.id,
    },
  });

  await prisma.vacationActivity.create({
    data: {
      vacationId: vacation.id,
      activityId: fixedActivity.id,
    },
  });

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
