const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getAll = () => {
  return prisma.project.findMany({ include: { issues: true } });
};

exports.create = (data) => {
  return prisma.project.create({
    data,
    include: { issues: true }
  });
};

exports.getById = (id) => {
  return prisma.project.findUnique({
    where: { id },
    include: { issues: true },
  });
};

exports.update = (id, data) => {
  return prisma.project.update({
    where: { id },
    data,
    include: { issues: true },
  });
};

exports.delete = (id) => {
  return prisma.project.delete({
    where: { id },
  });
};

exports.getStatistics = async (id) => {
  const project = await prisma.project.findUnique({
    where: { id },
    include: { issues: true },
  });

  if (!project) {
    throw new Error('Project not found');
  }

  const issues = project.issues;
  const now = new Date();
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  // Calculate basic stats
  const stats = {
    completed: issues.filter(issue => 
      issue.status === 'DONE' && 
      new Date(issue.updatedAt) > weekAgo
    ).length,
    updated: issues.filter(issue => 
      new Date(issue.updatedAt) > weekAgo
    ).length,
    created: issues.filter(issue => 
      new Date(issue.createdAt) > weekAgo
    ).length,
    dueSoon: issues.filter(issue => 
      issue.dueDate && 
      issue.dueDate > now && 
      issue.dueDate < new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)
    ).length
  };

  // Status distribution
  const statusDistribution = {
    todo: issues.filter(issue => issue.status === 'TO_DO').length,
    progress: issues.filter(issue => issue.status === 'IN_PROGRESS').length,
    review: issues.filter(issue => issue.status === 'IN_REVIEW').length,
    done: issues.filter(issue => issue.status === 'DONE').length
  };

  // Priority distribution
  const priorityDistribution = {
    low: issues.filter(issue => issue.priority === 'LOW').length,
    medium: issues.filter(issue => issue.priority === 'MEDIUM').length,
    high: issues.filter(issue => issue.priority === 'HIGH').length,
    critical: issues.filter(issue => issue.priority === 'CRITICAL').length
  };

  // Type distribution
  const typeDistribution = {
    task: issues.filter(issue => issue.type === 'TASK').length,
    bug: issues.filter(issue => issue.type === 'BUG').length,
    feature: issues.filter(issue => issue.type === 'FEATURE').length,
    story: issues.filter(issue => issue.type === 'STORY').length,
    epic: issues.filter(issue => issue.type === 'EPIC').length
  };

  // Team workload (by assignee)
  const teamWorkload = issues.reduce((acc, issue) => {
    if (issue.assignee) {
      acc[issue.assignee] = (acc[issue.assignee] || 0) + 1;
    }
    return acc;
  }, {});

  // Epic progress
  const epicProgress = issues.reduce((acc, issue) => {
    if (issue.epic) {
      if (!acc[issue.epic]) {
        acc[issue.epic] = { total: 0, completed: 0 };
      }
      acc[issue.epic].total++;
      if (issue.status === 'DONE') {
        acc[issue.epic].completed++;
      }
    }
    return acc;
  }, {});

  return {
    project,
    stats,
    statusDistribution,
    priorityDistribution,
    typeDistribution,
    teamWorkload,
    epicProgress
  };
};
