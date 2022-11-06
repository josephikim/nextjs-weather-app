import React, { useState } from 'react'

interface IUseInputHook {
  value: string
  setValue: React.Dispatch<any>
  reset: () => void
  bind: {
    value: string
    onChange: (event: any) => void
  }
}

export const useInput = (initialValue: string): IUseInputHook => {
  const [value, setValue] = useState(initialValue)

  return {
    value,
    setValue,
    reset: (): void => setValue(''),
    bind: {
      value,
      onChange: (event): void => {
        setValue(event.target.value)
      },
    },
  }
}
