import { Buffer } from 'buffer'

export default function getBusinessFromCookie (request) {
  if (!request.state.business) return {}

  try {
    const business = JSON.parse(Buffer.from(request.state.business, 'base64').toString('utf-8'))
    business.branding_image_url = Buffer.from(business.branding_image_url, 'base64').toString('utf-8')

    return business
  } catch (error) {
    console.warn('Failed to part business cookie')
    console.warn(error)

    return {}
  }
}
