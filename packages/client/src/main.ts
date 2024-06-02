import kaboom from "kaboom"
import "kaboom/global"
import { createDungeonScene } from "./scenes/dungeon"
import { createLoobyScene } from "./scenes/lobby"
import { setUpDiscordSdk } from "./helper/setUpDiscordSdk"

// initialize context
export const k = kaboom({
	background: "000000"
})

k.loadSprite("player", "src/sprites/bean.png")

console.log("Instance Created!")

createDungeonScene(k)
createLoobyScene(k)

setUpDiscordSdk().then(({avatarUri, name, client, room}) => {
	k.go("dungeon", room)
})