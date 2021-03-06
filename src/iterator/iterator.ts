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

  current():T {
    if ( this.isAtEnd() ) {
      throw new Error("Attempting to find current token at end")
    }
    return this.items[0];
  }


  peek(): T | boolean  {
    if ( this.isAtEnd() ) {
      return false
    }
    return this.items[1]
  }


  unsafeCurrent(): T  {
    return this.items[0]
  }

  unsafePeek(): T  {
    return this.items[1]
  }



}