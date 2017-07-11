// TODO: This parser NEEDS a test!!
// NOTE: This can likely use the same tests as Stef's version in profiles!
export default function parseProfileBusiness (rawBody) {
  let data = {}

  try {
    data = JSON.parse(rawBody)
  } catch (error) {
    console.error('Failed to parse business services')
    console.error(error)
  }

  const businesses = data.businesses || []

  return {
    businessDetails: businesses.filter((business) => {
      return !!business.business_id
    }).map((business) => {
      return {
        id: business.business_id,
        name: business.name,
        details: {
          guid: business.details.guid,
          industry: business.details.industry,
          legalEntity: business.details.legal_type,
          registeredEnity: business.details.registered,
          startDate: parseDate(business.details.start_date)
        },
        financials: {
          guid: business.financials.guid,
          acceptCreditCards: business.financials.accepts_credit_cards,
          annualGrossRevenue: business.financials.annual_gross_revenue,
          annualProfit: business.financials.annual_profit,
          bankBalance: business.financials.daily_bank_balance,
          monthlyBankDeposits: business.financials.monthly_bank_deposits,
          monthlyCreditCardSales: business.financials.monthly_credit_card_sales,
          monthlyExpenses: business.financials.monthly_expenses,
          profitable: business.financials.profitable,
          invoiced: business.financials.invoiced
        }
      }
    })
  }
}

function parseDate (string) {
  const pattern = /^(\d{4})-(\d{2})-(\d{2})$/

  if (!pattern.test(string)) return ''

  const match = pattern.exec(string)

  return `${match[2]}-${match[3]}-${match[1]}`
}
