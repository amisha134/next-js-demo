export interface ProductType {
  id: number
  title: string
  description: string
  brand: string
  price: number
  category: string
  availabilityStatus: string
  discountPercentage: number
  warrantyInformation: string
  images: string[]
}

export type CharacterType = {
  id: number
  title: string
  availabilityStatus: 'unknown'
  discountPercentage: string
  type: string
  category: 'unknown'
  brand: string
  description: string
  images: string
  episode: string[]
  url: string
  warrantyInformation: string
}
