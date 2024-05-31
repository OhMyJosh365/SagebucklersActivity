import kaboom from "kaboom"
import "kaboom/global"

// initialize context
const k = kaboom({
	background: "000000"
})

k.add([
	k.text("Sagebucklers!"),
	k.pos(k.center()),
	k.anchor("center")
])

k.loadSprite("player", "src/sprites/bean.png")

const player = k.add([
	k.sprite("player"),
	k.pos(k.center()),
	k.anchor("center"),
	k.rotate(0)
])

k.onKeyDown("w", () => {
	player.pos.y -= 2;
})

k.onKeyDown("s", () => {
	player.pos.y += 2;
})

k.onKeyDown("a", () => {
	player.pos.x -= 2;
})

k.onKeyDown("d", () => {
	player.pos.x += 2;
})

// add a kaboom on mouse click
k.onClick(() => {
	addKaboom(mousePos())
})