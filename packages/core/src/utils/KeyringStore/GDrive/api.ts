import { loadGapiInsideDOM, gapi as GapiClient } from "gapi-script";
import { waitForDocumentReady } from "@orderbook/core/utils";
type GoogleApiOptions = {
  apiKey: string;
  discoveryDocs?: string[];
};
class GoogleApi {
  private options!: GoogleApiOptions;
  private _ready!: boolean;
  protected gapi: typeof GapiClient;
  public setOptions(options: GoogleApiOptions): void {
    this.options = { ...options };
  }

  public async init() {
    if (this._ready) return;
    await waitForDocumentReady();
    this.gapi = await loadGapiInsideDOM();
    await this.initGapiClient(this.options);
  }

  private async initGapiClient(options: GoogleApiOptions) {
    return new Promise<void>((resolve, reject) => {
      this.gapi.load("client", () => {
        this.gapi.client
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
    const response = await this.gapi.client.drive.files.get({
      fileId,
      alt: "media",
    });

    return response.result;
  }

  public async deleteFile(fileId: string) {
    await this.gapi.client.drive.files.delete({
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
    const response = await this.gapi.client.drive.files.create({
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
