import React from 'react'
import { scaleBand, scaleLinear } from 'd3-scale'
import Axes from './Axes'
import Bars from './Bars'
import ResponsiveWrapper from './ResponsiveWrapper'

class BarChart extends React.Component {
  constructor(props) {
    super(props)
    this.xScale = scaleBand()
    this.yScale = scaleLinear()

  }

  render() {
    const {budget, current} = this.props

    const margins = { top: 10, right: 10, bottom: 50, left: 50 }
    const svgDimensions = {
      width: Math.max(this.props.parentWidth, 325),
      height: 225
    }

    const maxValue = Math.max(...budget.map(d => d.amount)) > Math.max(...current.map(d => d.amount)) ? Math.max(...budget.map(d => d.amount)) : Math.max(...current.map(d => d.amount))

    const xScale = this.xScale
      .padding(0.5)
      .domain(budget.map(d => d.category))
      .range([margins.left, svgDimensions.width - margins.right])

    const yScale = this.yScale
      .domain([0, maxValue])
      .range([svgDimensions.height - margins.bottom, margins.top])

    return (
      <svg width={svgDimensions.width} height={svgDimensions.height}>
        <Axes
          scales={{ xScale, yScale }}
          margins={margins}
          svgDimensions={svgDimensions}
        />
        <Bars
          scales={{ xScale, yScale }}
          margins={margins}
          budget={budget}
          maxValue={maxValue}
          svgDimensions={svgDimensions}
        />
        <Bars
          scales={{ xScale, yScale }}
          margins={margins}
          current={current}
          maxValue={maxValue}
          svgDimensions={svgDimensions}
        />
      </svg>
    )
  }
}

export default ResponsiveWrapper(BarChart)