import { IFile, IFilePath } from "interfaces/file";

export default function handleFile(file: IFile | null): IFilePath | null {
  if (!file) return null;

  return {
    ...file,
    path: `${file.uri}/${file.name}`,
  };
}
