import kaboom, { KaboomCtx } from "kaboom"
import "kaboom/global"

export function createDungeonScene(k: KaboomCtx){
	k.scene("dungeon", () => {

		k.add([
            k.text("Dungeon!"),
            k.pos(k.center()),
            k.anchor("center")
        ])

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
			k.go("lobby")
		})
	});
}