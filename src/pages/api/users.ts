import { NextApiRequest, NextApiResponse } from "next"


export default function listUsers(request: NextApiRequest, response: NextApiResponse) {

  const users = [
    {
      name: 'Davi',
    },
    {
      name: 'Victor'
    },
    {
      name: 'Halisson'
    }
  ]

  return response.json(users)
}