import {
  Repeater,
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
  public ticker: Repeater;

  public canvasElement: HTMLCanvasElement | null = null;
  public context: CanvasRenderingContext2D | null = null;

  public stars: Star[] = [];

  public isActive: boolean = false;

  constructor(config?: Partial<StarsManagerConfig>) {
    this.config = {...StarsManagerDefaultConfig};
    this.setConfig(config);

    this.ticker = new Repeater({
      enableTimeout: false,
      onRepeat: (c) => {
        this.update(c.count);
      },
    });
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
      this.context = this.canvasElement.getContext('2d');
      this.isActive = true;
      this.generateStars();

      this.ticker.start();
    }
  }

  public update(n) {
    if (this.context !== null) {
      this.context.clearRect(0, 0, this.canvasElement!.width, this.canvasElement!.height);
      for (let i = 0; i < this.stars.length; i++) {
        const star = this.stars[i];

        this.context.beginPath();
        this.context.arc(
          star.position.x,
          star.position.y,
          Math.sin((n + i) / 10) * 4,
          0, 2 * Math.PI
        );

        this.context.fillStyle = '#ffffff';
        this.context.fill();
      }
    }
  }

  public stop() {
    this.isActive = false;
  }
}
