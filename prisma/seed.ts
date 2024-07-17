import { prisma } from "../src/utils/context";
import { hashPassword } from "../src/utils/hashpasswords";

const seedUser = async () => {
  try {
    const response = await prisma.user.create({
      data: {
        email: "admin@admin.com",
        first_name: "Admin",
        last_name: "Admin",
        password: await hashPassword("12345678"),
        created_by: "admin@admin.com",
        role: "admin",
      },
    });
    console.log(123);
    console.log(response);
  } catch (error) {
    console.log(error);
    return error;
  }
};

seedUser()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async () => {
    await prisma.$disconnect();
    process.exit(1);
  });
