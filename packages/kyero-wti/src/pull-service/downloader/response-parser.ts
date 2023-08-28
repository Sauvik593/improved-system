import * as YAML from 'yaml';

import { type ProjectFile, type ParsedSingleFileResponse } from '../types';

export const ResponseParser = {
  call: async (
    projectFileData: ProjectFile,
    textResponse: string,
  ): Promise<ParsedSingleFileResponse> => {
    const yamlParsedResponse = await YAML.parse(textResponse);

    return {
      // a yml file has a code at the beginning of the file. We need to remove it in order to work with nextjs translations
      json: yamlParsedResponse[projectFileData.locale_code],
      localeCode: projectFileData.locale_code,
      name: projectFileData.name,
      hash: projectFileData.hash_file,
    };
  },
};
