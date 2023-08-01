"use strict";var e,t,i=require("mitt"),r=require("tslib"),n=require("fabric"),o=require("resize-observer-polyfill"),a=require("lodash-es"),c=require("uuid"),l={TRIGGER_TOOL:"trigger_tool",CREATE_OBJ:"create_obj",DELETE_OBJ:"delete_obj",OBJECT_TYPE_IN_CANVAS_CHANGE:"object_type_in_canvas_change",UPDATE_CONTROLLER_BTN:"update_controller_btn"},u=function(){Object.assign(this,i())};exports.Controls=void 0,(e=exports.Controls||(exports.Controls={}))[e.Text=1]="Text",e[e.Circle=2]="Circle",e[e.WavyLine=3]="WavyLine",e[e.Seal=4]="Seal",e[e.Right=5]="Right",e[e.Wrong=6]="Wrong",e[e.NotCompleteRight=7]="NotCompleteRight",e[e.Zoom=8]="Zoom",e[e.Rotate=9]="Rotate",e[e.Flip=10]="Flip",e[e.Clean=11]="Clean",exports.Zoom=void 0,function(e){e[e.In=1]="In",e[e.Out=2]="Out"}(exports.Zoom||(exports.Zoom={})),exports.IconsInCanvas=void 0,(t=exports.IconsInCanvas||(exports.IconsInCanvas={}))[t.EncourageOfSeal=1]="EncourageOfSeal",t[t.ExcellentOfSeal=2]="ExcellentOfSeal",t[t.PerfectOfSeal=3]="PerfectOfSeal",t[t.UncorrectOfSeal=4]="UncorrectOfSeal",t[t.GreatOfSeal=5]="GreatOfSeal",t[t.NotCompleteRight=6]="NotCompleteRight",t[t.Right=7]="Right",t[t.Wrong=8]="Wrong";var s=i();var b=function(e){function t(t,i,r,n){void 0===n&&(n=!0);var o=e.call(this)||this;return Object.defineProperty(o,"isKeep",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(o,"canvas",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(o,"isOn",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(o,"triggerParams",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(o,"_type",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(o,"correctId",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),o.correctId=t,o._type=i,o.canvas=r,o.isKeep=n,s.on("".concat(o.correctId,":").concat(l.TRIGGER_TOOL),o.trigger.bind(o)),o}return r.__extends(t,e),Object.defineProperty(t.prototype,"trigger",{enumerable:!1,configurable:!0,writable:!0,value:function(e){e.actionType===this._type?(this.triggerParams=e.params,this._handleOn()):![exports.Controls.Seal,exports.Controls.Zoom,exports.Controls.Rotate,exports.Controls.Clean].includes(e.actionType)&&this._handleOff()}}),Object.defineProperty(t.prototype,"_handleOn",{enumerable:!1,configurable:!0,writable:!0,value:function(){this.isOn=!0}}),Object.defineProperty(t.prototype,"_handleOff",{enumerable:!1,configurable:!0,writable:!0,value:function(){this.isOn=!1}}),Object.defineProperty(t.prototype,"addListener",{enumerable:!1,configurable:!0,writable:!0,value:function(e){var t=this;e.on("added",(function(){s.emit("".concat(t.correctId,":").concat(l.CREATE_OBJ))})),e.on("removed",(function(){s.emit("".concat(t.correctId,":").concat(l.DELETE_OBJ))}))}}),Object.defineProperty(t.prototype,"destroy",{enumerable:!1,configurable:!0,writable:!0,value:function(){s.off("".concat(this.correctId,":").concat(l.TRIGGER_TOOL),this.trigger)}}),Object.defineProperty(t.prototype,"reset",{enumerable:!1,configurable:!0,writable:!0,value:function(){}}),t}(u),g={opacity:.5,fill:"transparent",stroke:"rgb(255, 0, 0)",strokeWidth:2},d=function(e){function t(t,i,n,o){var a=e.call(this,t,i,n)||this;return Object.defineProperty(a,"_config",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(a,"_curEllipse",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(a,"_downPointer",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),a._config=r.__assign(r.__assign({},g),o),a}return r.__extends(t,e),Object.defineProperty(t.prototype,"_create",{enumerable:!1,configurable:!0,writable:!0,value:function(e){var t=new n.fabric.Ellipse(r.__assign(r.__assign({},this._config),e));return t.__actionType=this._type,this.addListener(t),this.canvas.add(t),t}}),Object.defineProperty(t.prototype,"mousedown",{enumerable:!1,configurable:!0,writable:!0,value:function(e){this.isOn&&(this._downPointer=e,this._curEllipse=this._create({top:e.y,left:e.x}),this.canvas.selection=!1,this.canvas.skipTargetFind=!0)}}),Object.defineProperty(t.prototype,"mousemove",{enumerable:!1,configurable:!0,writable:!0,value:function(e){if(this.isOn&&this._curEllipse){var t=Math.abs(this._downPointer.x-e.x)/2,i=Math.abs(this._downPointer.y-e.y)/2;this._curEllipse.set({rx:t,ry:i,top:e.y>this._downPointer.y?this._downPointer.y:this._downPointer.y-2*i,left:e.x>this._downPointer.x?this._downPointer.x:this._downPointer.x-2*t}),this.canvas.requestRenderAll()}}}),Object.defineProperty(t.prototype,"mouseup",{enumerable:!1,configurable:!0,writable:!0,value:function(e){this.isOn&&this._curEllipse&&(JSON.stringify(this._downPointer)===JSON.stringify(e)?this.canvas.remove(this._curEllipse):(this._curEllipse.set("opacity",1),this.canvas.setActiveObject(this._curEllipse)),this.canvas.selection=!0,this.canvas.skipTargetFind=!1,this.canvas.requestRenderAll(),this._curEllipse=null)}}),Object.defineProperty(t.prototype,"reset",{enumerable:!1,configurable:!0,writable:!0,value:function(){}}),t}(b);function f(e){return new Promise((function(t,i){n.fabric.Image.fromURL(e,(function(e,r){r?i(r):t(e)}),{crossOrigin:"anonymous"})}))}var h={};var p=function(e){function t(t,i,r,n){var o=e.call(this,t,i,r,!1)||this;return Object.defineProperty(o,"_config",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),o._config=n,o}return r.__extends(t,e),Object.defineProperty(t.prototype,"_handleOn",{enumerable:!1,configurable:!0,writable:!0,value:function(){this._createImage()}}),Object.defineProperty(t.prototype,"_createImage",{enumerable:!1,configurable:!0,writable:!0,value:function(){h[this.triggerParams.insertIconType].clone(this._onClone.bind(this))}}),Object.defineProperty(t.prototype,"_onClone",{enumerable:!1,configurable:!0,writable:!0,value:function(e){var t=.6;e.set({top:40+e.height*t/2,left:this.canvas.canvasOriginalWidth-40-e.width*t/2,originX:"center",originY:"center",scaleX:t,scaleY:t,angle:-15}),e.setControlsVisibility({mb:!1,mt:!1,mr:!1,ml:!1}),e.__actionType=this._type,this.addListener(e),this.canvas.add(e)}}),Object.defineProperty(t.prototype,"reset",{enumerable:!1,configurable:!0,writable:!0,value:function(){}}),t}(b),_=function(e){function t(t,i,r,n){var o=e.call(this,t,i,r)||this;return Object.defineProperty(o,"_config",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(o,"_curText",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),o._config=n,o}return r.__extends(t,e),Object.defineProperty(t.prototype,"_create",{enumerable:!1,configurable:!0,writable:!0,value:function(e){var t=new n.fabric.IText("",r.__assign(r.__assign({editable:!0,fontSize:16,originY:"center",fill:"red",padding:10,hiddenTextareaContainer:this.canvas.isFullscreen?this.canvas.wrapperEl.parentNode:null},e),this._config));t.__actionType=this._type,this.addListener(t),this.canvas.add(t),this.canvas.setActiveObject(t),t.enterEditing(),this._curText=t}}),Object.defineProperty(t.prototype,"_handleOff",{enumerable:!1,configurable:!0,writable:!0,value:function(){e.prototype._handleOff.call(this),this._curText&&this._removeEmptyText(),this._curText=null}}),Object.defineProperty(t.prototype,"mousedown",{enumerable:!1,configurable:!0,writable:!0,value:function(e){this.isOn&&(this._curText?(this._removeEmptyText(),this._curText=null):this._create({top:e.y,left:e.x}))}}),Object.defineProperty(t.prototype,"_removeEmptyText",{enumerable:!1,configurable:!0,writable:!0,value:function(){this._curText&&0===this._curText.text.length&&this.canvas.remove(this._curText)}}),Object.defineProperty(t.prototype,"reset",{enumerable:!1,configurable:!0,writable:!0,value:function(){}}),t}(b),y={rang:4,strokeWidth:2,minPeriod:20},v=function(e){function t(t,i,n,o){var a=e.call(this,t,i,n)||this;return Object.defineProperty(a,"_config",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(a,"_curLine",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(a,"_downPointer",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),a._config=r.__assign(r.__assign({},y),o),a}return r.__extends(t,e),Object.defineProperty(t.prototype,"mousedown",{enumerable:!1,configurable:!0,writable:!0,value:function(e){this.isOn&&(this._downPointer=e,this.canvas.selection=!1,this.canvas.skipTargetFind=!0)}}),Object.defineProperty(t.prototype,"mousemove",{enumerable:!1,configurable:!0,writable:!0,value:function(e){this.isOn&&this._downPointer&&(this._downPointer.eq(e)||(this._curLine&&this.canvas.remove(this._curLine),this._draw(e),this.canvas.requestRenderAll()))}}),Object.defineProperty(t.prototype,"mouseup",{enumerable:!1,configurable:!0,writable:!0,value:function(e){this.isOn&&this._downPointer&&(this._downPointer.eq(e)?this._curLine&&this.canvas.remove(this._curLine):(this._curLine.set("opacity",1),this.canvas.setActiveObject(this._curLine)),this.canvas.selection=!0,this.canvas.skipTargetFind=!1,this.canvas.requestRenderAll(),this._curLine=null,this._downPointer=null)}}),Object.defineProperty(t.prototype,"_draw",{enumerable:!1,configurable:!0,writable:!0,value:function(e){for(var t=this._caculatePeriodAndNumByDistance(this._downPointer,e),i=t.period,r=t.num,o="M ".concat(this._downPointer.x," ").concat(this._downPointer.y),a=0;a<r;a++){var c=this._downPointer.x+a*i;o+=0==a?" C ".concat(c+i/8," ").concat(this._downPointer.y+this._config.rang,", ").concat(c+3*i/8," ").concat(this._downPointer.y+this._config.rang,", ").concat(c+i/2," ").concat(this._downPointer.y):" S ".concat(c+3*i/8," ").concat(this._downPointer.y+this._config.rang,", ").concat(c+i/2," ").concat(this._downPointer.y),o+=" S ".concat(c+7*i/8," ").concat(this._downPointer.y-this._config.rang,", ").concat(c+i," ").concat(this._downPointer.y)}var l=new n.fabric.Point(this._downPointer.x+10,this._downPointer.y),u=n.fabric.util.getBisector(this._downPointer,l,e).angle,s=n.fabric.util.radiansToDegrees(u);this._curLine=this._create(o,this._downPointer.y<e.y?s:-s)}}),Object.defineProperty(t.prototype,"_caculatePeriodAndNumByDistance",{enumerable:!1,configurable:!0,writable:!0,value:function(e,t){var i=e.distanceFrom(t),r=this._config.minPeriod,n=Math.floor(i/r);return i%this._config.minPeriod!=0&&(r=i/++n),{period:r,num:n}}}),Object.defineProperty(t.prototype,"_create",{enumerable:!1,configurable:!0,writable:!0,value:function(e,t){var i=new n.fabric.Path(e,{fill:"transparent",stroke:"red",originX:"left",originY:"center",strokeWidth:this._config.strokeWidth,angle:t});return i.__actionType=this._type,this.addListener(i),this.canvas.add(i),i}}),Object.defineProperty(t.prototype,"reset",{enumerable:!1,configurable:!0,writable:!0,value:function(){}}),t}(b),m=function(e){function t(t,i,r){var n=e.call(this,t,i,r)||this;return Object.defineProperty(n,"_loadedIcon",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),n}return r.__extends(t,e),Object.defineProperty(t.prototype,"_onClone",{enumerable:!1,configurable:!0,writable:!0,value:function(e,t){t.set({top:e.y,left:e.x,originX:"center",originY:"center"}),t.__actionType=this._type,this.addListener(t),this.canvas.add(t)}}),Object.defineProperty(t.prototype,"mousedown",{enumerable:!1,configurable:!0,writable:!0,value:function(e){this._loadedIcon.clone(this._onClone.bind(this,e))}}),Object.defineProperty(t.prototype,"destroy",{enumerable:!1,configurable:!0,writable:!0,value:function(){this._loadedIcon=null}}),t}(b),O=function(e){function t(t,i,r,n){var o=e.call(this,t,i,r)||this;return Object.defineProperty(o,"_config",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),o._config=n,o._loadedIcon=h[exports.IconsInCanvas.NotCompleteRight],o}return r.__extends(t,e),Object.defineProperty(t.prototype,"reset",{enumerable:!1,configurable:!0,writable:!0,value:function(){}}),t}(m),j=function(e){function t(t,i,r,n){var o=e.call(this,t,i,r)||this;return Object.defineProperty(o,"_config",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),o._config=n,o._loadedIcon=h[exports.IconsInCanvas.Right],o}return r.__extends(t,e),Object.defineProperty(t.prototype,"reset",{enumerable:!1,configurable:!0,writable:!0,value:function(){}}),t}(m),I=function(e){function t(t,i,r,n){var o=e.call(this,t,i,r)||this;return Object.defineProperty(o,"_config",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),o._config=n,o._loadedIcon=h[exports.IconsInCanvas.Wrong],o}return r.__extends(t,e),Object.defineProperty(t.prototype,"reset",{enumerable:!1,configurable:!0,writable:!0,value:function(){}}),t}(m),w=function(e){function t(t,i,r,n){var o=e.call(this,t,i,r,!1)||this;return Object.defineProperty(o,"_config",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(o,"OUT_MAX",{enumerable:!0,configurable:!0,writable:!0,value:1}),Object.defineProperty(o,"ZOOM_STEP",{enumerable:!0,configurable:!0,writable:!0,value:.1}),o._config=n,o}return r.__extends(t,e),Object.defineProperty(t.prototype,"_handleOn",{enumerable:!1,configurable:!0,writable:!0,value:function(){switch(this.triggerParams.type){case exports.Zoom.In:this._zoomIn();break;case exports.Zoom.Out:this._zoomOut()}}}),Object.defineProperty(t.prototype,"_zoomIn",{enumerable:!1,configurable:!0,writable:!0,value:function(){var e=this.canvas.getZoom();this.canvas.setZoom(e+this.ZOOM_STEP)}}),Object.defineProperty(t.prototype,"_zoomOut",{enumerable:!1,configurable:!0,writable:!0,value:function(){var e=this.canvas.getZoom();e-this.ZOOM_STEP>=this.OUT_MAX&&this.canvas.setZoom(e-this.ZOOM_STEP)}}),Object.defineProperty(t.prototype,"reset",{enumerable:!1,configurable:!0,writable:!0,value:function(){}}),t}(b),M=function(e){function t(t,i,r,n){var o=e.call(this,t,i,r,!1)||this;return Object.defineProperty(o,"_config",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(o,"ROTATE_STEP",{enumerable:!0,configurable:!0,writable:!0,value:90}),Object.defineProperty(o,"_curRotate",{enumerable:!0,configurable:!0,writable:!0,value:0}),o._config=n,o}return r.__extends(t,e),Object.defineProperty(t.prototype,"_handleOn",{enumerable:!1,configurable:!0,writable:!0,value:function(){this._rotate()}}),Object.defineProperty(t.prototype,"_rotate",{enumerable:!1,configurable:!0,writable:!0,value:function(){this._curRotate=this._curRotate+this.ROTATE_STEP===360?0:this._curRotate+this.ROTATE_STEP,this.canvas.updateBackgroundImageRotate(this._curRotate)}}),Object.defineProperty(t.prototype,"reset",{enumerable:!1,configurable:!0,writable:!0,value:function(){}}),t}(b),T=function(e){function t(t,i,r,n){var o=e.call(this,t,i,r,!1)||this;return Object.defineProperty(o,"_config",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),o._config=n,o}return r.__extends(t,e),Object.defineProperty(t.prototype,"_handleOn",{enumerable:!1,configurable:!0,writable:!0,value:function(){this._Flip()}}),Object.defineProperty(t.prototype,"_Flip",{enumerable:!1,configurable:!0,writable:!0,value:function(){this.canvas.updateBackgroundImageFlip()}}),Object.defineProperty(t.prototype,"reset",{enumerable:!1,configurable:!0,writable:!0,value:function(){}}),t}(b),P=function(){function e(e,t){Object.defineProperty(this,"_curActionType",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"_curTool",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"_tools",{enumerable:!0,configurable:!0,writable:!0,value:{}}),Object.defineProperty(this,"_objs",{enumerable:!0,configurable:!0,writable:!0,value:[]}),Object.defineProperty(this,"_canvas",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"_correctId",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),this._canvas=t,this._correctId=e}return Object.defineProperty(e.prototype,"_handleActionTypeChange",{enumerable:!1,configurable:!0,writable:!0,value:function(e){var t,i=e.actionType;switch(i){case exports.Controls.Text:t=this._curTool=this._createTool(i,_);break;case exports.Controls.Circle:t=this._curTool=this._createTool(i,d);break;case exports.Controls.WavyLine:t=this._curTool=this._createTool(i,v);break;case exports.Controls.Seal:t=this._createTool(i,p);break;case exports.Controls.Right:t=this._curTool=this._createTool(i,j);break;case exports.Controls.Wrong:t=this._curTool=this._createTool(i,I);break;case exports.Controls.NotCompleteRight:t=this._curTool=this._createTool(i,O);break;case exports.Controls.Zoom:t=this._createTool(i,w);break;case exports.Controls.Rotate:t=this._createTool(i,M);break;case exports.Controls.Flip:t=this._createTool(i,T);break;case exports.Controls.Clean:this._clear()}t&&s.emit("".concat(this._correctId,":").concat(l.TRIGGER_TOOL),r.__assign(r.__assign({},e),{isKeep:t.isKeep}))}}),Object.defineProperty(e.prototype,"_createTool",{enumerable:!1,configurable:!0,writable:!0,value:function(e,t){var i=this._tools[e];return i||(i=this._tools[e]=new t(this._correctId,e,this._canvas)),i}}),Object.defineProperty(e.prototype,"_clear",{enumerable:!1,configurable:!0,writable:!0,value:function(){var e,t=this._canvas.getObjects();(e=this._canvas).remove.apply(e,t)}}),Object.defineProperty(e.prototype,"destroy",{enumerable:!1,configurable:!0,writable:!0,value:function(){Object.values(this._tools).forEach((function(e){e.destroy()}))}}),Object.defineProperty(e.prototype,"setCurActionType",{enumerable:!1,configurable:!0,writable:!0,value:function(e){null!==e&&null!=e?e.isKeep?(this._curActionType!==e.actionType&&this._handleActionTypeChange(e),this._curActionType=e.actionType):this._handleActionTypeChange(e):this._curActionType=null}}),Object.defineProperty(e.prototype,"curActionType",{get:function(){return this._curActionType},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"curTool",{get:function(){return this._curTool},enumerable:!1,configurable:!0}),e}();function C(e){return C="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},C(e)}var x=function(e){function t(t,i,r,n){var c=e.call(this,t,i)||this;Object.defineProperty(c,"_bgImageUrl",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(c,"_container",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(c,"_loadedBgImage",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(c,"_canvasOriginalWidth",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(c,"_canvasOriginalHeight",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(c,"_originalContainerWidth",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(c,"_originalContainerHeight",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(c,"_currentContainerWidth",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(c,"_currentContainerHeight",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(c,"minZoomValue",{enumerable:!0,configurable:!0,writable:!0,value:1}),Object.defineProperty(c,"_bgImageRotate",{enumerable:!0,configurable:!0,writable:!0,value:0}),Object.defineProperty(c,"_filpX",{enumerable:!0,configurable:!0,writable:!0,value:!1}),Object.defineProperty(c,"_filpY",{enumerable:!0,configurable:!0,writable:!0,value:!1}),Object.defineProperty(c,"_correctId",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(c,"_isFullscreen",{enumerable:!0,configurable:!0,writable:!0,value:!1}),Object.defineProperty(c,"_resizeObserver",{enumerable:!0,configurable:!0,writable:!0,value:void 0});var l=n.container,u=n.originalContainerWidth,s=n.originalContainerHeight;c._bgImageUrl=n.imageUrl,c._container=l,c._correctId=r,c._originalContainerWidth=c._currentContainerWidth=u,c._originalContainerHeight=c._currentContainerHeight=s;var b=a.debounce(c._onContainerResize.bind(c),100);return c._resizeObserver||(c._resizeObserver=new o((function(e,t){for(var i=0,r=e;i<r.length;i++){var n=r[i],o=n.borderBoxSize,a=n.contentBoxSize,l=n.contentRect,u=(null==o?void 0:o.length)>0?o[0]:(null==a?void 0:a.length)>0?a[0]:0,s=u.inlineSize,g=u.blockSize,d=void 0===s?l.width:s,f=void 0===g?l.height:g;c._currentContainerWidth===d&&c._currentContainerHeight===f||b(d,f)}}))),t.parentNode&&(t.parentNode.style.margin="auto 0"),c._initialize().then((function(){var e;null===(e=c._resizeObserver)||void 0===e||e.observe(c._container)})),c}return r.__extends(t,e),Object.defineProperty(t.prototype,"_initialize",{enumerable:!1,configurable:!0,writable:!0,value:function(){return r.__awaiter(this,void 0,void 0,(function(){var e,t;return r.__generator(this,(function(i){switch(i.label){case 0:return this.selection=!1,e=this._createLoadingEle(),t=this,[4,f(this._bgImageUrl)];case 1:return t._loadedBgImage=i.sent(),this.backgroundImage=this._loadedBgImage,this._container.removeChild(e),this._initializeOriginalCanvasSize(),this._update(),[2]}}))}))}}),Object.defineProperty(t.prototype,"_createLoadingEle",{enumerable:!1,configurable:!0,writable:!0,value:function(){var e=document.createElement("img");return e.src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA4MCAyMCI+CiAgPGNpcmNsZSBjeD0iMTAiIGN5PSIxMCIgcj0iOCIgc3Ryb2tlPSIjMzI2MkZEIiBzdHJva2Utd2lkdGg9IjIiIGZpbGw9Im5vbmUiIHN0cm9rZS1kYXNoYXJyYXk9IjI2IDE0Ij4KICAgIDxhbmltYXRlVHJhbnNmb3JtIGF0dHJpYnV0ZU5hbWU9InRyYW5zZm9ybSIgYXR0cmlidXRlVHlwZT0iWE1MIiB0eXBlPSJyb3RhdGUiIGR1cj0iMXMiIGZyb209IjAgMTAgMTAiIHRvPSIzNjAgMTAgMTAiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiAvPgogIDwvY2lyY2xlPgogIDx0ZXh0IHg9IjI1IiB5PSIxMCIgZHk9Ii40ZW0iIHRleHQtYW5jaG9yPSJzdGFydCIgZm9udC1zaXplPSIxNnB4IiBmb250LXdlaWdodD0nYm9sZCc+5Yqg6L295LitPC90ZXh0Pgo8L3N2Zz4K",e.width=120,e.height=20,e.style.cssText="position: absolute;top: 50%;left: 50%;margin-left: -60px;margin-top: -10px;",this._container.appendChild(e),e}}),Object.defineProperty(t.prototype,"_initializeOriginalCanvasSize",{enumerable:!1,configurable:!0,writable:!0,value:function(){var e=this._calculateImageSizeByRotate(),t=e.width,i=e.height,r=this._calculateCanvasSizeByImageRate(t/i,this._originalContainerWidth,this._originalContainerHeight),n=r.width,o=r.height;this._canvasOriginalWidth=n,this._canvasOriginalHeight=o;var a=this._calculateCanvasSizeByImageRate(t/i).width;this.minZoomValue=a>n?a/this._canvasOriginalWidth:1}}),Object.defineProperty(t.prototype,"_onContainerResize",{enumerable:!1,configurable:!0,writable:!0,value:function(e,t){this._currentContainerWidth=e,this._currentContainerHeight=t;var i=this.getWidth(),r=this.getHeight(),n=this.getZoom()-this.minZoomValue,o=this._calculateCanvasSizeByImageRate(i/r).width;this.minZoomValue=o>this._canvasOriginalWidth?o/this._canvasOriginalWidth:1,this.setZoom(this.minZoomValue+n)}}),Object.defineProperty(t.prototype,"updateBackgroundImageRotate",{enumerable:!1,configurable:!0,writable:!0,value:function(e){return void 0===e&&(e=0),r.__awaiter(this,void 0,void 0,(function(){var t=this;return r.__generator(this,(function(i){return this._bgImageRotate=e,this._loadedBgImage.set({angle:e}),this._initializeOriginalCanvasSize(),this.getZoom()!=this.minZoomValue&&this.setZoom(this.minZoomValue),setTimeout((function(){t._update()}),0),[2]}))}))}}),Object.defineProperty(t.prototype,"updateBackgroundImageFlip",{enumerable:!1,configurable:!0,writable:!0,value:function(){return r.__awaiter(this,void 0,void 0,(function(){var e,t,i=this;return r.__generator(this,(function(r){return 90===this._bgImageRotate||270===this._bgImageRotate?(e="object"===C(this.backgroundImage)&&!!this.backgroundImage.flipY,this._filpY=!e):(t="object"===C(this.backgroundImage)&&!!this.backgroundImage.flipX,this._filpX=!t),setTimeout((function(){i._update()}),0),[2]}))}))}}),Object.defineProperty(t.prototype,"updateBackgroundImage",{enumerable:!1,configurable:!0,writable:!0,value:function(e){return r.__awaiter(this,void 0,void 0,(function(){var t;return r.__generator(this,(function(i){switch(i.label){case 0:return this._bgImageUrl=e,t=this,[4,f(this._bgImageUrl)];case 1:return t._loadedBgImage=i.sent(),this.backgroundImage=this._loadedBgImage,this._update(),[2]}}))}))}}),Object.defineProperty(t.prototype,"_update",{enumerable:!1,configurable:!0,writable:!0,value:function(){var e=this.getZoom(),t=this._calculateImageSizeByRotate(),i=t.width,r=t.height,n=this._calculateCanvasSizeByImageRate(i/r),o=n.height;this.setWidth(n.width+(e-this.minZoomValue)*this._canvasOriginalWidth),this.setHeight(o+(e-this.minZoomValue)*this._canvasOriginalHeight),this._loadedBgImage.set({top:this._canvasOriginalHeight/2,left:this._canvasOriginalWidth/2,scaleX:this._canvasOriginalWidth/i,scaleY:this._canvasOriginalHeight/r,originX:"center",originY:"center",flipX:this._filpX,flipY:this._filpY})}}),Object.defineProperty(t.prototype,"_calculateImageSizeByRotate",{enumerable:!1,configurable:!0,writable:!0,value:function(){var e=this._loadedBgImage.width,t=this._loadedBgImage.height;if(this._bgImageRotate/90%2!=0){var i=e;e=t,t=i}return{width:e,height:t}}}),Object.defineProperty(t.prototype,"_calculateCanvasSizeByImageRate",{enumerable:!1,configurable:!0,writable:!0,value:function(e,t,i){var r,n,o=t||this._currentContainerWidth,a=i||this._currentContainerHeight;return e>o/a?(n=o,r=o/e):(r=a,n=e*a),{width:n,height:r}}}),Object.defineProperty(t.prototype,"generateImage",{enumerable:!1,configurable:!0,writable:!0,value:function(){if(0===this.getObjects().length)return null;for(var e=this.getWidth(),t=this.getHeight(),i=this.toDataURL({format:"jpeg",left:0,top:0,width:e,height:t,multiplier:e>1e3?1:2}).split(","),r=i[0].match(/:(.*?);/)[1],n=atob(i[1]),o=n.length,a=new Uint8Array(o);o--;)a[o]=n.charCodeAt(o);return new File([a],this._correctId,{type:r})}}),Object.defineProperty(t.prototype,"setZoom",{enumerable:!1,configurable:!0,writable:!0,value:function(t){return e.prototype.setZoom.call(this,t<this.minZoomValue?this.minZoomValue:t),this._update(),this}}),Object.defineProperty(t.prototype,"resetFilpRotate",{enumerable:!1,configurable:!0,writable:!0,value:function(){var e=this;this._filpY=!1,this._filpX=!1,this._bgImageRotate=0,setTimeout((function(){e._update()}),0)}}),Object.defineProperty(t.prototype,"destroy",{enumerable:!1,configurable:!0,writable:!0,value:function(){this._resizeObserver.unobserve(this._container),this._resizeObserver=null}}),Object.defineProperty(t.prototype,"bgImageUrl",{get:function(){return this._bgImageUrl},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"canvasOriginalWidth",{get:function(){return this._canvasOriginalWidth},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"canvasOriginalHeight",{get:function(){return this._canvasOriginalHeight},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"originalContainerWidth",{get:function(){return this._originalContainerWidth},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"originalContainerHeight",{get:function(){return this._originalContainerHeight},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"isFullscreen",{get:function(){return this._isFullscreen},set:function(e){this._isFullscreen=e},enumerable:!1,configurable:!0}),t}(n.fabric.Canvas);n.fabric.Object.prototype.transparentCorners=!1,n.fabric.Object.prototype.cornerColor="white",n.fabric.Object.prototype.borderColor="white",n.fabric.Object.prototype.borderScaleFactor=2;var N=document.createElement("img");N.src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHZpZXdCb3g9IjAgMCA1MCA1MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3QgeD0iMC4xNjQwNjIiIHk9IjAuMzA1NjY0IiB3aWR0aD0iNDkuMzg4IiBoZWlnaHQ9IjQ5LjM4OCIgcng9IjI0LjY5NCIgZmlsbD0id2hpdGUiLz4KPGcgb3BhY2l0eT0iMC42NSI+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMjAuNDQ3MSAxOS45OTg1QzE5LjcxMDggMTkuOTk4NSAxOS4yMjcgMTkuMjI5NyAxOS41NDU2IDE4LjU2NThMMjAuOTg1NiAxNS41NjU5QzIxLjE1MiAxNS4yMTkyIDIxLjUwMjUgMTQuOTk4NiAyMS44ODcxIDE0Ljk5ODZIMjcuODI4NUMyOC4yMTMxIDE0Ljk5ODYgMjguNTYzNiAxNS4yMTkyIDI4LjczIDE1LjU2NTlMMzAuMTcgMTguNTY1OEMzMC40ODg2IDE5LjIyOTcgMzAuMDA0OCAxOS45OTg1IDI5LjI2ODUgMTkuOTk4NUgyMC40NDcxWk0yMy4yNTkyIDE3Ljk5ODZDMjIuNjYwMiAxNy45OTg2IDIyLjMwMjkgMTcuMzMxIDIyLjYzNTIgMTYuODMyNkMyMi43NzQzIDE2LjYyMzkgMjMuMDA4NCAxNi40OTg2IDIzLjI1OTIgMTYuNDk4NkgyNi40NTY0QzI2LjcwNzEgMTYuNDk4NiAyNi45NDEzIDE2LjYyMzkgMjcuMDgwNCAxNi44MzI2QzI3LjQxMjcgMTcuMzMxIDI3LjA1NTQgMTcuOTk4NiAyNi40NTY0IDE3Ljk5ODZIMjMuMjU5MloiIGZpbGw9IiM3MDc4OEMiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xNy4zNTg0IDMxLjk5NzhDMTcuMzU4NCAzMy42NTQ2IDE4LjcwMTUgMzQuOTk3NyAyMC4zNTgzIDM0Ljk5NzdIMjkuMzU4MUMzMS4wMTUgMzQuOTk3NyAzMi4zNTgxIDMzLjY1NDYgMzIuMzU4MSAzMS45OTc4VjE3Ljk5OEgxNy4zNTg0VjMxLjk5NzhaTTIxLjg1ODQgMjMuOTk4MUMyMS44NTg0IDIzLjQ0NTggMjIuMzA2MSAyMi45OTgxIDIyLjg1ODQgMjIuOTk4MUMyMy40MTA3IDIyLjk5ODEgMjMuODU4NCAyMy40NDU4IDIzLjg1ODQgMjMuOTk4MVYyOC45OThDMjMuODU4NCAyOS41NTAzIDIzLjQxMDcgMjkuOTk4IDIyLjg1ODQgMjkuOTk4QzIyLjMwNjEgMjkuOTk4IDIxLjg1ODQgMjkuNTUwMyAyMS44NTg0IDI4Ljk5OFYyMy45OTgxWk0yNi44NTgxIDIyLjk5ODRDMjYuMzA1OCAyMi45OTg0IDI1Ljg1ODEgMjMuNDQ2MSAyNS44NTgxIDIzLjk5ODNWMjguOTk4MkMyNS44NTgxIDI5LjU1MDUgMjYuMzA1OCAyOS45OTgyIDI2Ljg1ODEgMjkuOTk4MkMyNy40MTA0IDI5Ljk5ODIgMjcuODU4MSAyOS41NTA1IDI3Ljg1ODEgMjguOTk4MlYyMy45OTgzQzI3Ljg1ODEgMjMuNDQ2MSAyNy40MTA0IDIyLjk5ODQgMjYuODU4MSAyMi45OTg0WiIgZmlsbD0iIzcwNzg4QyIvPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTM0LjM1NzUgMTguOTk4QzM0LjM1NzUgMTkuNTUwMyAzMy45MDk4IDE5Ljk5OCAzMy4zNTc1IDE5Ljk5OEgxNi4zNTc5QzE1LjgwNTYgMTkuOTk4IDE1LjM1NzkgMTkuNTUwMyAxNS4zNTc5IDE4Ljk5OEMxNS4zNTc5IDE4LjQ0NTggMTUuODA1NiAxNy45OTggMTYuMzU3OSAxNy45OThIMzMuMzU3NUMzMy45MDk4IDE3Ljk5OCAzNC4zNTc1IDE4LjQ0NTggMzQuMzU3NSAxOC45OThaIiBmaWxsPSIjNzA3ODhDIi8+CjwvZz4KPC9zdmc+Cg==";var D=new n.fabric.Control({x:.5,y:-.5,cursorStyle:"pointer",mouseUpHandler:function(e,t,i,r){var n=t.target,o=n.canvas;o.remove(n),o.requestRenderAll()},render:function(e,t,i,r,o){var a=this.cornerSize;e.save(),e.translate(t,i),e.rotate(n.fabric.util.degreesToRadians(o.angle)),e.drawImage(N,-a/2,-a/2,a,a),e.restore()},cornerSize:24});n.fabric.Object.prototype.controls.deleteControl=D,n.fabric.Textbox.prototype.controls.deleteControl=D;var z=function(e){function t(t){var i=e.call(this)||this;return Object.defineProperty(i,"canvas",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(i,"_container",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(i,"_toolManager",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(i,"_correctId",{enumerable:!0,configurable:!0,writable:!0,value:c.v4()}),Object.defineProperty(i,"_isDisabled",{enumerable:!0,configurable:!0,writable:!0,value:!1}),Object.defineProperty(i,"_addedObjects",{enumerable:!0,configurable:!0,writable:!0,value:[]}),i._container=t.container,i._initializeCanvas(t),i._addCanvasEventListener(),i._addObjectListener(),i._toolManager=new P(i._correctId,i.canvas),i}return r.__extends(t,e),Object.defineProperty(t.prototype,"_initializeCanvas",{enumerable:!1,configurable:!0,writable:!0,value:function(e){var t=this._createCanvasEle(this._container);this.canvas=new x(t,{preserveObjectStacking:!0,isDrawingMode:!1,backgroundColor:"#f2f7fe"},this._correctId,e)}}),Object.defineProperty(t.prototype,"_addObjectListener",{enumerable:!1,configurable:!0,writable:!0,value:function(){s.on("".concat(this._correctId,":").concat(l.CREATE_OBJ),this._onObjectsChange.bind(this,"create")),s.on("".concat(this._correctId,":").concat(l.DELETE_OBJ),this._onObjectsChange.bind(this,"delete"))}}),Object.defineProperty(t.prototype,"_onObjectsChange",{enumerable:!1,configurable:!0,writable:!0,value:function(e){this.emit("create"===e?l.CREATE_OBJ:l.DELETE_OBJ)}}),Object.defineProperty(t.prototype,"_addCanvasEventListener",{enumerable:!1,configurable:!0,writable:!0,value:function(){this.canvas.on("mouse:down",this._onMouseDown.bind(this)),this.canvas.on("mouse:move",this._onMouseMove.bind(this)),this.canvas.on("mouse:up",this._onMouseUp.bind(this))}}),Object.defineProperty(t.prototype,"_onMouseDown",{enumerable:!1,configurable:!0,writable:!0,value:function(e){var t;this._isDisabled||e.target||null===(t=this._toolManager.curTool)||void 0===t||t.mousedown(e.absolutePointer)}}),Object.defineProperty(t.prototype,"_onMouseMove",{enumerable:!1,configurable:!0,writable:!0,value:function(e){var t,i;this._isDisabled||null===(i=null===(t=this._toolManager.curTool)||void 0===t?void 0:t.mousemove)||void 0===i||i.call(t,e.absolutePointer)}}),Object.defineProperty(t.prototype,"_onMouseUp",{enumerable:!1,configurable:!0,writable:!0,value:function(e){var t,i;this._isDisabled||null===(i=null===(t=this._toolManager.curTool)||void 0===t?void 0:t.mouseup)||void 0===i||i.call(t,e.absolutePointer)}}),Object.defineProperty(t.prototype,"_createCanvasEle",{enumerable:!1,configurable:!0,writable:!0,value:function(e){var t=document.createElement("canvas"),i=document.createElement("div");return i.style.cssText="overflow: auto;width: 100%;height: 100%;display: flex;justify-content: center;",i.appendChild(t),e.appendChild(i),t}}),Object.defineProperty(t.prototype,"fullscreen",{enumerable:!1,configurable:!0,writable:!0,value:function(e){this.canvas.isFullscreen=e}}),Object.defineProperty(t.prototype,"disable",{enumerable:!1,configurable:!0,writable:!0,value:function(e){this._isDisabled=e,this.canvas.skipTargetFind=e,this.canvas.setZoom(1),this.canvas.discardActiveObject().renderAll()}}),Object.defineProperty(t.prototype,"reset",{enumerable:!1,configurable:!0,writable:!0,value:function(){var e;this._addedObjects=[],this.canvas.resetFilpRotate(),this.canvas.discardActiveObject().renderAll(),(e=this.canvas).remove.apply(e,this.canvas.getObjects())}}),Object.defineProperty(t.prototype,"destroy",{enumerable:!1,configurable:!0,writable:!0,value:function(){var e;this.canvas.off("mouse:down",this._onMouseDown),this.canvas.off("mouse:move",this._onMouseMove),this.canvas.off("mouse:up",this._onMouseUp),s.off("".concat(this._correctId,":").concat(l.CREATE_OBJ),this._onObjectsChange),s.off("".concat(this._correctId,":").concat(l.DELETE_OBJ),this._onObjectsChange),null===(e=this._toolManager)||void 0===e||e.destroy(),this.canvas.destroy()}}),Object.defineProperty(t.prototype,"isEdited",{get:function(){return this._addedObjects.length>0},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"setCurActionTypeInfo",{enumerable:!1,configurable:!0,writable:!0,value:function(e){this._toolManager.setCurActionType(e)}}),Object.defineProperty(t.prototype,"curActionType",{get:function(){return this._toolManager.curActionType},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"correctId",{get:function(){return this._correctId},enumerable:!1,configurable:!0}),Object.defineProperty(t,"VERSION",{enumerable:!0,configurable:!0,writable:!0,value:"1.1.14"}),t}(u);exports.CorrectTool=z,exports.DefinedEvents=l,exports.EventEmitter=u,exports.iconsLoaded=h,exports.loadImage=f,exports.preloadIcon=function(e){return r.__awaiter(this,void 0,void 0,(function(){var t,i,n,o,a,c;return r.__generator(this,(function(r){for(t=[],i=Object.entries(e),n=function(e,i){h[e]||t.push(f(i).then((function(t){h[e]=t})).catch((function(e){throw new Error(e)})))},o=0,a=i;o<a.length;o++)n((c=a[o])[0],c[1]);return 0===t.length?[2,Promise.resolve({success:!0})]:[2,Promise.all(t).then((function(e){return{success:!0}})).catch((function(e){return{success:!1}}))]}))}))};
