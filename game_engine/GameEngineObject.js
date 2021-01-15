export class GameEngineObject {
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  render({canvas, context}) {
    throw new Error('Not implemented')
  }
}
