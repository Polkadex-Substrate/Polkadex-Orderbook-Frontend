import { documentHelpers } from "@orderbook/core/utils";
import { ScriptLoader } from "@orderbook/core/utils/scriptLoader";
type GoogleApiOptions = {
  apiKey: string;
  discoveryDocs?: string[];
};
class GoogleApi {
  private options!: GoogleApiOptions;
  private _ready!: boolean;

  public setOptions(options: GoogleApiOptions): void {
    this.options = { ...options };
  }

  public async init() {
    if (this._ready) return;
    await Promise.all([
      ScriptLoader.load("https://apis.google.com/js/api.js"),
      documentHelpers(),
    ]);
    await this.initGapiClient(this.options);
  }

  private async initGapiClient(options: GoogleApiOptions) {
    return new Promise<void>((resolve, reject) => {
      gapi.load("client", () => {
        gapi.client
          .init({ ...options })
          .then(() => {
            this._ready = true;
            resolve();
          })
          .catch(reject);
      });
    });
  }
}

export class GoogleDriveApi extends GoogleApi {
  protected readonly mimeType = {
    json: "application/json",
    folder: "application/vnd.google-apps.folder",
  };

  public async readFile(fileId: string) {
    const response = await gapi.client.drive.files.get({
      fileId,
      alt: "media",
    });

    return response.result;
  }

  public async deleteFile(fileId: string) {
    await gapi.client.drive.files.delete({
      fileId,
    });
  }

  public async createFolder(
    name: string,
    parent?: string
  ): Promise<string | undefined> {
    const parents = parent ? [parent] : undefined;
    const metadata = {
      name,
      mimeType: this.mimeType.folder,
      parents,
    };
    const id = await this.createFile(metadata);

    return id;
  }

  public async createFile(metadata: gapi.client.drive.File): Promise<string> {
    const response = await gapi.client.drive.files.create({
      resource: metadata,
      fields: "id",
    });
    const id = response.result.id;

    if (!id)
      throw new Error(
        `[${this.constructor.name}]: Unable to create file metadata`
      );

    return id;
  }
}
