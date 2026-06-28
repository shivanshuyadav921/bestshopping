import { PrismaClient, UserRole } from "@prisma/client";
import * as bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding started...");

  // 1. Seed Users
  const passwordHash = await bcrypt.hash("password123", 10);

  const users = [
    { email: "owner@prema.com", name: "Prema Owner", role: UserRole.ADMIN },
    { email: "admin@prema.com", name: "Prema Admin", role: UserRole.ADMIN },
    { email: "production@prema.com", name: "Prod Engineer", role: UserRole.ADMIN },
    { email: "quality@prema.com", name: "Quality Inspector", role: UserRole.ADMIN },
    { email: "sales@prema.com", name: "Sales Desk", role: UserRole.ADMIN },
    { email: "customer@client.com", name: "Acme Corp Customer", role: UserRole.CUSTOMER },
  ];

  const dbUsers = [];
  for (const u of users) {
    const dbUser = await prisma.user.upsert({
      where: { email: u.email },
      update: { name: u.name, role: u.role, passwordHash },
      create: { email: u.email, name: u.name, role: u.role, passwordHash },
    });
    dbUsers.push(dbUser);
  }

  // Bind Customer Profile for client.com
  const customerUser = dbUsers.find((u) => u.email === "customer@client.com");
  if (customerUser) {
    await prisma.customer.upsert({
      where: { userId: customerUser.id },
      update: {
        name: "Acme Corp Customer",
        email: "customer@client.com",
        companyName: "Acme Corp",
        contactPhone: "+1234567890",
        industry: "Aerospace",
        country: "India",
        state: "Karnataka",
        city: "Bengaluru",
        address: "123 Manufacturing Way, Tech City"
      },
      create: {
        userId: customerUser.id,
        name: "Acme Corp Customer",
        email: "customer@client.com",
        companyName: "Acme Corp",
        contactPhone: "+1234567890",
        industry: "Aerospace",
        country: "India",
        state: "Karnataka",
        city: "Bengaluru",
        address: "123 Manufacturing Way, Tech City"
      },
    });
  }

  // 3. Seed Materials
  const materials = [
    { code: "EN8", name: "Medium Carbon Steel", grade: "080M40", properties: { carbon: "0.40%", yieldStrength: "280 MPa", hardness: "201 HB" } },
    { code: "EN19", name: "Alloy Steel", grade: "709M40", properties: { chromium: "1.00%", yieldStrength: "650 MPa", hardness: "250 HB" } },
    { code: "EN24", name: "Nickel Chromium Molybdenum Steel", grade: "817M40", properties: { nickel: "1.50%", tensileStrength: "850 MPa", hardness: "280 HB" } },
    { code: "SS304", name: "Stainless Steel 304", grade: "A2", properties: { chromium: "18.00%", nickel: "8.00%", yieldStrength: "215 MPa" } },
    { code: "SS316", name: "Stainless Steel 316", grade: "A4", properties: { molybdenum: "2.00%", nickel: "10.00%", yieldStrength: "290 MPa" } },
  ];

  for (const m of materials) {
    await prisma.material.upsert({
      where: { code: m.code },
      update: { name: m.name, grade: m.grade, properties: m.properties },
      create: { code: m.code, name: m.name, grade: m.grade, properties: m.properties },
    });
  }

  // 4. Seed Fits
  const fits = [
    { code: "H7/g6", type: "Clearance", holeLimit: "+21 / 0 µm", shaftLimit: "-7 / -20 µm" },
    { code: "H7/k6", type: "Transition", holeLimit: "+21 / 0 µm", shaftLimit: "+15 / +2 µm" },
    { code: "H7/p6", type: "Interference", holeLimit: "+21 / 0 µm", shaftLimit: "+42 / +29 µm" },
  ];

  for (const f of fits) {
    await prisma.fit.upsert({
      where: { code: f.code },
      update: { type: f.type, holeLimit: f.holeLimit, shaftLimit: f.shaftLimit },
      create: { code: f.code, type: f.type, holeLimit: f.holeLimit, shaftLimit: f.shaftLimit },
    });
  }

  // 5. Seed Surface Finishes
  const finishes = [
    { code: "Ra0.4", valueRa: 0.4, description: "Very fine ground finish, high-precision hydraulic cylinders" },
    { code: "Ra0.8", valueRa: 0.8, description: "Standard ground/polished finish, bearing journals" },
    { code: "Ra1.6", valueRa: 1.6, description: "Smooth machined finish, general moving parts" },
    { code: "Ra3.2", valueRa: 3.2, description: "Medium rough machined finish, structural brackets" },
  ];

  for (const f of finishes) {
    await prisma.surfaceFinish.upsert({
      where: { code: f.code },
      update: { valueRa: f.valueRa, description: f.description },
      create: { code: f.code, valueRa: f.valueRa, description: f.description },
    });
  }

  // 6. Seed Heat Treatments
  const heatTreatments = [
    { processName: "Nitriding", description: "Surface hardening introducing nitrogen", parameters: { temperature: "500-550C", surfaceHardness: "900 HV" } },
    { processName: "Hardening", description: "Quenching and tempering alloy steels", parameters: { temperature: "830-860C", media: "Oil", targetHardness: "55 HRC" } },
    { processName: "Carburizing", description: "Case hardening steel via carbon diffusion", parameters: { temperature: "900-950C", caseDepth: "0.8 - 1.2 mm" } },
  ];

  for (const ht of heatTreatments) {
    await prisma.heatTreatment.upsert({
      where: { processName: ht.processName },
      update: { description: ht.description, parameters: ht.parameters },
      create: { processName: ht.processName, description: ht.description, parameters: ht.parameters },
    });
  }

  // 7. Seed Thread Standards
  const threads = [
    { designation: "M6", pitch: 1.0, majorDiameter: 6.0, type: "Metric" },
    { designation: "M8", pitch: 1.25, majorDiameter: 8.0, type: "Metric" },
    { designation: "M10", pitch: 1.5, majorDiameter: 10.0, type: "Metric" },
    { designation: "M12", pitch: 1.75, majorDiameter: 12.0, type: "Metric" },
  ];

  for (const t of threads) {
    await prisma.threadStandard.upsert({
      where: { designation: t.designation },
      update: { pitch: t.pitch, majorDiameter: t.majorDiameter, type: t.type },
      create: { designation: t.designation, pitch: t.pitch, majorDiameter: t.majorDiameter, type: t.type },
    });
  }

  // 8. Seed Bearings
  const bearings = [
    { modelNumber: "6205", type: "Deep Groove Ball Bearing", innerDiameter: 25.0, outerDiameter: 52.0, width: 15.0, dynamicLoad: 14.0, staticLoad: 7.8 },
    { modelNumber: "6206", type: "Deep Groove Ball Bearing", innerDiameter: 30.0, outerDiameter: 62.0, width: 16.0, dynamicLoad: 19.5, staticLoad: 11.3 },
    { modelNumber: "6308", type: "Deep Groove Ball Bearing", innerDiameter: 40.0, outerDiameter: 90.0, width: 23.0, dynamicLoad: 42.3, staticLoad: 24.0 },
  ];

  for (const b of bearings) {
    await prisma.bearing.upsert({
      where: { modelNumber: b.modelNumber },
      update: { type: b.type, innerDiameter: b.innerDiameter, outerDiameter: b.outerDiameter, width: b.width, dynamicLoad: b.dynamicLoad, staticLoad: b.staticLoad },
      create: { modelNumber: b.modelNumber, type: b.type, innerDiameter: b.innerDiameter, outerDiameter: b.outerDiameter, width: b.width, dynamicLoad: b.dynamicLoad, staticLoad: b.staticLoad },
    });
  }

  // 9. Seed Machines
  const machines = [
    { code: "CNC-LATHE-01", name: "Mazak Quick Turn 250", capacity: { maxDiameter: "350mm", maxLength: "500mm", power: "15kW" }, status: "ACTIVE" },
    { code: "CNC-MILL-02", name: "Haas VF-3 3-Axis", capacity: { travelX: "1016mm", travelY: "508mm", travelZ: "635mm" }, status: "ACTIVE" },
    { code: "EDM-WIRE-01", name: "Fanuc Robocut C400iB", capacity: { precision: "2µm", maxWeight: "500kg" }, status: "MAINTENANCE" },
  ];

  for (const mac of machines) {
    await prisma.machine.upsert({
      where: { code: mac.code },
      update: { name: mac.name, capacity: mac.capacity, status: mac.status },
      create: { code: mac.code, name: mac.name, capacity: mac.capacity, status: mac.status },
    });
  }

  // 10. Seed Tolerances
  const tolerances = [
    { standard: "ISO 2768", classification: "medium", rangeMin: 0.5, rangeMax: 3.0, value: 0.1 },
    { standard: "ISO 2768", classification: "medium", rangeMin: 3.0, rangeMax: 6.0, value: 0.1 },
    { standard: "ISO 2768", classification: "medium", rangeMin: 6.0, rangeMax: 30.0, value: 0.2 },
    { standard: "ISO 2768", classification: "medium", rangeMin: 30.0, rangeMax: 120.0, value: 0.3 },
  ];

  for (const t of tolerances) {
    // Tolerances don't have a unique key, check or delete existing or just create if empty
    const count = await prisma.tolerance.count();
    if (count === 0) {
      await prisma.tolerance.create({ data: t });
    }
  }

  console.log("Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("Error in seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
