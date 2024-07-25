import RunCpp from "../containers/RunCpp";
import RunJava from "../containers/RunJava";
import RunPython from "../containers/RunPython";
import ExecuteInterface from "../types/execute.type";

function createExecutor(codeLang: string): ExecuteInterface | null {
   if (codeLang.toLowerCase() === "cpp") {
      return new RunCpp();
   } else if (codeLang.toLowerCase() === "java") {
      return new RunJava();
   } else if (codeLang.toLowerCase() === "python") {
      return new RunPython();
   } else {
      return null;
   }
}

export default createExecutor;
