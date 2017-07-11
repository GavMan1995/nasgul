import React from 'react'

export default function PaymentTrendsSection ({ report }) {
  const { tradelines } = report.attributes.executive_summary
  const color = paymentTrendsColor(tradelines.predicted_days_beyond_terms)

  if (tradelines) {
    return (
      <div className='c-enterprise-score'>
        <div className='c-enterprise-score__section'>
          <div
            style={{ borderColor: color }}
            className='c-enterprise-payment-trends-section'>
            <h1 style={{ color }}>
              {tradelines.predicted_days_beyond_terms}</h1>
            <h3>
              Predicted DBT (Days Beyond Terms)
            </h3>
          </div>
        </div>

        <div className='c-enterprise-score__section c-enterprise-score__section--align-top'>
          <h4 className='c-enterprise-score__header'>
            <strong>
              Tips
            </strong>
          </h4>

          <p>
            Unlike personal credit, paying your bills to vendors
            early will improve your business credit score.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className='c-enterprise-score'>
      <div className='c-enterprise-score__section'>
        <div className='c-enterprise-payment-trends-section'>
          <h1>No Data for This section!</h1>
          <h3>Predicted DBT (Days Beyond Terms)</h3>
        </div>
      </div>

      <div className='c-enterprise-score__section c-enterprise-score__section--align-top'>
        <h4 className='c-enterprise-score__header'>
          <strong>
            Tips
          </strong>
        </h4>

        <p>
          Unlike personal credit, paying your bills to vendors
          early will improve your business credit score.
        </p>
      </div>
    </div>
  )
}

function paymentTrendsColor (trend) {
  if (trend <= 0) {
    return '#00bb7b'
  } else if (trend > 0 && trend < 30) {
    return '#f9a000'
  } else {
    return '#ed193f'
  }
}
