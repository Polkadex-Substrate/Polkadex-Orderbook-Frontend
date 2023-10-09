import { ScriptLoader } from "@orderbook/core/utils/scriptLoader";
import { waitDocumentReady } from "@orderbook/core/utils";

type GoogleApiOptions = {
  apiKey: string;
  discoveryDocs?: string[];
};

export class GoogleApi {
  private options!: GoogleApiOptions;
  private _ready = false;

  get ready(): boolean {
    return this._ready;
  }

  public setOptions(options: GoogleApiOptions): void {
    this.options = { ...options };
  }

  public async init(): Promise<void> {
    if (this.ready) return;
    if (!this.options)
      throw new Error(
        `[${this.constructor.name}]: Options should be set before initialization`
      );
    if (!this.options.apiKey)
      throw new Error(`[${this.constructor.name}]: Api key is required`);

    await this.load();
    await this.initClient(this.options);
  }

  private async load(): Promise<void> {
    await Promise.all([
      ScriptLoader.load("https://apis.google.com/js/api.js"),
      waitDocumentReady(),
    ]);
  }

  private async initClient({
    apiKey,
    discoveryDocs,
  }: GoogleApiOptions): Promise<void> {
    return new Promise((resolve, reject) => {
      gapi.load("client", () => {
        gapi.client
          .init({ apiKey, discoveryDocs })
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

  protected readonly boundary = "foo_bar_baz";

  private prepareContent(
    content: string,
    metadata: gapi.client.drive.File
  ): string {
    return `
--${this.boundary}
Content-Type: ${this.mimeType.json}; charset=UTF-8

${JSON.stringify(metadata)}
--${this.boundary}
Content-Type: ${this.mimeType.json}

${content}
--${this.boundary}--`;
  }

  prepareBody(
    content: string,
    { name, description, mimeType = this.mimeType.json }: gapi.client.drive.File
  ) {
    const metadata: gapi.client.drive.File = {
      name,
      description,
      mimeType,
    };

    return this.prepareContent(content, metadata);
  }

  public async getFolderId(
    name: string,
    parent: string
  ): Promise<string | undefined> {
    const query = `name = '${name}'`;
    const files = await this.getFiles(parent, query);

    return files?.[0]?.id;
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

  /**
   * Create a folder
   * @param name name of the folder
   * @param parent the name of the parent folder, if the new one should be a subfolder
   * @returns the created folder ID
   */
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

  public async getFiles(spaces: string, q?: string) {
    const response = await gapi.client.drive.files.list({
      fields: "files(id,name,description)",
      spaces,
      q,
    });

    return response.result.files;
  }

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

  public async updateFile(fileId: string, body: string): Promise<void> {
    const request = gapi.client.request({
      path: `/upload/drive/v3/files/${fileId}`,
      method: "PATCH",
      params: { uploadType: "multipart" },
      headers: {
        "Content-Type": `multipart/related; boundary=${this.boundary}`,
        "Content-Length": body.length.toString(),
      },
      body,
    });

    await new Promise((resolve, reject) => {
      try {
        request.execute(resolve);
      } catch (error) {
        console.error(error);
        reject(error);
      }
    });
  }
}
