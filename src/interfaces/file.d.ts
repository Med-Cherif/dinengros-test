export interface IFile {
  id: number;
  name: string;
  uri: string;
}

export interface IFilePath extends IFile {
  path: string;
}
