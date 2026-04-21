const sevenDaysMs = 7 * 24 * 60 * 60 * 1000;

export type FieldStatus = "Completed" | "At Risk" | "Active";

export function getFieldStatus(
  stage: string,
  lastUpdateAt: Date | null,
): FieldStatus {
  if (stage === "HARVESTED") {
    return "Completed";
  }

  if (!lastUpdateAt) {
    return "At Risk";
  }

  const now = Date.now();
  const lastUpdate = lastUpdateAt.getTime();

  if (now - lastUpdate > sevenDaysMs) {
    return "At Risk";
  }

  return "Active";
}
