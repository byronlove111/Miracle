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

export async function edit_file_from_path(input: {
  path: string;
  old_str: string;
  new_str: string;
}) {
  const file = Bun.file(input.path);
  const exists = await file.exists();
  if (!exists) {
    Bun.write(input.path, input.new_str);
    return;
  } else {
    const old_content: string = await file.text();
    const new_content: string = old_content.replace(
      input.old_str,
      input.new_str
    );
    Bun.write(input.path, new_content);
    return;
  }
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

export const edit_file = {
  name: "edit_file",
  description:
    "Make edits to a text file. Replaces 'old_str' with 'new_str' in the given file. 'old_str' and 'new_str' MUST be different from each other. If the file specified with path doesn't exist, it will be created, allowing you to use this function to create new files as well.",
  input_schema: {
    type: "object",
    properties: {
      path: {
        type: "string",
        description:
          "The path to the file to edit, e.g., './src/main.ts'. If the path doesn't exist, a new file will be created at that location.",
      },
      old_str: {
        type: "string",
        description:
          "The exact text string to find and replace in the file. This parameter is optional - you can provide an empty string or null when creating a new file from scratch. When editing an existing file, this should match the exact text you want to replace, including whitespace and formatting.",
      },
      new_str: {
        type: "string",
        description:
          "The text string that will replace 'old_str' in the file. When creating a new file (with empty or null 'old_str'), this becomes the entire content of the new file. When editing, this is the replacement text that will take the place of 'old_str'.",
      },
    },
    required: ["path", "new_str"],
  },
  execute: edit_file_from_path,
};
