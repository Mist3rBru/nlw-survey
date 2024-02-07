/* eslint-disable @typescript-eslint/no-explicit-any */
export class MiddleManAdapter<
  In extends string,
  Repo extends Record<string, any>,
  Out extends keyof Repo,
> {
  constructor(
    private readonly input: In,
    private readonly repository: Repo,
    private readonly output: Out
  ) {}

  public build(): Record<In, Repo[Out]> {
    return {
      [this.input]: (...data: unknown[]): Repo[Out] => {
        return this.repository[this.output](...data)
      },
    } as unknown as Record<In, Repo[Out]>
  }
}
