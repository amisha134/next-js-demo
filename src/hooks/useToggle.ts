import { useCallback, useState } from 'react'

const useToggle = (
  initialState = false
): [boolean, (newValue?: boolean) => void] => {
  const [isTrue, setIsTrue] = useState(initialState)

  const toggle = useCallback((newValue?: boolean) => {
    setIsTrue((prevValue: boolean) =>
      typeof newValue !== 'undefined' ? newValue : !prevValue
    )
  }, [])

  return [isTrue, toggle]
}

export default useToggle
