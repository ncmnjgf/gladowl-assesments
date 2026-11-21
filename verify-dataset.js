// Verification script for College Dataset Integrity (GATE-02)
const fs = require('fs');
const path = require('path');

const collegesPath = path.join(__dirname, 'data', 'colleges.json');
const rawData = fs.readFileSync(collegesPath, 'utf8');
const colleges = JSON.parse(rawData);

console.log(`Verifying ${colleges.length} colleges in dataset...`);

if (colleges.length < 12) {
  console.error(`FAILED: Expected at least 12 colleges, found ${colleges.length}`);
  process.exit(1);
}

const requiredFields = [
  'id',
  'name',
  'slug',
  'city',
  'state',
  'category',
  'image',
  'description',
  'courses',
  'fees',
  'rating',
];

const slugs = new Set();

for (const col of colleges) {
  for (const field of requiredFields) {
    if (col[field] === undefined || col[field] === null || col[field] === '') {
      console.error(`FAILED: College "${col.name || 'Unknown'}" missing required field "${field}"`);
      process.exit(1);
    }
  }

  if (slugs.has(col.slug)) {
    console.error(`FAILED: Duplicate slug "${col.slug}" found`);
    process.exit(1);
  }
  slugs.add(col.slug);

  if (!Array.isArray(col.courses) || col.courses.length === 0) {
    console.error(`FAILED: College "${col.name}" has no courses listed`);
    process.exit(1);
  }

  if (typeof col.rating !== 'number' || col.rating < 0 || col.rating > 5) {
    console.error(`FAILED: College "${col.name}" has invalid rating: ${col.rating}`);
    process.exit(1);
  }
}

console.log(`SUCCESS: All ${colleges.length} colleges verified with valid fields, unique slugs, and ratings.`);
process.exit(0);
