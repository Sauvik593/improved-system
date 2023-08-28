import fetch from 'node-fetch';
import { CliUx } from '@oclif/core';

import { Env } from '../../helpers/env';

import { BASE_URL } from '.';

import { type ProjectsResponse } from '../types';

export class ProjectDownloader {
  call = async () => {
    const url = `${BASE_URL}/projects/${new Env().wtiKey}.json`;

    try {
      const response = await fetch(url);
      const data: ProjectsResponse = await response.json();

      return data.project;
    } catch {
      CliUx.ux.error('There was an error downloading your project!');
    }
  };
}
