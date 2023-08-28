type TranslationJSON = {
  [name: string]: string | null | TranslationJSON;
};

/**
 * Higher-order function to generate helper functions based on the condition.
 */
export function generateHelperFunction(predicate: (data: any) => boolean) {
  return function processObject(obj: TranslationJSON, path = ''): string[] {
    const keys = [];

    for (const [key, value] of Object.entries(obj)) {
      const newPath = path ? `${path}.${key}` : key;

      if (predicate(value)) {
        if (value !== null && value !== '') {
          keys.push(newPath);
        } else {
          throw new Error(`Empty translation found: ${newPath}`);
        }
      }

      if (value !== null && typeof value === 'object') {
        keys.push(...processObject(value, newPath));
      }
    }

    return keys;
  };
}
