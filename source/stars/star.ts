import { Vector2 } from '@nekobird/rocket';
import { StarsManager, StarsManagerConfig } from './stars-manager';

export default class Star {
  public manager: StarsManager;

  public position: Vector2;

  constructor(manager: StarsManager) {
    this.manager = manager;

    this.position = new Vector2(0, 0);

    this.setInitialPosition();
  }

  public setInitialPosition() {
    this.position.equals(
      Math.random() * this.manager.canvasElement!.width,
      Math.random() * this.manager.canvasElement!.height,
    );
  }
}
