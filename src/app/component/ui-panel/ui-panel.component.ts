import { Component, ComponentRef, ViewRef, ViewContainerRef, OnInit, OnDestroy, AfterViewInit, Input, ViewChild, ElementRef } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { PanelService } from '../../service/panel.service';

/*
import * as $ from 'jquery';
import { } from 'jqueryui';
*/

@Component({
  selector: 'ui-panel',
  templateUrl: './ui-panel.component.html',
  styleUrls: ['./ui-panel.component.css'],
  providers: [
    PanelService,
  ],
  animations: [
    trigger('flyInOut', [
      state('in', style({ transform: 'scale(1, 1)' })),
      transition('void => *', [
        animate('100ms ease-out', keyframes([
          style({ transform: 'scale(0.8, 0.8)', opacity: '0', offset: 0 }),
          style({ transform: 'scale(1.0, 1.0)', opacity: '1', offset: 1.0 })
        ]))
      ]),
      transition('* => void', [
        animate(100, style({ transform: 'scale(0, 0)' }))
      ])
    ]),
    trigger('bgInOut', [
      state('in', style({ 'background-color': 'rgba(30, 30, 30, 0.3)' })),
      transition('void => *', [
        style({ 'background-color': 'rgba(30, 30, 30, 0.0)' }), animate(200)
      ]),
      transition('* => void', [
        animate(200, style({ 'background-color': 'rgba(30, 30, 30, 0.0)' }))
      ])
    ]),
  ]
})
export class UIPanelComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('draggablePanel') draggablePanel: ElementRef;
  @ViewChild('scrollablePanel') scrollablePanel: ElementRef;
  @ViewChild('content', { read: ViewContainerRef }) content: ViewContainerRef;

  /*
  @Input() title: string = '無名のパネル';
  @Input() left: number = 0;
  @Input() top: number = 0;
  @Input() width: number = 100;
  @Input() height: number = 100;
  */

  @Input() set title(title: string) { this.panelService.title = title; }
  @Input() set left(left: number) { this.panelService.left = left; }
  @Input() set top(top: number) { this.panelService.top = top; }
  @Input() set width(width: number) { this.panelService.width = width; }
  @Input() set height(height: number) { this.panelService.height = height; }

  get title(): string { return this.panelService.title; }
  get left() { return this.panelService.left; }
  get top() { return this.panelService.top; }
  get width() { return this.panelService.width; }
  get height() { return this.panelService.height; }

  private preLeft: number = 0
  private preTop: number = 0;
  private preWidth: number = 100;
  private preHeight: number = 100;

  private isFullScreen: boolean = false;

  private $draggablePanel: JQuery;
  private $scrollablePanel: JQuery;

  private callbackOnScrollablePanelMouseDown: any = null;
  private callbackOnDraggablePanelMouseDown: any = null;
  private callbackOnMouseUp: any = (e) => this.onMouseUp(e);

  constructor(
    public panelService: PanelService
  ) { }

  ngOnInit() {

  }

  ngAfterViewInit() {
    // TODO ウィンドウタイトルって下側のほうがいい？
    this.$draggablePanel = $(this.draggablePanel.nativeElement);
    this.$scrollablePanel = $(this.scrollablePanel.nativeElement);

    this.$draggablePanel.draggable({ containment: 'body', cancel: 'input,textarea,button,select,option,span', stack: '.draggable-panel', opacity: 0.7 });
    this.$draggablePanel.resizable({ handles: 'all', minHeight: 100, minWidth: 100 });

    this.callbackOnScrollablePanelMouseDown = (e) => this.onScrollablePanelMouseDown(e);
    this.callbackOnDraggablePanelMouseDown = (e) => this.onDraggablePanelMouseDown(e);

    this.scrollablePanel.nativeElement.addEventListener('mousedown', this.callbackOnScrollablePanelMouseDown, false);
    this.draggablePanel.nativeElement.addEventListener('mousedown', this.callbackOnDraggablePanelMouseDown, false);

    this.preLeft = this.left;
    this.preTop = this.top;
    this.preWidth = this.width;
    this.preHeight = this.height;

    this.panelService.scrollablePanel = this.scrollablePanel.nativeElement;

    this.setForeground();
    this.adjustPosition();
  }

  ngOnDestroy() {
    this.scrollablePanel.nativeElement.removeEventListener('mousedown', this.callbackOnScrollablePanelMouseDown, false);
    this.draggablePanel.nativeElement.removeEventListener('mousedown', this.callbackOnDraggablePanelMouseDown, false);
    this.callbackOnScrollablePanelMouseDown = null;
    this.callbackOnDraggablePanelMouseDown = null;
  }

  private adjustPosition() {
    let $panel = $(this.draggablePanel.nativeElement);

    let offsetLeft = $panel.offset().left;
    let offsetTop = $panel.offset().top;

    if (window.innerWidth < offsetLeft + $panel.outerWidth()) {
      offsetLeft -= (offsetLeft + $panel.outerWidth()) - window.innerWidth;
    }
    if (window.innerHeight < offsetTop + $panel.outerHeight()) {
      offsetTop -= (offsetTop + $panel.outerHeight()) - window.innerHeight;
    }

    if (offsetLeft < 0) {
      offsetLeft = 0;
    }
    if (offsetTop < 0) {
      offsetTop = 0;
    }

    $panel.offset({ left: offsetLeft, top: offsetTop });

    setTimeout(() => {
      this.left = offsetLeft;
      this.top = offsetTop;
    }, 0);
  }

  private onScrollablePanelMouseDown(e: MouseEvent) {
    if (e.target === this.scrollablePanel.nativeElement) {
      if (e.offsetX >= this.scrollablePanel.nativeElement.clientWidth || e.offsetY >= this.scrollablePanel.nativeElement.clientHeight) {
        console.log('scrollbar clicked');
        this.$draggablePanel.draggable('option', 'handle', '.draggable-panel');
        document.body.addEventListener('mouseup', this.callbackOnMouseUp, false);
        return;
      }
    }
    this.$draggablePanel.draggable('option', 'handle', false);
  }

  private onDraggablePanelMouseDown(e: MouseEvent) {
    console.log('onDraggablePanelMouseDown');
    this.setForeground();
  }

  private onMouseUp(e: any) {
    console.log('onMouseUp');
    this.$draggablePanel.draggable('option', 'handle', false);
    //this.$draggablePanel.draggable('option', 'handle', '.draggable-panel');
    //this.$scrollablePanel.draggable('option', 'handle', true);
    document.body.removeEventListener('mouseup', this.callbackOnMouseUp, false);
  }

  toggleFullScreen() {
    if (this.$draggablePanel.offset().left <= 0
      && this.$draggablePanel.offset().top <= 0
      && this.$draggablePanel.outerWidth() >= window.innerWidth
      && this.$draggablePanel.outerHeight() >= window.innerHeight) {
      this.isFullScreen = false;
      console.log('通常');
    } else {
      this.isFullScreen = true;
      console.log('最大化');
    }

    if (this.isFullScreen) {
      this.preLeft = this.$draggablePanel.offset().left;
      this.preTop = this.$draggablePanel.offset().top;
      this.preWidth = this.$draggablePanel.outerWidth();
      this.preHeight = this.$draggablePanel.outerHeight();

      this.left = 0;
      this.top = 0;
      this.width = window.innerWidth;
      this.height = window.innerHeight;

      this.$draggablePanel.offset({ left: this.left, top: this.top });
      this.$draggablePanel.outerWidth(this.width);
      this.$draggablePanel.outerHeight(this.height);

      console.log(this.preWidth, this.width, window.innerWidth);

    } else {
      console.log(this.preWidth);

      this.left = this.preLeft;
      this.top = this.preTop;
      this.width = this.preWidth;
      this.height = this.preHeight;
    }
  }

  private setForeground() {
    let $stacks: JQuery = $('.draggable-panel')
    let topZIndex: number = 0;
    let bottomZindex: number = 99999;
    $stacks.each(function () {
      let zIndex = parseInt($(this).css('zIndex'));
      if (topZIndex < zIndex) topZIndex = zIndex;
      if (zIndex < bottomZindex) bottomZindex = zIndex;
    });
    $stacks.each(function () {
      $(this).css('zIndex', parseInt($(this).css('zIndex')) - bottomZindex);
    });
    this.$draggablePanel.css('zIndex', topZIndex + 1);
  }

  close() {
    if (this.panelService) this.panelService.close();
  }
}

PanelService.UIPanelComponentClass = UIPanelComponent;