declare module 'react-router-hash-link' {
  import type { ComponentProps } from 'react'
  export const HashLink: (props: ComponentProps<'a'> & { to: string; smooth?: boolean }) => JSX.Element
}
