import React, { Component } from 'react'

import AnnualGrossRevenueInput from './annual-gross-revenue-input'
import AnnualProfitInput from './annual-profit-input'
import DailyBankBalance from './daily-bank-balance'
import MonthlyBankDepositsInput from './monthly-bank-deposits-input'
import MonthlyCreditCardSalesInput from './monthly-cc-sales.js'
import MonthlyExpensesInput from './monthly-expenses-input'
import YesNoSelect from '../../components/yes-no-select'
import LoadingOverlay from '../../components/loading-overlay'

export default class FinancialProfileForm extends Component {
  constructor () {
    super()
    this.state = {
      canEdit: false,
      isLoading: false
    }
  }
  render () {
    const { increment, decrement, crumb, ownedProfiles } = this.props
    const { canEdit, isLoading } = this.state

    let formButton = (
      <button
        type='button'
        className='c-btn c-btn--primary'
        id='businessDetailsSave'
        onClick={this.enableEdit.bind(this)}>
        Edit
      </button>
    )
    if (canEdit) {
      formButton = (
        <button
          type='submit'
          className='c-btn c-btn--primary'
          id='businessDetailsSave'>
          Save Changes
        </button>
      )
    }

    let loader = null
    if (isLoading) {
      loader = <LoadingOverlay />
    }

    return (
      <form
        data-flex--item='basis--500 grow--5'
        data-flex--container='row-items--top'
        className='_profile-section'
        onSubmit={this.submitForm.bind(this)}
        action='/app/profile/financial'
        method='POST'>
        <input type='hidden' name='crumb' value={crumb} />
        {ownedProfiles.map((business, index) => {
          return (
            <div
              data-flex--item='full m-b--xl'
              className='form-container'
              key={index}>
              <input
                type='hidden'
                name={`financial_${index}_guid`}
                defaultValue={business.financials.guid} />

              <div data-flex--item='full p--sm' className='_section-header'>
                Financial Information for {business.name}
              </div>

              <div data-flex--container data-flex--item='full p-x--md'>

                <AnnualGrossRevenueInput
                  name={`financial_${index}_annual_gross_revenue`}
                  canEdit={canEdit}
                  defaultValue={business.financials.annualGrossRevenue}
                  enableEdit={this.enableEdit.bind(this)}
                  increment={increment}
                  decrement={decrement}
                  label='Annual Gross Revenue' />

                <MonthlyBankDepositsInput
                  name={`financial_${index}_monthly_bank_deposits`}
                  canEdit={canEdit}
                  defaultValue={business.financials.monthlyBankDeposits}
                  enableEdit={this.enableEdit.bind(this)}
                  increment={increment}
                  decrement={decrement}
                  label='Monthly Bank Deposits' />

                <DailyBankBalance
                  name={`financial_${index}_daily_bank_balance`}
                  canEdit={canEdit}
                  defaultValue={business.financials.bankBalance}
                  enableEdit={this.enableEdit.bind(this)}
                  increment={increment}
                  decrement={decrement}
                  label='Daily Bank Balance' />

                <YesNoSelect
                  name={`financial_${index}_accepts_credit_cards`}
                  canEdit={canEdit}
                  defaultValue={business.financials.acceptCreditCards}
                  enableEdit={this.enableEdit.bind(this)}
                  label='Accepts Credit Cards' />

                <MonthlyCreditCardSalesInput
                  name={`financial_${index}_monthly_credit_card_sales`}
                  canEdit={canEdit}
                  defaultValue={business.financials.monthlyCreditCardSales}
                  enableEdit={this.enableEdit.bind(this)}
                  increment={increment}
                  decrement={decrement}
                  label='Monthly Credit Card Sales' />

                <YesNoSelect
                  name={`financial_${index}_profitable`}
                  canEdit={canEdit}
                  defaultValue={business.financials.profitable}
                  enableEdit={this.enableEdit.bind(this)}
                  label='Profitable' />

                <AnnualProfitInput
                  name={`financial_${index}_annual_profit`}
                  canEdit={canEdit}
                  defaultValue={business.financials.annualProfit}
                  enableEdit={this.enableEdit.bind(this)}
                  increment={increment}
                  decrement={decrement}
                  label='Annual Profit' />

                <MonthlyExpensesInput
                  name={`financial_${index}_monthly_expenses`}
                  canEdit={canEdit}
                  defaultValue={business.financials.monthlyExpenses}
                  enableEdit={this.enableEdit.bind(this)}
                  increment={increment}
                  decrement={decrement}
                  label='Monthly Expenses' />
              </div>

              {loader}
            </div>
          )
        })}

        <div
          data-flex--item='full'
          data-flex--container='right'>
          {formButton}
        </div>

      </form>
    )
  }

  enableEdit (event) {
    event.preventDefault()
    this.setState({ canEdit: true })
  }

  submitForm () {
    this.setState({ isLoading: true })
    window.analytics.track(
      'Form Submit',
      {
        name: 'financial_details',
        label: 'financial_details',
        category: 'Profile Interaction'
      }
    )
  }
}
