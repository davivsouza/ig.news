import Link from 'next/link'
import { SignInButton } from '../SignInButton'
import styles from './styles.module.scss'

export function Header() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <img src="/images/logo.svg" alt="ig news" />
        <nav>
          <ul>
            <Link href={'/'} className={styles.active}>Home</Link>
            <Link href={'/posts'}>Posts</Link>
          </ul>
        </nav>
        <SignInButton />
      </div>
    </header>
  )
}