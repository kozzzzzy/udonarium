import { Network, EventSystem } from './core/system/system';
import { SyncObject, SyncVar } from './core/synchronize-object/anotation';
import { ObjectStore } from './core/synchronize-object/object-store';
import { ObjectSerializer, InnerXml } from './core/synchronize-object/object-serializer';
import { ObjectNode } from './core/synchronize-object/object-node';
import { ChatMessage, ChatMessageContext } from './chat-message';

@SyncObject('chat-tab')
export class ChatTab extends ObjectNode {
  @SyncVar() name: string = 'タブ';
  get chatMessages(): ChatMessage[] { return <ChatMessage[]>this.children; }

  initialize(needUpdate: boolean = true) {
    super.initialize(needUpdate);
    EventSystem.register(this)
      .on<ChatMessageContext>('BROADCAST_MESSAGE', 200, event => {
        if (event.sendFrom !== Network.peerId) return;
        if (event.data.tabIdentifier !== this.identifier) return;
        let chat = new ChatMessage();
        let message = event.data;
        for (let key in message) {
          if (key === 'identifier') continue;
          if (key === 'tabIdentifier') continue;
          if (key === 'text') {
            chat.value = message[key];
            continue;
          }
          if (message[key] == null || message[key] === '') continue;
          chat.setAttribute(key, message[key]);
        }
        chat.initialize();
        this.appendChild(chat);

        event.data.identifier = chat.identifier;
      });
  }

  addMessage(message: ChatMessageContext) {
    message.tabIdentifier = this.identifier;
    EventSystem.call('BROADCAST_MESSAGE', message);
  }
}