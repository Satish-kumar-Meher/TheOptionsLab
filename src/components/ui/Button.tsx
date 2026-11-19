import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Link, type LinkProps } from 'react-router-dom'
import { cn } from './cn'

interface Common {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  icon?: ReactNode
  iconRight?: ReactNode
  className?: string
  children?: ReactNode
}

const base =
  'group/btn relative inline-flex select-none items-center justify-center gap-2 overflow-hidden rounded-full font-medium tracking-[-0.01em] whitespace-nowrap transition-[transform,background-color,box-shadow,border-color,color] duration-300 ease-[var(--ease-out-expo)] active:translate-y-px disabled:opacity-50'
const sizes = { sm: 'h-9 px-4 text-[0.82rem]', md: 'h-11 px-6 text-[0.92rem]', lg: 'h-[3.25rem] px-8 text-[1rem]' }
const variants = {
  primary:
    'bg-fg text-bg shadow-[0_0_0_1px_rgb(255_255_255/0.5),0_14px_34px_-12px_rgb(244_247_250/0.5)] hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_0_0_1px_#fff,0_18px_44px_-12px_rgb(244_247_250/0.65)]',
  secondary:
    'border border-line-strong bg-white/[0.04] text-fg backdrop-blur-md hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/[0.09]',
  ghost: 'text-fg-2 hover:text-fg hover:bg-white/[0.06]',
}
const cls = (v: NonNullable<Common['variant']>, s: NonNullable<Common['size']>, extra?: string) => cn(base, sizes[s], variants[v], extra)

function Inner({ icon, iconRight, children, shine }: Pick<Common, 'icon' | 'iconRight' | 'children'> & { shine: boolean }) {
  return (
    <>
      {shine && (
        <span aria-hidden className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-[20deg] bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 transition-all duration-700 group-hover/btn:left-[130%] group-hover/btn:opacity-70" />
      )}
      {icon}
      <span className="relative inline-flex items-center gap-2">{children}</span>
      {iconRight && <span className="relative transition-transform duration-300 group-hover/btn:translate-x-0.5">{iconRight}</span>}
    </>
  )
}

export function Button({ variant = 'primary', size = 'md', icon, iconRight, className, children, type = 'button', ...rest }: Common & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type={type} className={cls(variant, size, className)} {...rest}>
      <Inner icon={icon} iconRight={iconRight} shine={variant === 'primary'}>{children}</Inner>
    </button>
  )
}

export function LinkButton({ variant = 'primary', size = 'md', icon, iconRight, className, children, ...rest }: Common & Omit<LinkProps, 'className' | 'children'>) {
  return (
    <Link className={cls(variant, size, className)} {...rest}>
      <Inner icon={icon} iconRight={iconRight} shine={variant === 'primary'}>{children}</Inner>
    </Link>
  )
}
