interface IProps {
  conditionsFulfilled: number
  totalConditions: number
}

const PasswordStrengthIndicator: React.FC<IProps> = ({ totalConditions, conditionsFulfilled }) => {
  const computedStrength = () => {
    return (conditionsFulfilled * 100) / totalConditions
  }

  const strengthIndicatorText = () => {
    if (computedStrength() < 25) {
      return 'Very weak'
    }
    if (computedStrength() < 50) {
      return 'Weak'
    }
    if (50 <= computedStrength() && computedStrength() < 75) {
      return 'Fair'
    }
    if (computedStrength() >= 75 && computedStrength() < 100) {
      return 'Very good'
    }
    return 'Excellent'
  }

  return (
    <div className="mt-3 flex items-center gap-2">
      <p className="text-xs font-medium text-[#333333]">{strengthIndicatorText()}</p>
      <div className="h-2 w-4/5 rounded bg-[#f3f3f3]">
        <div className="h-2 rounded bg-[#FF6606]" style={{ width: `${computedStrength()}%` }}></div>
      </div>
    </div>
  )
}

export default PasswordStrengthIndicator
