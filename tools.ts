import { Glob } from "bun";

export async function read_file_from_path(input: { path: string }) {
  try {
    const file = Bun.file(input.path);
    const data = await file.text();
    return data;
  } catch (err) {
    return `Error: the file ${input.path} doesn't exist`;
  }
}

export function list(input: { path: string }) {
  const glob = new Glob(input.path);
  const files: string[] = [];
  for (const file of glob.scanSync()) {
    files.push(file);
  }
  return files;
}

export const read_file = {
  name: "read_file",
  description:
    "this function allows you to read a file, you'll need to provides the current path of the file.",
  input_schema: {
    type: "object",
    properties: {
      path: {
        type: "string",
        description: "The file path to read, e.g., './main.go'",
      },
    },
    required: ["path"],
  },
  execute: read_file_from_path,
};

export const list_files = {
  name: "list_files",
  description:
    "Lists files and directories matching a pattern. Supports glob patterns for filtering (e.g., '*.ts' for TypeScript files, '**/*.json' for all JSON files recursively). Use '**/*' to list all files recursively in a directory.",
  input_schema: {
    type: "object",
    properties: {
      path: {
        type: "string",
        description:
          "The glob pattern to match files, e.g., './**/*.ts' for all TypeScript files, './src/*' for files in src directory, or '*.json' for JSON files in current directory",
      },
    },
    required: ["path"],
  },
  execute: list,
};
