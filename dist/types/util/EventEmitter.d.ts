declare class EventEmitter {
    constructor();
    emit(...args: any[]): void;
    on(...args: any[]): void;
}
export default EventEmitter;
