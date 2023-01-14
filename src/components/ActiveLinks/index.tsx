import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";


interface ActiveLinksProps extends LinkProps{
  children: string,
  activeLinkClassName: string
}

export function ActiveLink({children, activeLinkClassName, ...rest}:ActiveLinksProps){

  const {asPath} = useRouter()

  const className = asPath === rest.href 
    ? activeLinkClassName
    : ''

  return (
    <Link {...rest} className={className}>
      {children}
    </Link>
  )
}