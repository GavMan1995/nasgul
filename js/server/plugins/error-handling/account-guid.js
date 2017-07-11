import jwt from 'jsonwebtoken'

export default function accountGuid (token) {
  const claims = jwt.decode(token)

  return (claims && claims.sub) || ''
}
