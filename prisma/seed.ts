import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const hashed = await bcrypt.hash("mypassword123", 10);
  const adminHashed = await bcrypt.hash("admin123", 10);


  const teacher = await prisma.user.upsert({
    where: { email: "Sibiya@gmail.com" },
    update: {},
    create: {
      name: "Mr Sibiya",
      email: "Sibiya@gmail.com",
      password: hashed,
      role: Role.TEACHER,
      teacher: {
        create: {
          subject: "Mathematics",
          verified: true,
          subscription: "active",
        },
      },
    },
    include: { teacher: true },
  });
   // ✅ Create Admin
  const admin = await prisma.user.upsert({
    where: { email: "admin@system.com" },
    update: {},
    create: {
      name: "System Admin",
      email: "admin@system.com",
      password: adminHashed,
      role: Role.ADMIN,
    }
  });

  console.log("✅ Seeded teacher:", teacher);
}

main()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

  