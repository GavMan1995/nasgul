import shuffle from 'lodash.shuffle'

export default class EnrollmentService {
  static postBody (request) {
    const { institutionId } = request.payload

    const fields = Object.keys(request.payload).filter((key) => {
      return key !== 'institutionId'
    })

    const structuredFields = fields.map((field) => {
      return {
        credential_id: field,
        value: request.payload[field]
      }
    })

    return {
      data: {
        institution_id: institutionId,
        credentials: structuredFields
      }
    }
  }

  static mfaBody (request) {
    const fields = Object.keys(request.payload).filter((key) => {
      return key !== 'enrollmentId'
    })

    const structuredFields = fields.map((field) => {
      let guid = field
      let value = request.payload[field]

      return {
        credential_guid: guid,
        value: value
      }
    })

    return {
      data: {
        credentials: structuredFields
      }
    }
  }

  static waitingUrl (enrollment) {
    return `/loan-reality/connecting?enrollmentId=${enrollment.id}`
  }

  static errorUrl (message = '') {
    if (message !== '') return `/loan-reality/something-went-wrong?errorMessage=${message}`

    return `/loan-reality/something-went-wrong`
  }

  static redirectUrl (enrollment) {
    const { institutionId, institutionName } = enrollment

    switch (enrollment.status) {
      case 'REQUESTED':
        // wait for the enrollment to do something
        return `/loan-reality/connecting?enrollmentId=${enrollment.id}`
      case 'CHALLENGED':
        // go directly to the mfa page
        return `/loan-reality/bank-mfa?enrollmentId=${enrollment.id}`
      case 'COMPLETED':
        // go to the account selection page
        return '/loan-reality/accounts'
      case 'HALTED':
        // TODO refresh the current enrollment - this may already be done
        return EnrollmentService.errorUrl('halted')
      case 'PREVENTED':
        // go to the error page that says they need to wait
        // too many attempts
        return EnrollmentService.errorUrl('tooManyAttempts')
      case 'DENIED':
        // This happens when the incorrect credentials were input
        return `/loan-reality/bank-credentials?institutionId=${institutionId}&institutionName=${institutionName}&denied=true`
      default:
        return EnrollmentService.errorUrl()
    }
  }

  static tips () {
    const tips = [
      {
        title: 'Did you know?',
        text: 'Need better cash flow? Ask your suppliers and vendors if they offer terms such as net-30.'
      },
      {
        title: 'Did you know?',
        text: 'There are over 12 different types of funding provided by the SBA.'
      },
      {
        title: 'Did you know?',
        text: 'Merchant Cash Advances can carry APRs of 200% or more.'
      },
      {
        title: 'Did you know?',
        text: `0% APR loans exist! Check out Kiva's U.S. borrowing program.`
      },
      {
        title: 'Did you know?',
        text: 'To minimize the effect of loan shopping on your credit score, submit all your applications within a 14-day period.'
      },
      {
        title: 'Did you know?',
        text: 'Startups that meet certain income and credit requirements can generally qualify for business credit cards.'
      },
      {
        title: 'Did you know?',
        text: `If you're a business owner applying for a mortgage, lenders will generally average the last 2 years of your income to qualify you for a loan.`
      },
      {
        title: 'Did you know?',
        text: '25% of business owners who check their business credit scores find errors that put them in a higher risk category.'
      },
      {
        title: 'Did you know?',
        text: 'Business owners who understand their business credit scores are 41% more likely to qualify for a business loan.'
      },
      {
        title: 'Did you know?',
        text: 'Your presence on social media may affect your chances of getting certain loans.'
      },
      {
        title: 'Did you know?',
        text: `The minimum FICO SBSS score (FICO's business credit score) to qualify for certain SBA loans is 140.`
      },
      {
        title: 'Did you know?',
        text: `Checking your client's credit can protect you from being stiffed by a customer.`
      },
      {
        title: 'Did you know?',
        text: `Want to sell your product in major retail stores? You'll likely need a D-U-N-S number and Paydex score. Nav can help.`
      },
      {
        title: 'Did you know?',
        text: 'You need at least four lenders or vendors reporting to Dun & Bradstreet to get a Paydex score.'
      },
      {
        title: 'Did you know?',
        text: 'Lenders are not required to tell you an APR when quoting you the cost of a small business loan.'
      },
      {
        title: 'Did you know?',
        text: 'No federal law required lenders to give you a free copy of your business credit reports.'
      }
    ]

    return shuffle(tips)
  }
}
