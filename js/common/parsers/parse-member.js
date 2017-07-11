export default function parseMember (rawBody) {
  let data = {}

  try {
    data = JSON.parse(rawBody)
  } catch (error) {
    console.error('Failed to parse member')
    console.error(error)
  }

  const member = data.member || { affiliate_owner: {}, businesses: [] }
  const activeBusiness = member.businesses.filter((business) => {
    return business.is_default
  }).map((business) => {
    return {
      id: business.id,
      name: business.name
    }
  })[0]

  return {
    me: {
      id: member.id,
      accountGuid: member.account_guid,
      accountState: member.account_state,
      firstName: member.first_name,
      lastName: member.last_name,
      letterGrade: member.credit_grade,
      billingState: member.billing_state,
      idVerifyState: member.id_verification_state,
      email: member.email,
      primaryEmail: member.primary_email.is_primary,
      phoneNumber: member.primary_phone.number,
      primaryPhone: member.primary_phone.is_primary,
      verificationAttemptsRemaining: member.verification_attempts_remaining
    },
    address: {
      id: member.address.id,
      street1: member.address.street1,
      street2: member.address.street2,
      city: member.address.city,
      state: member.address.state,
      zip: member.address.zip
    },
    plan: {
      id: member.plan.id,
      name: member.plan.name,
      planCode: member.plan.plan_code,
      followedBusinessCount: member.plan.business_follow_count,
      price: member.plan.price
    },
    roles: member.access_roles,
    activeBusiness,
    businesses: member.businesses.map((business) => {
      return {
        id: business.id,
        dunsNumber: business.duns_number,
        experianFileNumber: business.experian_file_number,
        name: business.name,
        isOwned: business.owned
      }
    }),
    affiliateOwner: {
      id: member.affiliate_owner.id,
      name: member.affiliate_owner.name
    }
  }
}
