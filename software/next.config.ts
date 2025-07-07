import type { NextConfig } from "next";
import { connectToDatabase } from './src/app/utils/mongodb';

/*async function setupDatabase() {
  await connectToDatabase(); 
  console.log("Conexão com o MongoDB estabelecida no startup!");
}

setupDatabase();*/
 
const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true
}
 

export default nextConfig;
