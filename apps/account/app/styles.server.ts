import path from 'path';
import fs from 'fs';

const getFilesLink = () => {
  if (process.env.NODE_ENV === 'development') {
    return '/build/styles/app.css';
  }

  const stylesDir = path.join(__dirname, '../', 'public', 'build', 'styles');
  const files = fs.readdirSync(stylesDir);

  const stylesFile = files.find((file) => file.startsWith('app.') && file.endsWith('.css'));

  if (!stylesFile) {
    throw new Error('The styles file was not found');
  }

  return `/build/styles/${stylesFile}`;
};

export const STYLE_LINK = `<link rel="stylesheet" href="${getFilesLink()}">`;
