// Street Fighter
  // Game Engine
    // Graphics Engine
      // 2d
        // render 2d objects
        // render 2d animations
    // Input through arcade controller
    // Input through keyboard
    // Sound

import { Character } from './Character.js'
import { GameEngine, GameEngineObject } from './game_engine'

function main() {
  const gameEngine = new GameEngine()
  gameEngine.attach(document.body)
  const characters = [
    new Character(0, 0),
    new Character(30, 0)
  ]
  for (const character of characters) {
    gameEngine.addCharacter(character)
  }
  gameEngine.start()
  gameEngine.initializeRound()
}

document.addEventListener('DOMContentLoaded', main)
