export class DatasetInfo {
  id: number;
  name: string;
  version: number;
  description: string;
  publisher: string;
  fileName: string;

  constructor(id: number, name: string, version: number, description: string, publisher: string) {
    this.fileName = "UNKNOWN";
    this.id = id;
    this.name = name;
    this.version = version;
    this.description = description;
    this.publisher = publisher;
  }

  public addFileName(fileName: string) {
    this.fileName = fileName;
  }
}