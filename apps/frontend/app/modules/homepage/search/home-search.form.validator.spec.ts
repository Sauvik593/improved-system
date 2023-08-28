import { vi } from 'vitest';
import { type SafeParseError } from 'zod';
import { getFormSchema, type HomeSearchFormData } from './home-search.form.validator';

describe('getFormSchema', () => {
  const mockTFunction = vi.fn((key) => key); // Mock the translation function

  it('should generate a valid form schema', () => {
    const formSchema = getFormSchema(mockTFunction);

    // Validate the form schema with mock data
    const mockFormData = {
      nation_id: '123',
      location: {
        id: 123,
        nation_id: 55371,
        agent_list_path: '/agents/in/location',
        to_rent_path: '/rent/in/location',
        for_sale_path: '/buy/in/location',
      },
      search: 'search data',
      locale: 'en',
      route: 'buy',
    };

    const result = formSchema.safeParse(mockFormData);

    expect(result.success).toBe(true);
  });

  it('should reject invalid form data', () => {
    const formSchema = getFormSchema(mockTFunction);

    // Invalid form data (missing required fields)
    const mockInvalidData = {
      nation_id: '',
      locale: '',
      route: 'other-type',
      // Missing required fields: location, search, route
    };

    const result = formSchema.safeParse(mockInvalidData) as SafeParseError<HomeSearchFormData>;

    expect(result.success).toBe(false);
    expect(result.error.issues.length).toBeGreaterThan(0);
    expect(result.error.formErrors).toEqual({
      fieldErrors: {
        locale: ['common.form.required'],
        nation_id: ['common.form.required'],
        route: ['common.form.invalid'],
      },
      formErrors: [],
    });
  });
});
