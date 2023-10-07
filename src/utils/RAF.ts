class RAF {
  private callbacks: { name: string; callback: (dt: number) => void }[];
  private requestId: number | undefined;
  private lastTime: number | undefined;

  constructor() {
    this.bind();
    this.callbacks = [];
    this.render(0);
  }

  subscribe(name: string, callback: (dt: number) => void) {
    this.callbacks.push({
      name: name,
      callback: callback,
    });
  }

  unsubscribe(name: string) {
    this.callbacks = this.callbacks.filter((item) => item.name !== name);
  }

  render = (currentTime: number) => {
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      if (this.lastTime === undefined) {
        this.lastTime = currentTime;
      }
      const dt = (currentTime - this.lastTime); // Convert to seconds
      this.lastTime = currentTime;

      this.requestId = window.requestAnimationFrame(this.render);

      this.callbacks.forEach((item) => {
        item.callback(dt);
      });
    }
  };

  private bind() {
    this.subscribe = this.subscribe.bind(this);
    this.unsubscribe = this.unsubscribe.bind(this);
    this.render = this.render.bind(this);
  }

  stop() {
    if (typeof window !== 'undefined' && this.requestId !== undefined) {
      window.cancelAnimationFrame(this.requestId);
      this.requestId = undefined;
    }
  }
}

const _instance = new RAF();
export default _instance;
