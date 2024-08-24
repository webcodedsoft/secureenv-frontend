import axios, { AxiosError } from 'axios'

export const determinePathName = (pathname: string) => {
  const parts = pathname.split('/')
  const dashboardIndex = parts[2] || parts[1]
  return dashboardIndex
}

export const getInitials = (firstName: string, lastName?: string) => {
  let initials = ''
  const nameParts = firstName.split(' ')
  if (nameParts.length > 0) {
    initials = nameParts[0].charAt(0)
  }
  if (lastName) {
    initials += lastName.charAt(0)
  } else if (nameParts.length > 1) {
    initials += nameParts[nameParts.length - 1].charAt(0)
  }

  return initials.toUpperCase()
}

export const errorHandler = (err: AxiosError<Error>) => {
  if (err.response?.status === 400) {
    const errorType = typeof err.response?.data?.message
    if (errorType !== 'string') {
      throw new Error((err.response.data.message || [])[0])
    }
    throw new Error(err.response?.data?.message as string)
  }
  if (axios.isAxiosError(err)) {
    throw new Error((err.response?.data?.message || 'Operation Timeout') as string)
  }
  throw new Error('Error processing request, please check your internet connection')
}

export const createWrapperAndAppendToBody = (wrapperId: string) => {
  const wrapperElement = document.createElement('div')
  wrapperElement.setAttribute('id', wrapperId)
  document.body.appendChild(wrapperElement)
  return wrapperElement
}

export const passwordStrengthVariables = (values: any) => {
  if (values.password.trim().length > 0) {
    let strengthConditionsFulfilled = 0

    if (/\d/.test(values.password)) {
      strengthConditionsFulfilled += 1
    }

    if (/[A-Z]/.test(values.password)) {
      strengthConditionsFulfilled += 1
    }

    if (/[a-z]/.test(values.password)) {
      strengthConditionsFulfilled += 0.5
    }

    // eslint-disable-next-line no-useless-escape
    if (/[!@#$%^&*()_+{}\[\]:;<>,.?~|]/.test(values.password)) {
      strengthConditionsFulfilled += 0.5
    }

    if (values.password.trim().length >= 8) {
      strengthConditionsFulfilled += 1
    }

    return {
      hasStrengthIndicator: true,
      totalStrengthConditions: 4,
      strengthConditionsFulfilled,
    }
  }

  return {
    hasStrengthIndicator: false,
    totalStrengthConditions: 4,
    strengthConditionsFulfilled: 0,
  }
}

export const isValidNumber = (value: any) => {
  if (!/^[0-9]+$/.test(value)) {
    return false
  }
  return true
}

export const formatToMoney = (numberOrString: string | number | undefined, decimalPlaces = 2) => {
  if (!numberOrString) {
    return 'Invalid input'
  }
  // Ensure that we have a valid number
  const number = typeof numberOrString === 'string' ? parseFloat(numberOrString) : numberOrString

  if (isNaN(number)) {
    // Handle invalid input
    return 'Invalid input'
  }

  return number.toLocaleString('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
  })
}

