export default function parseEnrollmentSettings (enrollments, accounts) {
  return {
    enrollments: enrollments.map((enrollment) => {
      return Object.assign({}, enrollment, {
        activeAccounts: accounts.filter((account) => {
          const isHidden = account.status === 'HIDDEN'

          return account.attributes.enrollment_id === enrollment.id && !isHidden
        }),
        deletedAccounts: accounts.filter((account) => {
          const isHidden = account.status === 'HIDDEN'

          return account.attributes.enrollment_id === enrollment.id && isHidden
        })
      })
    })
  }
}
