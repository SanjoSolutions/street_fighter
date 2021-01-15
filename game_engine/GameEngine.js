import { createFullDocumentCanvas } from '../unnamed/createFullDocumentCanvas.js'

export class GameEngine {
  constructor() {
    const {canvas, context} = createFullDocumentCanvas(() => {
      this.render()
    })
    this.canvas = canvas
    this.context = context
    this.characters = []
    this.objects = []
    this.isRunning = false
    this.stageViewport = {
      x: (this.getStageWidth() - this.canvas.width) / 2,
      y: 0,
      width: this.canvas.width,
      height: this.canvas.height
    }

    this._onAnimationFrame = this._onAnimationFrame.bind(this)
    this._requestNextAnimationFrame = this._requestNextAnimationFrame.bind(this)
  }

  initializeRound() {
    this.characters[0].x = this.getStageWidth() / 2 - this.characters[0].width / 2 - 50
    this.characters[0].y = this.getStageHeight() - this.characters[0].height

    this.characters[1].x = this.getStageWidth() / 2 - this.characters[1].width / 2 + 50
    this.characters[1].y = this.getStageHeight() - this.characters[1].height
  }

  getStageHeight() {
    return this.canvas.width / 16 * 10
  }

  getStageWidth() {
    return 3 * this.getStageHeight()
  }

  attach(element) {
    element.appendChild(this.canvas)
  }

  addCharacter(character) {
    this.characters.push(character)
    this.addObject(character)
  }

  addObject(object) {
    this.objects.push(object)
  }

  _onAnimationFrame() {
    if (this.isRunning) {
      this.tick()
      this._requestNextAnimationFrame()
    }
  }

  _requestNextAnimationFrame() {
    requestAnimationFrame(this._onAnimationFrame)
  }

  start() {
    if (!this.isRunning) {
      this.isRunning = true
      this._requestNextAnimationFrame()
    }
  }

  stop() {
    this.isRunning = false
  }

  tick() {
    const gamepad = navigator.getGamepads()[0]
    if (gamepad) {
      const character = this.characters[0]

      const moveRightButton = gamepad.buttons[15]
      const isMoveRightButtonPressed = moveRightButton.pressed
      if (isMoveRightButtonPressed) {
        character.x += 1
      }

      const moveLeftButton = gamepad.buttons[14]
      const isMoveLeftButtonPressed = moveLeftButton.pressed
      if (isMoveLeftButtonPressed) {
        character.x -= 1
      }
    }
    this.render()
  }

  render() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.context.save()
    this.context.translate(-this.stageViewport.x, -this.stageViewport.y)
    this._renderStage()
    for (const object of this.objects) {
      object.render({canvas: this.canvas, context: this.context})
    }
    this.context.restore()
  }

  _renderStage() {
    this.context.strokeStyle = 'black'
    this.context.beginPath()
    this.context.rect(
      0 + 0.5 * this.context.lineWidth,
      0 + 0.5 * this.context.lineWidth,
      this.getStageWidth() - this.context.lineWidth,
      this.getStageHeight() - this.context.lineWidth
    )
    this.context.stroke()
  }
}
