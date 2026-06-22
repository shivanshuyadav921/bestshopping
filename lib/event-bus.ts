import { EventEmitter } from "events";

class ApplicationEventBus extends EventEmitter {
  private static instance: ApplicationEventBus;

  private constructor() {
    super();
    this.setMaxListeners(50);
  }

  public static getInstance(): ApplicationEventBus {
    if (!ApplicationEventBus.instance) {
      ApplicationEventBus.instance = new ApplicationEventBus();
    }
    return ApplicationEventBus.instance;
  }
}

export const eventBus = ApplicationEventBus.getInstance();
export default eventBus;
