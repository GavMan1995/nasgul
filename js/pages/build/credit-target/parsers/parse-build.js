export default function parseBuild (rawBody) {
  let data = {}

  try {
    data = JSON.parse(rawBody)
  } catch (error) {
    console.error('Failed to parse build response')
    console.error(error)
  }

  return {
    build: {
      personalReportId: data.personal_report_id,
      businessReportId: data.business_report_id,
      businessId: data.business_id,
      businessLauncherCompleted: data.business_launcher_completed,
      businessLauncherTotal: data.business_launcher_total,
      creditSweeperTotal: data.credit_sweeper_total,
      creditSweeperCompleted: data.credit_sweeper_completed,
      creditTargetCompleted: data.credit_target_completed,
      creditTargetTotal: data.credit_target_total
    }
  }
}
