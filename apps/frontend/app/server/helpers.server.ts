export const buildGetParams = (data: Record<string, unknown>) => {
  const params = new URLSearchParams();

  Object.entries(data).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((item) => params.append(key, item));
    } else {
      params.append(key, value as string);
    }
  });

  return params;
};

export const passCookieHeaderFromAPI = (resp: Response) => {
  return new Headers({
    'set-cookie': resp.headers.get('set-cookie') || '',
  });
};
