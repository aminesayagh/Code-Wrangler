import cliProgress from "cli-progress";

export class ProgressBar {
  private bar: cliProgress.SingleBar;
  private intervalId: NodeJS.Timeout | null = null;
  private currentValue: number = 0;

  constructor(private total: number = 100) {
    this.bar = new cliProgress.SingleBar(
      {},
      cliProgress.Presets.shades_classic
    );
  }

  public start(): ProgressBar {
    this.bar.start(this.total, 0);
    this.intervalId = setInterval(() => this.simulateProgress(), 200);
    return this;
  }

  public update(value: number): ProgressBar {
    this.currentValue = value;
    this.bar.update(value);
    return this;
  }

  public stop(): ProgressBar {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.bar.update(this.total);
    this.bar.stop();
    return this;
  }

  public async execute<T>(fn: () => Promise<T>): Promise<T> {
    this.start();
    try {
      return await fn();
    } finally {
      this.stop();
    }
  }

  private simulateProgress(): void {
    const remainingProgress = this.total - this.currentValue;
    const increment = Math.random() * remainingProgress * 0.1;
    this.currentValue = Math.min(
      this.currentValue + increment,
      this.total * 0.95
    );
    this.bar.update(this.currentValue);
  }
}

export async function progressBar(
  total: number,
  callback: () => Promise<void>
): Promise<void> {
  const bar = new ProgressBar(total);
  await bar.execute(async () => {
    await callback();
  });
}
