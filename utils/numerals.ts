const burmeseNumerals = ['၀', '၁', '၂', '၃', '၄', '၅', '၆', '၇', '၈', '၉'];
const arabicNumerals = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

export const toBurmese = (input: string): string => {
  if (!input) return '';
  return input.split('').map(char => {
    const index = arabicNumerals.indexOf(char);
    return index !== -1 ? burmeseNumerals[index] : char;
  }).join('');
};

export const toArabic = (input: string): string => {
  if (!input) return '';
  return input.split('').map(char => {
    const index = burmeseNumerals.indexOf(char);
    return index !== -1 ? arabicNumerals[index] : char;
  }).join('');
};

export const formatDisplay = (value: string, useBurmese: boolean): string => {
  // Try to format numbers with commas if it's a valid number string
  try {
    // Basic check if the string contains only math chars
    if (!/[^0-9.\-+*/() ]/.test(value)) {
       // This is a naive formatter for the whole expression string, which might be tricky.
       // For simplicity, we just convert numerals.
       return useBurmese ? toBurmese(value) : value;
    }
    return useBurmese ? toBurmese(value) : value;
  } catch {
    return useBurmese ? toBurmese(value) : value;
  }
};