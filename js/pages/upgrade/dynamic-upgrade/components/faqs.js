import React from 'react'

export default function Faqs (props) {
  const { copy } = props

  if (!copy.faqs) return null

  return (
    <div className='c-dynamic-upgrade-page__faqs'>
      <h2><strong>FAQS</strong></h2>
      <ol>
        {copy.faqs.map((faq, index) => {
          return (
            <li key={index}>
              {faq.question}
              <p>{faq.answer}</p>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
