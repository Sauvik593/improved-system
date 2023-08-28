export interface ProjectFile {
  id: number;
  // A path to a file with a file extension
  name: string;
  created_at: string;
  updated_at: string;
  hash_file: string;
  master_project_file_id: number | null;
  locale_code: string;
  fresh: boolean;
}

export interface ProjectsResponse {
  project: {
    name: string;
    id: number;
    created_at: number;
    project_files: ProjectFile[];
  };
}

export interface ParsedSingleFileResponse {
  json: Record<string, unknown>;
  localeCode: string;
  name: string;
  hash: string;
}
