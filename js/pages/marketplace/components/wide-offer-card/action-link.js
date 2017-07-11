import React from 'react'

export default function ActionLink ({ plan, type }) {
  switch (type) {
    case 'AnnualRevenueQualifier':
    case 'IncorporatedQualifier':
    case 'InvoicedQualifier':
    case 'AverageMonthlyCreditCardRevenueQualifier':
    case 'BusinessAgeQualifierMonths': {
      return (
        <span className='c-mf-tip'>
          <a className='c-mf-tip__link' href='/app/profile/business'>Update Business Profile</a>
        </span>
      )
    }
    case 'PersonalScoreQualifier': {
      if (plan.planCode === 'freemium') {
        return (
          <span className='c-mf-tip'>
            Consider upgrading to take better control over your credit profile
            by getting full report details.
            <a className='c-btn c-btn--upgrade c-mf-tip__btn' href='/upgrade/premium'>Update Your Account</a>
          </span>
        )
      }
    }
  }
  return null
}
