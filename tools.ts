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
    Bun.write(file, input.new_str);
    return "File created successfully";
  } else {
    const old_content: string = await file.text();
    const new_content: string = old_content.replace(
      input.old_str,
      input.new_str
    );
    Bun.write(input.path, new_content);
    return "File edited successfully";
  }
}

export async function delete_file_from_path(input: { path: string }) {
  try {
    await Bun.file(input.path).delete();
    return `File successfully deleted: ${input.path}`;
  } catch (err) {
    return `Error: could not delete file at ${input.path} - ${err}`;
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
    "This tool has two modes: 1) CREATE a new file by providing path and new_str with empty old_str, 2) EDIT an existing file by replacing old_str with new_str. The tool will create the file if it doesn't exist, or edit it if it does. Always provide new_str - it contains either the full file content (for creation) or the replacement text (for editing).",
  input_schema: {
    type: "object",
    properties: {
      path: {
        type: "string",
        description:
          "The path to the file to create or edit, e.g., './src/main.ts'. Works for both creating new files and editing existing ones.",
      },
      old_str: {
        type: "string",
        description:
          "For CREATING a new file: use an empty string ''. For EDITING an existing file: provide the exact text to find and replace, including all whitespace and formatting. This must match exactly what's in the file.",
      },
      new_str: {
        type: "string",
        description:
          "REQUIRED. For CREATING a new file: this is the complete content of the new file. For EDITING an existing file: this is the text that will replace old_str. Never leave this undefined or null.",
      },
    },
    required: ["path", "old_str", "new_str"],
  },
  execute: edit_file_from_path,
};

export const delete_file = {
  name: "delete_file",
  description:
    "Deletes a file at the specified path. This operation is permanent and cannot be undone. Use with caution as the file will be removed from the filesystem.",
  input_schema: {
    type: "object",
    properties: {
      path: {
        type: "string",
        description: "The path to the file to delete, e.g., './src/main.ts'.",
      },
    },
    required: ["path"],
  },
  execute: delete_file_from_path,
};
