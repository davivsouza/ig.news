import { FaGithub } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'
import {signIn, useSession, signOut} from 'next-auth/react'
import styles from './styles.module.scss'


export function SignInButton() {

  const {data,status} = useSession()

  return status === 'authenticated' ? (
    <button 
      className={styles.signInButton} 
      type="button"
      onClick={() => signOut()}
    >
      <FaGithub color='#04d361' />
      {data.user?.name}
      <FiX color='#737380' className={styles.closeIcon}/>
    </button >
  )
    : (
      <button className={styles.signInButton} type="button" onClick={() => signIn('github')}>
        <FaGithub color='#eba417' />
        Sign in with Github
      </button >
    )
}