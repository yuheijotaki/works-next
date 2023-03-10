import Link from 'next/link'
import { ReactNode } from 'react'
import styles from '@/styles/components/Header.module.scss'

export default function Header({ children }: {children: ReactNode}) {
  return (
    <>
      <h1 className={styles['logo']}><Link href={'/'} className={styles['anchor']}>{process.env.siteName}</Link></h1>
    </>
  )
}
