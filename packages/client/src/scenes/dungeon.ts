import { Room } from "colyseus.js";
import { Player } from "../../../server/src/entities/Player";
import { State } from "../../../server/src/entities/State";
import kaboom, { KaboomCtx } from "kaboom"
import "kaboom/global"

export function createDungeonScene(k: KaboomCtx){
	k.scene("dungeon", (room: Room<State>) => {

		const lvl = [
			"  =====",
			"      =",
			"=     =",
			"=   ===",
			"=     =",
			"=     =",
			"======="
		]
		addLevel(lvl, {
			tileWidth: 64, 
			tileHeight: 64,
			pos: k.center(),
			tiles: {
				"=": () => [
				k.sprite("bean"),
				k.area(),
				k.body({isStatic: true}),
				"wall"
				]
			}
		})

		const player = k.add([
			k.sprite("player"),
			k.pos(k.center()),
			k.anchor("center"),
			k.rotate(0),
			k.area(),
			k.body(),
			k.scale(.2),
			"player"
		])
		
		k.onKeyDown("w", () => {
			onMovement(0, -2)
		})
		
		k.onKeyDown("s", () => {
			onMovement(0, 2)
		})
		
		k.onKeyDown("a", () => {
			onMovement(-2, 0)
		})
		
		k.onKeyDown("d", () => {
			onMovement(2, 0)
		})

		player.onCollideUpdate("wall", (w) => {
			
		})

		function onMovement(x: number, y: number){
			player.pos.x += x;
			player.pos.y += y;
			k.camPos(player.worldPos());
		}

		k.camScale(new Vec2(2))
		k.camPos(player.worldPos());
	
	})
}