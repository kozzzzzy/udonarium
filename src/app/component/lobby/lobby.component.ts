import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit, OnDestroy, NgZone, Input, ViewChild, AfterViewInit, ElementRef, HostListener } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

import { RoomSettingComponent } from '../room-setting/room-setting.component';
import { PasswordCheckComponent } from '../password-check/password-check.component';

import { ModalService } from '../../service/modal.service';
import { PanelService, PanelOption } from '../../service/panel.service';
import { PointerDeviceService } from '../../service/pointer-device.service';

import { Network, EventSystem } from '../../class/core/system/system';
import { ObjectStore } from '../../class/core/synchronize-object/object-store';
import { PeerContext } from '../../class/core/system/network/peer-context';
import { PeerCursor } from '../../class/peer-cursor';

@Component({
  selector: 'lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css'],
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class LobbyComponent implements OnInit {
  rooms: { room: string, roomName: string, isPrivate: boolean, peers: PeerContext[] }[] = [];

  isReloading: boolean = false;

  help: string = '「一覧を更新」ボタンを押すと接続可能なルーム一覧を表示します。';

  get currentRoom(): string { return Network.peerContext.room };
  get peerId(): string { return Network.peerId; }
  get isConnected(): boolean {
    return Network.peerIds.length <= 1 ? false : true;
  }
  constructor(
    private ngZone: NgZone,
    private panelService: PanelService,
    private modalService: ModalService,
    private elementRef: ElementRef,
    private changeDetector: ChangeDetectorRef,
    private pointerDeviceService: PointerDeviceService
  ) { }

  ngOnInit() {
    this.changeTitle();
    EventSystem.register(this)
      .on('OPEN_PEER', 0, event => {
        this.changeTitle();
      })
      .on('OTHER_PEERS', event => {
        this.changeTitle();
      });
  }

  private changeTitle() {
    this.modalService.title = this.panelService.title = 'ロビー';
    if (Network.peerContext.roomName.length) {
      this.modalService.title = this.panelService.title = '＜' + Network.peerContext.roomName + '/' + Network.peerContext.room + '＞'
    }
  }

  ngOnDestroy() {
    EventSystem.unregister(this);
  }

  async reload() {
    this.isReloading = true;
    this.help = '検索中...';
    this.rooms = [];
    let peersOfroom: { [room: string]: PeerContext[] } = {};
    let peerIds = await Network.listAllPeers();
    for (let id of peerIds) {
      let context = new PeerContext(id);
      if (!context.isPrivate) {
        //this.peers.push(context);
        if (!(context.room in peersOfroom)) {
          peersOfroom[context.room] = [];
        }
        peersOfroom[context.room].push(context);
      }
    }
    for (let room in peersOfroom) {
      this.rooms.push({ room: room, roomName: peersOfroom[room][0].roomName, isPrivate: peersOfroom[room][0].isPrivate, peers: peersOfroom[room] });
    }
    this.help = '接続可能なルームが見つかりませんでした。「新しいルームを作成する」で新規ルームを作成できます。';
    this.isReloading = false;
  }

  async connect(peerContexts: PeerContext[]) {
    //Network.connect(peer);
    let context = peerContexts[0];

    if (context.password.length) {
      let input = await this.modalService.open(PasswordCheckComponent, { password: context.password });
      if (input !== context.password) return;
    }

    Network.open(PeerContext.generateId(), context.room, context.roomName, context.isPrivate, context.password);
    PeerCursor.myCursor.peerId = Network.peerId;

    let triedPeer: string[] = [];
    EventSystem.register(triedPeer)
      .on('OPEN_PEER', 0, event => {
        console.log('LobbyComponent OPEN_PEER', event.data.peer);
        EventSystem.unregister(triedPeer);
        for (let peer of peerContexts) {
          Network.connect(peer.fullstring);
        }
        EventSystem.register(triedPeer)
          .on('OPEN_OTHER_PEER', 0, event => {
            console.log('接続成功！', event.data.peer);
            triedPeer.push(event.data.peer);
            console.log('接続成功 ' + triedPeer.length + '/' + peerContexts.length);
            if (peerContexts.length <= triedPeer.length) {
              this.resetNetwork();
              EventSystem.unregister(triedPeer);
            }
          })
          .on('CLOSE_OTHER_PEER', 0, event => {
            console.warn('接続失敗', event.data.peer);
            triedPeer.push(event.data.peer);
            console.warn('接続失敗 ' + triedPeer.length + '/' + peerContexts.length);
            if (peerContexts.length <= triedPeer.length) {
              this.resetNetwork();
              EventSystem.unregister(triedPeer);
            }
          });
      });
  }

  private resetNetwork() {
    if (Network.connections.length < 1) {
      Network.open();
      PeerCursor.myCursor.peerId = Network.peerId;
    }
  }

  async showRoomSetting() {
    await this.modalService.open(RoomSettingComponent, { width: 700, height: 400, left: 0, top: 400 });
    this.rooms = [];
    this.help = '「一覧を更新」ボタンを押すと接続可能なルーム一覧を表示します。';
  }
}