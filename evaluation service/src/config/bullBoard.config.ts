import { createBullBoard } from "@bull-board/api";
import { BullMQAdapter } from "@bull-board/api/bullMQAdapter";
import { ExpressAdapter } from "@bull-board/express";

import evaluationQueue from "../queues/evaluation.queue";
import submissionQueue from "../queues/submission.queue";

const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath("/ui");

createBullBoard({
   queues: [
      new BullMQAdapter(submissionQueue),
      new BullMQAdapter(evaluationQueue),
   ],
   serverAdapter,
});

export default serverAdapter;
