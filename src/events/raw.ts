import { BaseClient } from '../structures/BaseClient';
import { BaseEvent } from '../structures/BaseEvent';

export default class Raw extends BaseEvent {
    public execute(client: BaseClient, packet: never) {
        client.manager.updateVoiceState(packet);
    }
}