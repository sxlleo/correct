import { fabric } from 'fabric';
declare function deleteHandle(eventData: any, transform: any): void;
declare function createDeleteControl(mouseUpHandler: (eventData: any, transform: any) => void): fabric.Control;
export { createDeleteControl, deleteHandle };
