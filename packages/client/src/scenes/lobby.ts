import { Room } from "colyseus.js";
import { Player } from "../../../server/src/entities/Player";
import { State } from "../../../server/src/entities/State";
import kaboom, { KaboomCtx } from "kaboom"
import "kaboom/global"

export function createLobbyScene(k: KaboomCtx){
	k.scene("lobby", (room: Room<State>) => {

		updateLobby();
		const stateChangeController = room.onStateChange((state) => {
            updateLobby();
        });

		function updateLobby(){
			k.destroyAll("existing-ui")

			var s = "Lobby!\n-----\nPlayers: "
			room.state.players.forEach((player: Player, key: string) => {
				s += "\n"+player.name;
				k.loadSprite("player", player.avatarUri).then(() => {
					k.add([
						k.sprite("player"),
						k.pos(new Vec2(100, 100)),
						k.anchor("center"),
						k.rotate(0),
						k.scale(.3),
						"existing-ui"
					])
				})

			})

			k.add([
				k.text(s),
				k.pos(k.center()),
				k.anchor("center"),
				"existing-ui"
			])

			k.onClick(() => {
				k.go("dungeon", room);
			})

			

			k.camScale(new Vec2(1))

		}	
	})
}