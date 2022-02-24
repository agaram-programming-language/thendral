export interface Statement {

}


export class BinaryExpr implements Statement {

  constructor(
    private left: string,
    private operator: string,
    private right: string) {

  }

}

export class UnaryExpr implements Statement {
  constructor(private right: string|number, private operator?: string) {

  }
}