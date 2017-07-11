import React, { Component } from 'react'

class FilterHeader extends Component {
  render () {
    const { options, title } = this.props

    const selectedCategory = title

    let headerTitle = 'Business Services'
    if (title) {
      headerTitle = title
    }

    let inputSelectedClass = ''
    if (selectedCategory !== undefined | '') {
      inputSelectedClass = 'is-filled'
    }

    return (
      <div className='c-page-banner c-page-banner--hide-title-on-mobile'>
        <div className='c-page-banner__title'>
          <h1>{headerTitle}</h1>
        </div>

        <h3 className='c-page-banner__filter-title'>
          Filter your results
        </h3>

        <div className={`c-select ${inputSelectedClass}`}>
          <select
            name='marketplaceOptions'
            value={selectedCategory}
            onChange={this.selectOption.bind(this)}>
            <option value='' hidden>Select one</option>
            <option
              value=''>
              View All Categories
            </option>
            {options.map((option, index) => {
              return (
                <option
                  key={index}
                  value={option.category.name}>
                  {option.category.name}
                </option>
              )
            })}
          </select>
          <label>Category</label>
        </div>
      </div>
    )
  }

  selectOption (event) {
    window.analytics.track('Feature Click',
      {
        category: 'Filter Selection',
        label: `${event.target.value} - Business Services`,
        name: `${event.target.value} - Business Services`
      }
    )

    if (event.target.value === '') {
      window.location = `/business-services`
    } else {
      window.location = `/business-services/${event.target.value}`
    }
  }
}

export default FilterHeader
