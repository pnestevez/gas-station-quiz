import { useState } from 'react'

export type UseInputProps<T> = {
	value: T
	validateError?: (value: T) => [boolean, string?]
	validateSuccess?: (value: T) => [boolean, string?]
	compareEquality?: boolean
	emptyValue?: T
}

export type UseInputReturnType<T> = {
	value: T
	onChange: (value: T) => void
	hasChanged: boolean
	hasError: boolean
	errorMsg: string | undefined
	hasSuccess: boolean
	successMsg: string | undefined
	reset: () => void
	setHasChanged: (status: boolean) => void
	clear: () => void
} & Pick<UseInputProps<T>, 'validateError' | 'validateSuccess'>

export const useInput = <T>({
	value: initialValue,
	validateError,
	validateSuccess,
	compareEquality,
	emptyValue,
}: UseInputProps<T>): UseInputReturnType<T> => {
	const [value, setValue] = useState(initialValue)
	const [hasChanged, setHasChanged] = useState(false)
	const [error, setError] = useState<[boolean, string?]>(() => validateError?.(value) || [false])
	const [success, setSuccess] = useState<[boolean, string?]>(
		() => validateSuccess?.(value) || [false],
	)

	const onChange = (value: T): void => {
		setHasChanged(!(compareEquality && JSON.stringify(value) === JSON.stringify(initialValue)))
		setValue(value)
		setError(validateError?.(value) || [false])
		setSuccess(validateSuccess?.(value) || [false])
	}

	const [hasError, errorMsg] = error
	const [hasSuccess, successMsg] = success

	const reset = () => {
		setValue(initialValue)
		setHasChanged(false)
	}

	const clear = () => {
		onChange(emptyValue !== undefined ? emptyValue : initialValue)
	}

	return {
		value,
		onChange,
		hasChanged,
		hasError,
		errorMsg,
		hasSuccess,
		successMsg,
		reset,
		setHasChanged,
		clear,
	}
}
