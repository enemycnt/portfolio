import fs from "node:fs/promises";

export async function readJson(filePath: string) {
  const data = await fs.readFile(filePath, {
    encoding: "utf8",
  });
  const input = JSON.parse(data);
  return input;
}
