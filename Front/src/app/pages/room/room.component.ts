import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {WebSocketService} from "../../web-socket.service";
import {PeerService} from "../../peer.service";

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {
  roomName: string; // id (hash) da sala
  currentStream: any;
  listUser: Array<any> = [];

  constructor(private route: ActivatedRoute, private webSocketService: WebSocketService,
              private peerService: PeerService) {
    this.roomName = route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.checkMediaDevices();
    this.initPeer();
    this.initSocket();
  }

  initPeer = () => {
    const {peer} = this.peerService;
    peer.on('open', (id) => {
      const body = {
        idPeer: id,
        roomName: this.roomName
      };

      this.webSocketService.joinRoom(body);
    });


    peer.on('call', callEnter => {
      callEnter.answer(this.currentStream); // Responde a stream
      callEnter.on('stream', (streamRemote) => {
        this.addVideoUser(streamRemote); // adiciona o novo usuario
      });
    }, err => {
      console.log('*** ERROR *** Peer call ', err);
    });
  }

  initSocket = () => {
    this.webSocketService.callbackEvent.subscribe(res => {
      if (res.name === 'new-user') {
        const {idPeer} = res.data;
        this.sendCall(idPeer, this.currentStream);
      }
    })
  }

  checkMediaDevices = () => { //Verifica se exite camera
    if (navigator && navigator.mediaDevices) {
      navigator.mediaDevices.getUserMedia({
        audio: false,
        video: true
      }).then(stream => {
        this.currentStream = stream;
        this.addVideoUser(stream);

      }).catch(() => {
        console.log('*** ERROR *** Not permissions');
      });
    } else {
      console.log('*** ERROR *** Not media devices');
    }
  }

  addVideoUser = (stream: any) => {
    this.listUser.push(stream);
    const unique = new Set(this.listUser);
    this.listUser = [...unique];
  }

  sendCall = (idPeer, stream) => {
    const newUserCall = this.peerService.peer.call(idPeer, stream);
    if (!!newUserCall) { //verifica se existe o evento
      newUserCall.on('stream', (userStream) => {
        this.addVideoUser(userStream);
      })
    }
  }

}
