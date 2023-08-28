export const createActionData = async (payload: Record<string, string>) => {
  const params = {};
  const context = {} as unknown as any;
  const formData = new URLSearchParams();

  Object.entries(payload).forEach(([key, value]) => {
    formData.append(key, value);
  });

  const request = new Request('http://new-frontend.kyero.test/', {
    method: 'POST',
    body: formData,
  });

  return { request, params, context };
};
