import React from 'react'
import './CircularChart.css'

const CircularChart = ({
  percentage,
  color,
  children,
  className=""
}) => {
  const safePercentage = Math.max(0, Math.min(100, Number(percentage) || 0));
  const ringColor = color || "red";

  return (
    <div className={`circular-chart ${className}`} style={{
      background: `conic-gradient(${ringColor} ${safePercentage}%, var(--color-grey-100) ${safePercentage}% 100%)`,
    }}>
      <div className="circular-chart-inner">
        {children}
      </div>
     
    </div>
  )
}

export default CircularChart
