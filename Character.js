import { GameEngineObject } from './game_engine'

export class Character extends GameEngineObject {
  width = 30
  height = 100

  render({canvas, context}) {
    context.strokeStyle = 'black'
    context.beginPath()
    context.rect(
      this.x,
      this.y,
      this.width,
      this.height
    )
    context.stroke()
  }
}
