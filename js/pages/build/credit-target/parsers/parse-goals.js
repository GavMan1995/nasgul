export default function parseGoals (rawBody) {
  let data = {}

  try {
    data = JSON.parse(rawBody)
  } catch (error) {
    console.error('Failed to parse goals')
    console.error(error)
  }

  const goals = data.goals || []

  return {
    goals: goals.map((goal) => {
      return {
        id: goal.id,
        title: goal.title,
        description: goal.description,
        successMessage: goal.success_message,
        type: goal.type,
        active: goal.active,
        completed: goal.completed,
        involvesBusiness: goal.involves_business,
        tasks: goal.tasks
      }
    }),
    includeBusiness: data.include_business
  }
}
