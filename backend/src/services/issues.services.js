
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getAll = () => {
  return prisma.issue.findMany({ 
    include: { project: true },
    orderBy: { createdAt: 'desc' }
  });
};

exports.create = (projectId, data) => {
  console.log('Service: Creating issue for project', projectId, 'with data:', data);
  return prisma.issue.create({
    data: {
      ...data,
      projectId,
      status: data.status || 'TO_DO',
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
  console.log('Service: Updating issue', id, 'with data:', data);
  return prisma.issue.update({
    where: { id },
    data: {
      ...data,
      updatedAt: new Date(),
    },
    include: { project: true },
  });
};

exports.delete = (id) => {
  return prisma.issue.delete({
    where: { id },
  });
};
