// Utility function to convert form data to the appropriate types
export function parseMeetingFormData(formData: FormData) {
  const title = formData.get("title")?.toString() || "";
  const description = formData.get("description")?.toString();
  const scheduledAt = new Date(formData.get("scheduledAt")?.toString() || "");
  const companyId = parseInt(formData.get("companyId")?.toString() || "0", 10);
  const createdById = parseInt(
    formData.get("createdById")?.toString() || "0",
    10
  );

  const attendeeIdsJson = formData.get("attendeeIds")?.toString() || "[]";
  const attendeeIds = JSON.parse(attendeeIdsJson);

  return {
    title,
    description,
    scheduledAt,
    companyId,
    createdById,
    attendeeIds,
  };
}
