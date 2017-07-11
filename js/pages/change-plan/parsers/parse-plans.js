// TODO: This parser NEEDS a test!!
export default function parsePlans (rawBody) {
  let data = {}

  try {
    data = JSON.parse(rawBody)
  } catch (error) {
    console.error('Failed to parse plans')
    console.error(error)
  }

  const plans = data.data || []

  return {
    plans: plans.map((plan) => {
      return {
        id: plan.id,
        name: plan.name,
        plan_code: plan.plan_code,
        price: plan.price,
        is_public: plan.is_public,
        is_trial: plan.is_trial,
        frequency: plan.frequency,
        description: plan.description,
        features: plan.features,
        expanded: false,
        maxHeight: ''
      }
    })
  }
}
