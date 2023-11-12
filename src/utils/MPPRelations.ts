import { prisma } from '@/db';

async function MPPRelations(orgGroupName: string, userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { MPP: true },
  });

  if (user) {
    const disconnectPromises = user.MPP.map((mpp) =>
      prisma.mPP.update({
        where: { id: mpp.id },
        data: {
          user: { disconnect: true },
        },
      }),
    );

    await Promise.all(disconnectPromises);
  }

  // Fetch all MPP records that have the same Org_Group_Name
  const mpps = await prisma.mPP.findMany({
    where: { Org_Group_Name: orgGroupName },
  });

  // Create an array of update promises
  const updatePromises = mpps.map((mpp) =>
    prisma.mPP.update({
      where: { id: mpp.id },
      data: {
        user: { connect: { id: userId } },
      },
    }),
  );

  // Wait for all update promises to resolve
  await Promise.all(updatePromises);
}

export default MPPRelations;
