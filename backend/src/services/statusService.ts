export type FieldStatus = "Completed" | "At Risk" | "Active";

export function getFieldStatus(
  stage: string,
  expectedHarvestDate: Date,
): FieldStatus {
  if (stage === "HARVESTED") {
    return "Completed";
  }

  const now = Date.now();
  const harvestTime = expectedHarvestDate.getTime();
  const sevenDaysMs = 7 * 24 * 60 * 60 * 1000;

  if (
    (stage === "PLANTED" || stage === "GROWING") &&
    harvestTime - now <= sevenDaysMs
  ) {
    return "At Risk";
  }

  return "Active";
}
