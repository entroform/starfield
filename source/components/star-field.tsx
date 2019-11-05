import React from 'react';

import {
  Vector2,
} from '@nekobird/rocket';

class Star {
  public position: Vector2;

  constructor() {
    this.position = new Vector2(0, 0);
  }
}

class StarsManager {
  public stars: Star[] = [];
  public numberOfStars: number = 200;

  constructor() {

  }

  public generateStars() {
    this.stars = [];

    for (let i = 0; i < this.numberOfStars; i++) {
      const star = new Star();
      this.stars[i] = star;
    }
  }
}

const StarField = () => {
  return (
    <div></div>
  );
}

export default StarField;