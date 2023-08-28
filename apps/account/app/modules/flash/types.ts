export type Flash = {
  id: string;
  message: string;
  type: 'success' | 'info';
  link?: {
    to: string;
    message: string;
  };
};
