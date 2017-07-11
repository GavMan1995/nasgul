export default function parseQuestionData (rawBody) {
  let data = {}

  try {
    data = JSON.parse(rawBody)
  } catch (error) {
    console.error('Failed to parse questions')
    console.error(error)
  }

  return {
    answers: answers(data.questions),
    errors: data.errors,
    questions: data.questions,
    questionSessionId: data.question_session_id,
    secondsRemaining: Math.round((new Date(data.expires_at).getTime() - new Date().getTime()) / 1000)
  }
}

function answers (questions) {
  return Object.assign({}, ...questions.map((question) => {
    return { [`answer${question.number}`]: '' }
  }))
}
