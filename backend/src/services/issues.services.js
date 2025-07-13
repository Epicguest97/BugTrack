const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getAll = () => {
  return prisma.issue.findMany({ include: { project: true } });
};

exports.create = (projectId, data) => {
  return prisma.issue.create({
    data: {
      ...data,
      projectId,
    },
    include: { project: true },
  });
};

exports.getById = (id) => {
  return prisma.issue.findUnique({
    where: { id },
    include: { project: true },
  });
};

exports.update = (id, data) => {
  return prisma.issue.update({
    where: { id },
    data,
    include: { project: true },
  });
};

exports.delete = (id) => {
  return prisma.issue.delete({
    where: { id },
  });
};
