/**
 * Formats a number into Indian Rupee format with thousand, lakh, and crore separators.
 * Example: 12500000 -> 1,25,00,000
 */
export function formatINR(amount: number): string {
    if (isNaN(amount)) return "₹0";

    const formatter = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
    });

    return formatter.format(amount);
}

/**
 * Returns a short human-readable INR string.
 * Example: 10000000 -> 1 Crore
 */
export function formatINRShort(amount: number): string {
    if (amount >= 10000000) {
        return `${(amount / 10000000).toFixed(2)} Crore`;
    } else if (amount >= 100000) {
        return `${(amount / 100000).toFixed(2)} Lakh`;
    }
    return formatINR(amount);
}
