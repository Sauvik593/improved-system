import { NextRequest, NextResponse } from 'next/server';
import { NextURL } from 'next/dist/server/web/next-url';
import { pipe } from 'ramda';
import { ASSETS_PREFIX } from '@helpers/assetsUrl';

const removeAssetPrefixFromRequest = ({ nextUrl }: NextRequest) =>
  nextUrl.href.replace(ASSETS_PREFIX, '');

export const AssetsMiddleware = {
  condition: (nextUrl: NextURL) => nextUrl.href.includes(ASSETS_PREFIX),
  middleware: pipe(removeAssetPrefixFromRequest, NextResponse.rewrite),
};
