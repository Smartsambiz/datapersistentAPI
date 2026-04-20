require('dotenv').config();
const { v7: uuidv7 } = require('uuid');
const { PrismaPg } = require('@prisma/adapter-pg');
const {PrismaClient } = require("@prisma/client");
const profiles = require("./profiles.json");
const { Pool } = require('pg');

const connectionString = process.env.DATABASE_URL;

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool)

const prisma = new PrismaClient({ adapter });

async function seed(){
    console.log(`Seeding ${profiles.profiles.length} profiles...`);
    let inserted = 0;
    let skipped = 0;

    for(const p of profiles.profiles){
        try{
            await prisma.profile.upsert({
                where: {name: p.name},
                update: {}, //update if exist
                create: {
                    id: uuidv7(),
                    name: p.name,
                    gender: p.gender,
                    gender_probability: p.gender_probability,
                    age: p.age,
                    age_group: p.age_group,
                    country_id: p.country_id,
                    country_name: p.country_name,
                    country_probability: p.country_probability
                }
            });
            inserted++;
        }catch(e){
            console.error(`Skipped "${p.name}":`, e.message);
            skipped++
        } 
    }

    console.log(`Done. Inserted/updated: ${inserted}, Skipped: ${skipped}`);
    await prisma.$disconnect();
    await pool.end();
}

seed().catch(async(e)=>{
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
})