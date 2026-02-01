/**
 * Calculate the best contrast color (black or white) for a given hex background.
 * Uses the YIQ formula.
 * @param {string} hexcolor - The background color in HEX format (e.g., "#ffffff" or "fff")
 * @returns {string} - "#000000" (or a soft black) or "#ffffff"
 */
export const getContrastColor = (hexcolor) => {
	// If no color provided, default to black text on presumably white bg
	if (!hexcolor) return "#1f2937";

	// Remove hash if present
	hexcolor = hexcolor.replace("#", "");

	// Convert 3-digit hex to 6-digit
	if (hexcolor.length === 3) {
		hexcolor = hexcolor
			.split("")
			.map((c) => c + c)
			.join("");
	}

	const r = parseInt(hexcolor.substr(0, 2), 16);
	const g = parseInt(hexcolor.substr(2, 2), 16);
	const b = parseInt(hexcolor.substr(4, 2), 16);
	const yiq = (r * 299 + g * 587 + b * 114) / 1000;

	// Returns soft black for light backgrounds, white for dark backgrounds
	return yiq >= 128 ? "#1f2937" : "#ffffff";
};
