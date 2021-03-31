import React, { Component } from 'react'
// import { scaleLinear } from 'd3-scale'
// import { interpolateLab } from 'd3-interpolate'

export default class Bars extends Component {
  // constructor(props) {
  //   super(props)

  //   this.colorScale = scaleLinear()
  //     .domain([0, this.props.maxValue])
  //     .range(['#F3E5F5', '#7B1FA2'])
  //     .interpolate(interpolateLab)
  // }

  render() {
    const { scales, margins, svgDimensions } = this.props
    const { xScale, yScale } = scales
    const { height } = svgDimensions
    const {budget, current} = this.props

    const bars = budget ? (      
      budget.map(budget =>
        <rect
          key={budget.category}
          x={xScale(budget.category)}
          y={yScale(budget.amount)}
          height={height - margins.bottom - scales.yScale(budget.amount)}
          width={xScale.bandwidth()}
          fill={'blue'}
        />,
      )
    ) : (
      current.map(current =>
        <rect
          key={current.category}
          x={xScale(current.category)}
          y={yScale(current.amount)}
          height={height - margins.bottom - scales.yScale(current.amount)}
          width={xScale.bandwidth()}
          fill={current.color}
        />,
      )
    )

    return (
      <g transform={budget ? null : 'translate(10, 0)'}>{bars}</g>
    )
  }
}
