import prisma from "../../prisma/prisma";

/**
 * Check database connectivity (health check)
 */
export const checkDatabaseConnection = async () => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    console.log("✅ Database connection successful");
    return true;
  } catch (error: any) {
    console.error("❌ Database connection failed:", error.message);
    return false;
  }
};

/**
 * Runs migrations (should only be called during build)
 * This is executed by Vercel in the `vercel-build` script
 */
export const runMigrations = async () => {
  try {
    console.log("Running migrations...");
    // In production, migrations are handled by 'npx prisma migrate deploy' in vercel-build
    // This function is here for reference/manual migration if needed
  } catch (error: any) {
    console.error("❌ Migration error:", error.message);
  }
};

/**
 * Check if critical tables exist
 */
export const checkDatabaseSchema = async () => {
  try {
    // Check if esp32_devices table exists
    const result = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' AND table_name = 'esp32_devices'
    `;
    
    if (!Array.isArray(result) || result.length === 0) {
      console.warn("⚠️  esp32_devices table not found. Migrations may not have run.");
      return false;
    } else {
      console.log("✅ Database schema verified");
      return true;
    }
  } catch (error: any) {
    console.error("⚠️  Could not verify database schema:", error.message);
    return false;
  }
};
