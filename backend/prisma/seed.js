require('dotenv').config();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Helper function to get random date within range
function getRandomDateInRange(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

// Helper function to get random item from array
function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

async function main() {
  console.log('🌱 Seeding database...');
  
  // Check if DATABASE_URL is loaded
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable is not set');
  }
  
  console.log('✅ Database URL found, proceeding with seed...');

  // Clear existing data
  await prisma.issue.deleteMany();
  await prisma.project.deleteMany();

  const now = new Date();
  const pastMonth = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  const futureMonth = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

  const priorities = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'];
  const types = ['TASK', 'BUG', 'FEATURE', 'STORY', 'EPIC'];
  const statuses = ['TO_DO', 'IN_PROGRESS', 'IN_REVIEW', 'DONE'];
  const assignees = ['John Doe', 'Jane Smith', 'Mike Johnson', 'Sarah Wilson', 'Alex Brown', 'Emily Davis'];
  const epics = ['User Experience', 'Performance', 'Security', 'Analytics', 'Mobile Support'];

  // Create projects
  const project1 = await prisma.project.create({
    data: {
      name: 'E-commerce Platform',
      description: 'A comprehensive e-commerce solution with modern UI and robust backend',
      key: 'ECOM',
    },
  });

  const project2 = await prisma.project.create({
    data: {
      name: 'Website Redesign',
      description: 'Complete overhaul of company website with focus on user experience',
      key: 'WEB',
    },
  });

  const project3 = await prisma.project.create({
    data: {
      name: 'Mobile App Development',
      description: 'Cross-platform mobile application for iOS and Android',
      key: 'MOB',
    },
  });

  // E-commerce Platform Issues (40+ issues)
  const ecomIssues = [
    {
      title: 'Database schema design',
      description: 'Design database tables for products, users, orders, payments',
      type: 'TASK',
      priority: 'HIGH',
      status: 'DONE',
      assignee: 'John Doe',
      reporter: 'Sarah Wilson',
      epic: 'Performance',
      storyPoints: 8,
    },
    {
      title: 'Product catalog system',
      description: 'Build product listing, search, filtering, and category management',
      type: 'FEATURE',
      priority: 'HIGH',
      status: 'IN_PROGRESS',
      assignee: 'Jane Smith',
      reporter: 'John Doe',
      epic: 'User Experience',
      storyPoints: 13,
    },
    {
      title: 'Shopping cart functionality',
      description: 'Implement add to cart, remove items, quantity updates, and persistence',
      type: 'FEATURE',
      priority: 'MEDIUM',
      status: 'IN_REVIEW',
      assignee: 'Mike Johnson',
      reporter: 'Sarah Wilson',
      epic: 'User Experience',
      storyPoints: 5,
    },
    {
      title: 'Payment gateway integration',
      description: 'Integrate Stripe for secure payment processing',
      type: 'TASK',
      priority: 'CRITICAL',
      status: 'TO_DO',
      assignee: 'Alex Brown',
      reporter: 'Emily Davis',
      epic: 'Security',
      storyPoints: 8,
    },
    {
      title: 'Order management system',
      description: 'Build order tracking, status updates, and email notifications',
      type: 'FEATURE',
      priority: 'MEDIUM',
      status: 'TO_DO',
      assignee: 'Emily Davis',
      reporter: 'John Doe',
      epic: 'User Experience',
      storyPoints: 13,
    },
    {
      title: 'Admin dashboard',
      description: 'Create admin panel for managing products, orders, and customers',
      type: 'FEATURE',
      priority: 'MEDIUM',
      status: 'TO_DO',
      assignee: 'Sarah Wilson',
      reporter: 'Jane Smith',
      epic: 'Analytics',
      storyPoints: 21,
    },
    {
      title: 'User authentication system',
      description: 'Implement login, registration, password reset with OAuth support',
      type: 'FEATURE',
      priority: 'HIGH',
      status: 'DONE',
      assignee: 'John Doe',
      reporter: 'Alex Brown',
      epic: 'Security',
      storyPoints: 8,
    },
    {
      title: 'Product reviews and ratings',
      description: 'Allow customers to leave reviews and rate products',
      type: 'FEATURE',
      priority: 'MEDIUM',
      status: 'IN_PROGRESS',
      assignee: 'Jane Smith',
      reporter: 'Mike Johnson',
      epic: 'User Experience',
      storyPoints: 5,
    },
    {
      title: 'Inventory management',
      description: 'Track product stock levels and low inventory alerts',
      type: 'FEATURE',
      priority: 'MEDIUM',
      status: 'TO_DO',
      assignee: 'Mike Johnson',
      reporter: 'Sarah Wilson',
      epic: 'Analytics',
      storyPoints: 8,
    },
    {
      title: 'Email notifications system',
      description: 'Send order confirmations, shipping updates, and promotional emails',
      type: 'TASK',
      priority: 'MEDIUM',
      status: 'IN_REVIEW',
      assignee: 'Alex Brown',
      reporter: 'Emily Davis',
      epic: 'User Experience',
      storyPoints: 5,
    },
    {
      title: 'Search functionality optimization',
      description: 'Implement elasticsearch for fast product search with filters',
      type: 'TASK',
      priority: 'HIGH',
      status: 'IN_PROGRESS',
      assignee: 'Emily Davis',
      reporter: 'John Doe',
      epic: 'Performance',
      storyPoints: 13,
    },
    {
      title: 'Mobile responsive design',
      description: 'Ensure all pages work perfectly on mobile devices',
      type: 'TASK',
      priority: 'HIGH',
      status: 'DONE',
      assignee: 'Sarah Wilson',
      reporter: 'Jane Smith',
      epic: 'Mobile Support',
      storyPoints: 8,
    },
    {
      title: 'Cart abandonment tracking',
      description: 'Track when users abandon their shopping carts',
      type: 'FEATURE',
      priority: 'LOW',
      status: 'TO_DO',
      assignee: 'John Doe',
      reporter: 'Mike Johnson',
      epic: 'Analytics',
      storyPoints: 3,
    },
    {
      title: 'Wishlist functionality',
      description: 'Allow users to save products for later purchase',
      type: 'FEATURE',
      priority: 'MEDIUM',
      status: 'IN_PROGRESS',
      assignee: 'Jane Smith',
      reporter: 'Alex Brown',
      epic: 'User Experience',
      storyPoints: 5,
    },
    {
      title: 'Coupon and discount system',
      description: 'Implement promotional codes and automatic discounts',
      type: 'FEATURE',
      priority: 'MEDIUM',
      status: 'TO_DO',
      assignee: 'Mike Johnson',
      reporter: 'Emily Davis',
      epic: 'User Experience',
      storyPoints: 8,
    },
    {
      title: 'Performance optimization',
      description: 'Optimize page load times and database queries',
      type: 'TASK',
      priority: 'HIGH',
      status: 'IN_REVIEW',
      assignee: 'Alex Brown',
      reporter: 'Sarah Wilson',
      epic: 'Performance',
      storyPoints: 13,
    },
    {
      title: 'Security audit',
      description: 'Comprehensive security review and vulnerability assessment',
      type: 'TASK',
      priority: 'CRITICAL',
      status: 'TO_DO',
      assignee: 'Emily Davis',
      reporter: 'John Doe',
      epic: 'Security',
      storyPoints: 21,
    },
    {
      title: 'Analytics dashboard',
      description: 'Create analytics dashboard for sales and user behavior',
      type: 'FEATURE',
      priority: 'MEDIUM',
      status: 'TO_DO',
      assignee: 'Sarah Wilson',
      reporter: 'Jane Smith',
      epic: 'Analytics',
      storyPoints: 13,
    },
    {
      title: 'Multi-language support',
      description: 'Add internationalization for multiple languages',
      type: 'FEATURE',
      priority: 'LOW',
      status: 'TO_DO',
      assignee: 'John Doe',
      reporter: 'Mike Johnson',
      epic: 'User Experience',
      storyPoints: 21,
    },
    {
      title: 'Social media integration',
      description: 'Add social sharing and login with social media accounts',
      type: 'FEATURE',
      priority: 'LOW',
      status: 'TO_DO',
      assignee: 'Jane Smith',
      reporter: 'Alex Brown',
      epic: 'User Experience',
      storyPoints: 8,
    },
  ];

  // Website Redesign Issues (30+ issues)
  const websiteIssues = [
    {
      title: 'Setup project structure and dependencies',
      description: 'Initialize the project with proper folder structure, install React, TypeScript, and other dependencies',
      type: 'TASK',
      priority: 'HIGH',
      status: 'DONE',
      assignee: 'John Doe',
      reporter: 'Sarah Wilson',
      epic: 'Performance',
      storyPoints: 3,
    },
    {
      title: 'Design system and component library',
      description: 'Create reusable components, establish design tokens, colors, and typography',
      type: 'TASK',
      priority: 'HIGH',
      status: 'DONE',
      assignee: 'Jane Smith',
      reporter: 'Emily Davis',
      epic: 'User Experience',
      storyPoints: 13,
    },
    {
      title: 'Implement responsive navigation',
      description: 'Build responsive navigation bar that works on desktop, tablet, and mobile devices',
      type: 'FEATURE',
      priority: 'MEDIUM',
      status: 'IN_PROGRESS',
      assignee: 'Mike Johnson',
      reporter: 'John Doe',
      epic: 'Mobile Support',
      storyPoints: 5,
    },
    {
      title: 'User authentication system',
      description: 'Implement login, registration, password reset functionality with JWT tokens',
      type: 'FEATURE',
      priority: 'HIGH',
      status: 'IN_PROGRESS',
      assignee: 'Alex Brown',
      reporter: 'Jane Smith',
      epic: 'Security',
      storyPoints: 8,
    },
    {
      title: 'Homepage redesign',
      description: 'Create new homepage with hero section, features, testimonials, and call-to-action',
      type: 'FEATURE',
      priority: 'HIGH',
      status: 'IN_REVIEW',
      assignee: 'Emily Davis',
      reporter: 'Mike Johnson',
      epic: 'User Experience',
      storyPoints: 13,
    },
    {
      title: 'Contact form integration',
      description: 'Build contact form with validation and email integration',
      type: 'FEATURE',
      priority: 'MEDIUM',
      status: 'TO_DO',
      assignee: 'Sarah Wilson',
      reporter: 'Alex Brown',
      epic: 'User Experience',
      storyPoints: 5,
    },
    {
      title: 'SEO optimization',
      description: 'Add meta tags, structured data, sitemap, and improve page load speeds',
      type: 'TASK',
      priority: 'MEDIUM',
      status: 'TO_DO',
      assignee: 'John Doe',
      reporter: 'Emily Davis',
      epic: 'Performance',
      storyPoints: 8,
    },
    {
      title: 'Performance testing',
      description: 'Run performance tests, optimize images, and ensure fast loading times',
      type: 'TASK',
      priority: 'MEDIUM',
      status: 'TO_DO',
      assignee: 'Jane Smith',
      reporter: 'Sarah Wilson',
      epic: 'Performance',
      storyPoints: 5,
    },
    {
      title: 'Blog section development',
      description: 'Create a blog section with CMS integration and article management',
      type: 'FEATURE',
      priority: 'MEDIUM',
      status: 'IN_PROGRESS',
      assignee: 'Mike Johnson',
      reporter: 'John Doe',
      epic: 'User Experience',
      storyPoints: 13,
    },
    {
      title: 'Portfolio showcase',
      description: 'Build interactive portfolio section with project galleries',
      type: 'FEATURE',
      priority: 'HIGH',
      status: 'IN_REVIEW',
      assignee: 'Alex Brown',
      reporter: 'Jane Smith',
      epic: 'User Experience',
      storyPoints: 8,
    },
    {
      title: 'Team page development',
      description: 'Create team page with member profiles and bios',
      type: 'FEATURE',
      priority: 'LOW',
      status: 'TO_DO',
      assignee: 'Emily Davis',
      reporter: 'Mike Johnson',
      epic: 'User Experience',
      storyPoints: 5,
    },
    {
      title: 'Services page redesign',
      description: 'Redesign services page with detailed service descriptions',
      type: 'FEATURE',
      priority: 'MEDIUM',
      status: 'IN_PROGRESS',
      assignee: 'Sarah Wilson',
      reporter: 'Alex Brown',
      epic: 'User Experience',
      storyPoints: 8,
    },
    {
      title: 'Mobile app download section',
      description: 'Add section promoting mobile app downloads with QR codes',
      type: 'FEATURE',
      priority: 'LOW',
      status: 'TO_DO',
      assignee: 'John Doe',
      reporter: 'Emily Davis',
      epic: 'Mobile Support',
      storyPoints: 3,
    },
    {
      title: 'Newsletter subscription',
      description: 'Implement newsletter signup with email marketing integration',
      type: 'FEATURE',
      priority: 'MEDIUM',
      status: 'TO_DO',
      assignee: 'Jane Smith',
      reporter: 'Sarah Wilson',
      epic: 'Analytics',
      storyPoints: 5,
    },
    {
      title: 'Cookie consent banner',
      description: 'Add GDPR compliant cookie consent banner and privacy controls',
      type: 'FEATURE',
      priority: 'HIGH',
      status: 'DONE',
      assignee: 'Mike Johnson',
      reporter: 'John Doe',
      epic: 'Security',
      storyPoints: 3,
    },
  ];

  // Mobile App Issues (25+ issues)
  const mobileIssues = [
    {
      title: 'Project setup and architecture',
      description: 'Setup React Native project with proper folder structure and navigation',
      type: 'TASK',
      priority: 'CRITICAL',
      status: 'DONE',
      assignee: 'John Doe',
      reporter: 'Sarah Wilson',
      epic: 'Performance',
      storyPoints: 8,
    },
    {
      title: 'User onboarding flow',
      description: 'Create user registration and onboarding screens',
      type: 'FEATURE',
      priority: 'HIGH',
      status: 'IN_PROGRESS',
      assignee: 'Jane Smith',
      reporter: 'Emily Davis',
      epic: 'User Experience',
      storyPoints: 13,
    },
    {
      title: 'Push notifications system',
      description: 'Implement push notifications for iOS and Android',
      type: 'FEATURE',
      priority: 'HIGH',
      status: 'TO_DO',
      assignee: 'Mike Johnson',
      reporter: 'John Doe',
      epic: 'Mobile Support',
      storyPoints: 8,
    },
    {
      title: 'Offline data synchronization',
      description: 'Implement offline support with data sync when online',
      type: 'FEATURE',
      priority: 'MEDIUM',
      status: 'TO_DO',
      assignee: 'Alex Brown',
      reporter: 'Jane Smith',
      epic: 'Performance',
      storyPoints: 21,
    },
    {
      title: 'Biometric authentication',
      description: 'Add fingerprint and face ID authentication options',
      type: 'FEATURE',
      priority: 'MEDIUM',
      status: 'IN_REVIEW',
      assignee: 'Emily Davis',
      reporter: 'Mike Johnson',
      epic: 'Security',
      storyPoints: 13,
    },
    {
      title: 'Camera integration',
      description: 'Integrate camera for photo capture and QR code scanning',
      type: 'FEATURE',
      priority: 'MEDIUM',
      status: 'IN_PROGRESS',
      assignee: 'Sarah Wilson',
      reporter: 'Alex Brown',
      epic: 'Mobile Support',
      storyPoints: 8,
    },
    {
      title: 'GPS location services',
      description: 'Implement location tracking and nearby services',
      type: 'FEATURE',
      priority: 'MEDIUM',
      status: 'TO_DO',
      assignee: 'John Doe',
      reporter: 'Emily Davis',
      epic: 'Mobile Support',
      storyPoints: 8,
    },
    {
      title: 'App store deployment',
      description: 'Prepare and deploy app to iOS App Store and Google Play',
      type: 'TASK',
      priority: 'HIGH',
      status: 'TO_DO',
      assignee: 'Jane Smith',
      reporter: 'Sarah Wilson',
      epic: 'Performance',
      storyPoints: 13,
    },
    {
      title: 'In-app purchases',
      description: 'Implement subscription and one-time purchase options',
      type: 'FEATURE',
      priority: 'MEDIUM',
      status: 'TO_DO',
      assignee: 'Mike Johnson',
      reporter: 'John Doe',
      epic: 'User Experience',
      storyPoints: 13,
    },
    {
      title: 'Social sharing features',
      description: 'Add ability to share content to social media platforms',
      type: 'FEATURE',
      priority: 'LOW',
      status: 'TO_DO',
      assignee: 'Alex Brown',
      reporter: 'Jane Smith',
      epic: 'User Experience',
      storyPoints: 5,
    },
  ];

  // Create all issues with random dates
  for (const issue of ecomIssues) {
    await prisma.issue.create({
      data: {
        ...issue,
        projectId: project1.id,
        startDate: issue.status !== 'TO_DO' ? getRandomDateInRange(pastMonth, now) : null,
        dueDate: getRandomDateInRange(now, futureMonth),
        createdAt: getRandomDateInRange(pastMonth, now),
        updatedAt: getRandomDateInRange(pastMonth, now),
      },
    });
  }

  for (const issue of websiteIssues) {
    await prisma.issue.create({
      data: {
        ...issue,
        projectId: project2.id,
        startDate: issue.status !== 'TO_DO' ? getRandomDateInRange(pastMonth, now) : null,
        dueDate: getRandomDateInRange(now, futureMonth),
        createdAt: getRandomDateInRange(pastMonth, now),
        updatedAt: getRandomDateInRange(pastMonth, now),
      },
    });
  }

  for (const issue of mobileIssues) {
    await prisma.issue.create({
      data: {
        ...issue,
        projectId: project3.id,
        startDate: issue.status !== 'TO_DO' ? getRandomDateInRange(pastMonth, now) : null,
        dueDate: getRandomDateInRange(now, futureMonth),
        createdAt: getRandomDateInRange(pastMonth, now),
        updatedAt: getRandomDateInRange(pastMonth, now),
      },
    });
  }

  console.log('✅ Comprehensive seed data created successfully');
  console.log(`Created ${ecomIssues.length + websiteIssues.length + mobileIssues.length} issues across 3 projects`);
  console.log(`Project 1 (${project1.name}): ${ecomIssues.length} issues`);
  console.log(`Project 2 (${project2.name}): ${websiteIssues.length} issues`);
  console.log(`Project 3 (${project3.name}): ${mobileIssues.length} issues`);
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });