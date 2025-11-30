export interface Service {
  id: string
  name: string
  slug: string
  tagline: string
  description: string
  icon: string
  whatWeDo: string[]
  useCases: ServiceUseCase[]
  process: ProcessStep[]
  packages?: ServicePackage[]
  gallery: string[]
  relatedServices?: string[]
}

export interface ServiceUseCase {
  title: string
  description: string
  image: string
}

export interface ProcessStep {
  step: number
  title: string
  description: string
}

export interface ServicePackage {
  name: string
  description: string
  startingPrice?: string
  features: string[]
}
