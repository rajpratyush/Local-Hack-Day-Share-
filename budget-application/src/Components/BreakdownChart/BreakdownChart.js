import React, {useEffect} from 'react'
import * as d3 from 'd3'

function BreakdownChart(props){
  const {data} = props

  useEffect(() => {
    donut()
    return (() => {
      d3.selectAll("svg").remove()
    })
  }, [props.data])

  function donut(){
    var width = 275,
      height = 275,
      margin = 30


  // The radius of the pieplot is half the width or half the height (smallest one)
    var radius = Math.min(width, height) / 2 - margin

    var svg = d3.select(".budget-donut-chart")
      .append("svg")
        .attr("width", width)
        .attr("height", height)
      .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  // set the color scale
    var color = d3.scaleOrdinal()
      .domain(data)
      .range(["#e89005", "#00a5cf", "#f3e37c", "#c84c09", "#pink"])

  // Compute the position of each group on the pie:
    var pie = d3.pie()
      .value(function(d) {return d.value; })
    var data_ready = pie(d3.entries(data))

  // Build the pie chart
    svg
      .selectAll('whatever')
      .data(data_ready)
      .enter()
      .append('path')
      .attr('d', d3.arc()
        .innerRadius(50)
        .outerRadius(radius)
      )
      .attr('fill', function(d){ return(color(d.data.key)) })
      .attr("stroke", "black")
      .style("stroke-width", "2px")
      .style("opacity", 0.7)
  }  

  return (
    <></>
  )
}

export default BreakdownChart