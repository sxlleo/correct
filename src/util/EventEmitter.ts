import mitt from 'mitt'
class EventEmitter {
  constructor() {
    Object.assign(this, mitt())
  }
}

export default EventEmitter
