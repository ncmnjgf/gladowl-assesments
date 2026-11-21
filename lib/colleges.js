import collegesData from '@/data/colleges.json';

/**
 * Returns all colleges in the dataset.
 */
export function getAllColleges() {
  return collegesData;
}

/**
 * Returns only colleges marked as featured for the homepage showcase.
 */
export function getFeaturedColleges() {
  return collegesData.filter((col) => col.featured === true);
}

/**
 * Finds a single college by its unique URL slug.
 */
export function getCollegeBySlug(slug) {
  if (!slug) return null;
  return collegesData.find((col) => col.slug.toLowerCase() === slug.toLowerCase()) || null;
}

/**
 * Returns a list of all unique cities present in the dataset.
 */
export function getAllCities() {
  const cities = collegesData.map((col) => col.city);
  return Array.from(new Set(cities)).sort();
}

/**
 * Returns a list of all unique categories (Engineering, Management, etc.).
 */
export function getAllCategories() {
  const categories = collegesData.map((col) => col.category);
  return Array.from(new Set(categories)).sort();
}

/**
 * Filters and sorts colleges based on user search parameters.
 * @param {Object} options
 * @param {string} [options.search]
 * @param {string} [options.city]
 * @param {string} [options.category]
 * @param {string} [options.sortBy] - 'name_asc', 'name_desc', 'rating_desc'
 */
export function filterAndSortColleges({ search = '', city = '', category = '', sortBy = 'rating_desc' } = {}) {
  let filtered = [...collegesData];

  // 1. Filter by Search Query (matches name, description, or city)
  if (search.trim()) {
    const query = search.trim().toLowerCase();
    filtered = filtered.filter((col) =>
      col.name.toLowerCase().includes(query) ||
      col.description.toLowerCase().includes(query) ||
      col.city.toLowerCase().includes(query) ||
      col.courses.some((course) => course.toLowerCase().includes(query))
    );
  }

  // 2. Filter by City
  if (city && city !== 'all') {
    filtered = filtered.filter((col) => col.city.toLowerCase() === city.toLowerCase());
  }

  // 3. Filter by Category
  if (category && category !== 'all') {
    filtered = filtered.filter((col) => col.category.toLowerCase() === category.toLowerCase());
  }

  // 4. Sort results
  if (sortBy === 'name_asc') {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === 'name_desc') {
    filtered.sort((a, b) => b.name.localeCompare(a.name));
  } else if (sortBy === 'rating_desc') {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  return filtered;
}
