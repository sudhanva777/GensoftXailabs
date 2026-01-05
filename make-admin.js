const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function makeAdmin() {
  const email = process.argv[2];
  
  if (!email) {
    console.error('❌ Please provide an email address');
    console.log('\nUsage: node make-admin.js user@example.com\n');
    process.exit(1);
  }

  try {
    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (!existingUser) {
      console.error(`❌ User with email "${email}" not found in database`);
      process.exit(1);
    }

    // Update the role to ADMIN
    const updatedUser = await prisma.user.update({
      where: { email },
      data: { role: 'ADMIN' },
    });
    
    console.log('\n✅ Successfully updated user to ADMIN!\n');
    console.log(`   Name: ${updatedUser.name || 'N/A'}`);
    console.log(`   Email: ${updatedUser.email}`);
    console.log(`   Role: ${updatedUser.role}`);
    console.log(`   ID: ${updatedUser.id}\n`);
  } catch (error) {
    console.error('❌ Error updating user:', error.message);
    if (error.code === 'P2025') {
      console.error('   User not found in database');
    }
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

makeAdmin();

