import { ScriptLoader } from "@orderbook/core/utils/scriptLoader";
import { waitDocumentReady } from "@orderbook/core/utils";

const FIVE_MINUTES = 1000 * 60 * 5;

type GoogleOauthOptions = {
  clientId: string;
  scope: string;
};

export class GoogleOauth {
  private options!: GoogleOauthOptions;
  private client!: google.accounts.oauth2.TokenClient;
  private token!: google.accounts.oauth2.TokenResponse | null;
  private isAuthProcess = false;

  private authCallback = (token: google.accounts.oauth2.TokenResponse) => {};
  private authErrorCallback = (
    error: google.accounts.oauth2.ClientConfigError
  ) => {
    console.error(error);
  };

  get ready(): boolean {
    return !!this.client;
  }

  public setOptions(options: GoogleOauthOptions): void {
    this.options = { ...options };
  }

  public async init(): Promise<void> {
    if (this.ready) return;
    if (!this.options)
      throw new Error(
        `[${this.constructor.name}]: Options should be set before inintialization`
      );
    if (!this.options.clientId)
      throw new Error(`[${this.constructor.name}]: Client ID is required`);

    await this.load();
    this.initClient(this.options);
  }

  private async load(): Promise<void> {
    await Promise.all([
      ScriptLoader.load("https://accounts.google.com/gsi/client"),
      waitDocumentReady(),
    ]);
  }

  private initClient({ clientId, scope }: GoogleOauthOptions): void {
    this.client = google.accounts.oauth2.initTokenClient({
      client_id: clientId,
      scope,
      callback: (token) => this.authCallback(token),
      error_callback: (error) => this.authErrorCallback(error),
    });
  }

  private async waitForAuthFinalization(func: () => void): Promise<void> {
    await new Promise<void>((resolve, reject) => {
      this.authCallback = (token) => {
        const expires = String(Date.now() + Number(token.expires_in) * 1000);
        this.token = { ...token, expires_in: expires };
        this.isAuthProcess = false;
        resolve();
      };
      this.authErrorCallback = (error) => {
        this.token = null;
        this.isAuthProcess = false;
        reject(error);
      };

      this.isAuthProcess = true;
      func();
    });
  }

  public async checkToken(): Promise<void> {
    if (
      !this.token ||
      Date.now() + FIVE_MINUTES > Number(this.token.expires_in)
    ) {
      await this.getToken();
    }
  }

  public async getToken(): Promise<void> {
    if (this.isAuthProcess) return;

    await this.waitForAuthFinalization(() => {
      // Prompt the user to select a Google Account
      // Ask for consent to share their data at first time
      this.client.requestAccessToken({ prompt: "select_account" });
    });
  }
}
