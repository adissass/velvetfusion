// utils/normalizeName.js
export default function normalizeName(name) {
    return name.toLowerCase().replace(/[^a-z0-9]/g, '');
  }