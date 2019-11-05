import {
  Vector2,
} from '@nekobird/rocket';

import Star from './star';

export type StarsDirection = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

export interface StarsManagerConfig {
  numberOfStars: number;
  direction: StarsDirection;
  getCanvasElement: () => HTMLCanvasElement | null;
};

const StarsManagerDefaultConfig: StarsManagerConfig = {
  numberOfStars: 100,
  direction: 'UP',
  getCanvasElement: () => null,
};

export class StarsManager {
  public config: StarsManagerConfig;

  public canvasElement: HTMLCanvasElement | null = null;

  public stars: Star[] = [];

  public isActive: boolean = false;

  constructor(config?: Partial<StarsManagerConfig>) {
    this.config = {...StarsManagerDefaultConfig};
    this.setConfig(config);
  }

  public setConfig(config?: Partial<StarsManagerConfig>) {
    if (typeof config === 'object') {
      Object.assign(this.config, config);
    }
  }

  public generateStars() {
    this.stars = [];

    for (let i = 0; i < this.config.numberOfStars; i++) {
      const star = new Star(this);
      this.stars[i] = star;
    }
  }

  public start() {
    this.canvasElement = this.config.getCanvasElement();

    if (this.canvasElement !== null) {
      this.isActive = true;
      this.generateStars();
    }
  }

  public stop() {
    this.isActive = false;
  }
}
