import axios, { AxiosError } from 'axios'

export const determinePathName = (pathname: string) => {
  const parts = pathname.split('/')
  const dashboardIndex = parts[3] || parts[2]
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

export function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>;

  return function (this: any, ...args: Parameters<T>): void {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

export const capitalizeFirstLetter = (text: string) => {
  if (typeof text === 'string' && text.trim().length > 0) {
    return `${text[0].toUpperCase().trim()}${text
      .slice(1)
      .toLowerCase()
      .trim()}`;
  }
  return '';
};

export const readFileContent = async (file: any): Promise<string> => {
  const reader = new FileReader();
  return new Promise((resolve, reject) => {
    reader.onload = (event) => resolve(event.target!.result as string);
    reader.onerror = (error) => reject(error);
    reader.readAsText(file);
  });
};

export const compareValue = (obj1: any, obj2: any): boolean => {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}

export const generateStrongPassword = (length: number = 16): string => {
  const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
  const numericChars = '0123456789';
  const specialChars = '!@#$%^&*()_+[]{}|;:,.<>?';

  const allChars = upperCaseChars + lowerCaseChars + numericChars + specialChars;

  let password = '';

  // Ensure at least one character from each category is included
  password += upperCaseChars[Math.floor(Math.random() * upperCaseChars.length)];
  password += lowerCaseChars[Math.floor(Math.random() * lowerCaseChars.length)];
  password += numericChars[Math.floor(Math.random() * numericChars.length)];
  password += specialChars[Math.floor(Math.random() * specialChars.length)];

  // Fill the rest of the password with random characters from all categories
  for (let i = password.length; i < length; i++) {
    password += allChars[Math.floor(Math.random() * allChars.length)];
  }

  // Shuffle the password to prevent predictable patterns
  password = password.split('').sort(() => 0.5 - Math.random()).join('');
  return password;
}

export const maskData = (data: any, shouldMask = false) => {
  if (shouldMask) {
    const lines = data.split('\n');
    return lines.map((line: any) => {
      if (line.trim() === '') return line; // Ignore empty lines

      let isComment = false;
      let cleanedLine = line.trim();

      if (cleanedLine.startsWith('#')) {
        isComment = true;
        cleanedLine = cleanedLine.slice(1).trim(); // Remove the comment marker
      }

      const [key, value] = cleanedLine.split('=');
      if (!value) {
        return line; // Ignore non-sensitive values
      }

      const maskedLine = `${key.trim()}=********`; // Mask sensitive values

      // Add comment marker back if the original line was a comment
      return isComment ? `# ${maskedLine}` : maskedLine;
    }).join('\n');
  }
  return data
}

// TODO!?: Write a mask function to mask object
