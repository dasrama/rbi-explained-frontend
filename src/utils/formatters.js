/**
 * Indian & Financial formatting utilities
 */

/**
 * Format a number using Indian comma groupings (e.g., 1,50,000 or 15,042.80)
 * @param {number|null|undefined} num
 * @param {number} decimals
 * @returns {string}
 */
export function formatIndianNumber(num, decimals = 2) {
  if (num === null || num === undefined || isNaN(num)) return "—";
  
  const fixed = Number(num).toFixed(decimals);
  const [integerPart, decimalPart] = fixed.split(".");
  
  // Format integer part in Indian numbering: last 3 digits, then pairs of 2
  let lastThree = integerPart.substring(integerPart.length - 3);
  let otherNumbers = integerPart.substring(0, integerPart.length - 3);
  if (otherNumbers !== "") {
    lastThree = "," + lastThree;
  }
  const res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
  
  return decimals > 0 ? `${res}.${decimalPart}` : res;
}

/**
 * Format currency with proper symbols (₹ or $)
 * @param {number} value
 * @param {string} currencyCode ('INR' | 'USD')
 * @param {number} decimals
 */
export function formatCurrency(value, currencyCode = "INR", decimals = 2) {
  if (value === null || value === undefined || isNaN(value)) return "—";
  const symbol = currencyCode === "USD" ? "$" : "₹";
  return `${symbol}${formatIndianNumber(value, decimals)}`;
}

/**
 * Format percentage with true unicode minus sign (−) and plus sign (+)
 * @param {number|null|undefined} val
 * @param {number} decimals
 * @param {boolean} includeSign
 */
export function formatPercent(val, decimals = 2, includeSign = true) {
  if (val === null || val === undefined || isNaN(val)) return "—";
  const num = Number(val);
  const formatted = Math.abs(num).toFixed(decimals);
  if (!includeSign) return `${num.toFixed(decimals)}%`;
  
  if (num > 0) return `+${formatted}%`;
  if (num < 0) return `−${formatted}%`;
  return `0.00%`;
}

/**
 * Format large Indian volumes into Lakhs or Crores or Billions
 * @param {number} value
 * @param {"MILLIONS"|"CRORES"|"BILLIONS"} type
 */
export function formatLargeMagnitude(value, type = "MILLIONS") {
  if (!value && value !== 0) return "—";
  if (type === "BILLIONS") {
    return `$${formatIndianNumber(value, 2)}B`;
  }
  if (type === "CRORES") {
    return `₹${formatIndianNumber(value, 2)} Cr`;
  }
  return `${formatIndianNumber(value, 1)}M`;
}

/**
 * Format date from ISO or YYYY-MM-DD to readable date or DD-MM-YYYY
 * @param {string} dateStr
 * @param {"display"|"shortMonth"|"table"} mode
 */
export function formatDate(dateStr, mode = "display") {
  if (!dateStr) return "—";
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;

    if (mode === "shortMonth") {
      return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
    }
    if (mode === "table") {
      const day = String(d.getDate()).padStart(2, '0');
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const year = d.getFullYear();
      return `${day}-${month}-${year}`;
    }
    return d.toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" });
  } catch {
    return dateStr;
  }
}

/**
 * Shorten a SHA-256 hash (e.g. 381d7f...2c21)
 * @param {string} hash
 * @param {number} chars
 */
export function truncateHash(hash, chars = 6) {
  if (!hash) return "—";
  if (hash.length <= chars * 2) return hash;
  return `${hash.slice(0, chars)}...${hash.slice(-chars)}`;
}
