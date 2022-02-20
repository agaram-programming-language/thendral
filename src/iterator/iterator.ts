export abstract class Iterator<T> {

  public constructor(private readonly items: T[]) {}


  isAtEnd() : boolean {
    return this.items.length === 0
  }

  /**
   * @throws Error
   */
  consume(): T {
    if ( this.isAtEnd() ) {
      throw new Error("Attempting to consume token at end")
    }
    return this.items.shift()
  }

  /**
   * @throws Error
   */
  advance(): void {
    if ( this.isAtEnd() ) {
      throw new Error("Attempting to advance token at end")
    }
    this.items.shift()
  }


  peek(): T | boolean {
    if ( this.isAtEnd() ) {
      return false
    }
    return this.items[0]
  }




}