'use client'
import React from 'react'
import { IconButton, InputAdornment } from '@mui/material'
import { FieldPath, FieldValues } from 'react-hook-form'
import { LuEye, LuEyeOff } from 'react-icons/lu'
import useToggle from '@/hooks/useToggle'
import FormInput, { type FormInputProps } from './TextInput'

const PasswordInput = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...other
}: FormInputProps<TFieldValues, TName>) => {
  const [isOpen, toggleOpen] = useToggle()

  return (
    <FormInput
      {...other}
      endAdornment={
        <InputAdornment position="end">
          <IconButton onClick={() => toggleOpen()} edge="end">
            {isOpen ? <LuEyeOff /> : <LuEye />}
          </IconButton>
        </InputAdornment>
      }
      type={isOpen ? 'text' : 'password'}
    />
  )
}

export default PasswordInput
