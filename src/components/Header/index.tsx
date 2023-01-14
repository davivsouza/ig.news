import Link from 'next/link'
import { useRouter } from 'next/router'
import { ActiveLink } from '../ActiveLinks'
import { SignInButton } from '../SignInButton'
import styles from './styles.module.scss'

export function Header() {
  const {asPath} = useRouter()
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <img src="/images/logo.svg" alt="ig news" />
        <nav>
          <ul>
            <ActiveLink href={'/'} activeLinkClassName={styles.active}>
              Home
            </ActiveLink>
            <ActiveLink href={'/posts'}  activeLinkClassName={styles.active}>
              Posts
            </ActiveLink>
          </ul>
        </nav>
        <SignInButton />
      </div>
    </header>
  )
}