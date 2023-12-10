export class Ball {
  private x: number;
  private y: number;
  private length: number;

  constructor(x: number, y: number, length: number) {
    this.x = x;
    this.y = y;
    this.length = length;
  }

  public paint(context: CanvasRenderingContext2D) {
    context.fillRect(this.x, this.y, this.length, this.length);
  }
}
