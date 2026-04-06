/**
 * fleet-loader.js — Ancla & Go
 * Shared module for loading and querying fleet.json.
 * Caches the result in sessionStorage to avoid repeated fetches.
 */

const CACHE_KEY = "anclag_fleet";

/**
 * Fetches fleet.json and returns the array of yachts.
 * Uses sessionStorage as a cache for the current session.
 * @returns {Promise<Array>}
 */
async function loadFleet() {
  const cached = sessionStorage.getItem(CACHE_KEY);
  if (cached) {
    try {
      return JSON.parse(cached);
    } catch {
      sessionStorage.removeItem(CACHE_KEY);
    }
  }

  const response = await fetch("fleet.json");
  if (!response.ok)
    throw new Error(`Failed to load fleet.json: ${response.status}`);
  const fleet = await response.json();
  sessionStorage.setItem(CACHE_KEY, JSON.stringify(fleet));
  return fleet;
}

/**
 * Returns a single yacht by its id slug.
 * @param {string} id
 * @param {Array}  fleet
 * @returns {Object|undefined}
 */
function getYachtById(id, fleet) {
  return fleet.find((y) => y.id === id);
}

/**
 * Returns all yachts matching a given type.
 * @param {string} type  - 'luxury' | 'sunset' | 'group'
 * @param {Array}  fleet
 * @returns {Array}
 */
function getYachtsByType(type, fleet) {
  return fleet.filter((y) => y.type === type);
}
