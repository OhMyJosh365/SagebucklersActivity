import { Room } from "colyseus.js";
import { Player } from "../../../server/src/entities/Player";
import { State } from "../../../server/src/entities/State";
import kaboom, { KaboomCtx } from "kaboom"
import "kaboom/global"

export function createDungeonScene(k: KaboomCtx){
	k.scene("dungeon", (room: Room<State>) => {

		updateLobby();
		const stateChangeController = room.onStateChange((state) => {
            updateLobby();
        });

		function updateLobby(){
			k.destroyAll("existing-ui")

			var s = "Dungeon!\nPlayers: "
			room.state.players.forEach((player: Player, key: string) => {
				s += player.name;
				k.loadSprite("player", player.avatarUri)
			})

			k.add([
				k.text(s),
				k.pos(k.center()),
				k.anchor("center"),
				"existing-ui"
			])

			const player = k.add([
				k.sprite("player"),
				k.pos(k.center()),
				k.anchor("center"),
				k.rotate(0),
				k.scale(.3)
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

			function onMovement(x: number, y: number){
				player.pos.x += x;
				player.pos.y += y;
				k.camPos(player.worldPos());
			}

			k.camScale(new Vec2(1.5))
			k.camPos(player.worldPos());

		}	
	})
}