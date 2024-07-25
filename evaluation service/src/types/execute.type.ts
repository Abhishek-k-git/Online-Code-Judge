export type ExecuteResType = {
  output: string;
  status: string;
};

export default interface ExecuteInterface {
  execute(
    code: string,
    inputTestCase: string,
    outputTestCase: string
  ): Promise<ExecuteResType>;
}
