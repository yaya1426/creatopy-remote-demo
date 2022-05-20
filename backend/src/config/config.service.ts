import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

export interface EnvConfig {
  [key: string]: string;
}

@Injectable()
export class ConfigService {
  private readonly envConfig: EnvConfig;

  constructor(filePath: string) {
    let file: Buffer | undefined;
    try {
      file = fs.readFileSync(filePath);
    } catch (error) {
      file = fs.readFileSync('.env.development');
    }

    this.envConfig = dotenv.parse(file);
  }

  get(key: string): string {
    console.log('this.envConfig[key]', this.envConfig[key]);
    return this.envConfig[key];
  }
}
