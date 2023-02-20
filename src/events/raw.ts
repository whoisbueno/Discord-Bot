import { BaseClient } from '../structures/BaseClient';
import { BaseEvent } from '../structures/BaseEvent';

export default class Raw extends BaseEvent {
    public execute(client: BaseClient, packet: any) {
        client.manager.updateVoiceState(packet);
    }
}