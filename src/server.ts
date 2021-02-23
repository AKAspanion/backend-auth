import cors from 'cors';
import express, { Application } from 'express';

export default class Server {
  public PORT: number = +process.env.PORT! ?? 2018;
  private readonly app: Application;
  private server: any;

  constructor() {
    this.app = express();

    this.app.use(cors());
    this.app.use(express.json({ limit: '200mb' }));
    this.app.use(express.urlencoded({ extended: false }));
  }

  /**
   * Starts the server.
   * @returns { Promise<void> }
   */
  public async start() {
    return new Promise<void>(resolve => {
      this.server = this.app.listen(this.PORT, () => {
        console.log('Server started on port ' + this.PORT);

        return resolve();
      });
    });
  }

  /**
   * Stop the server (if running).
   * @returns { Promise<boolean> }
   */
  public async stop(): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      if (this.server) {
        this.server.close(() => {
          return resolve(true);
        });
      } else {
        return resolve(true);
      }
    });
  }

  public use(path: string, router: any): void {
    this.app.use(path, router);
  }
}