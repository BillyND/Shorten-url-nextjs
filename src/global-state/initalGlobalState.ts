import { createSubscription } from "global-state-hook";

export const languageSubs = createSubscription<{ language: string }>({
  language: "VN",
});
