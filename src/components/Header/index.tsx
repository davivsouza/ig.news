import { SignInButton } from '../SignInButton'
import styles from './styles.module.scss'

export function Header() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <img src="/images/logo.svg" alt="ig news" />
        <nav>
          <ul>
            <a className={styles.active}>Home</a>
            <a>Posts</a>
          </ul>
        </nav>
        <SignInButton />
      </div>
    </header>
  )
}