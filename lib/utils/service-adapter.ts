// lib/utils/service-adapter.ts
import type {
  Service,
  ServiceUseCase,
  ProcessStep,
  ServicePackage,
} from "@/lib/types/services";

// Types from database
interface DbServiceUseCase {
  id: string;
  title: string;
  description: string;
  image_url: string | null;
  display_order: number;
}

interface DbProcessStep {
  id: string;
  step_number: number;
  title: string;
  description: string;
}

interface DbPackage {
  id: string;
  name: string;
  description: string;
  starting_price: string | null;
  features: string[];
  display_order: number;
}

interface DbService {
  id: string;
  name: string;
  slug: string;
  tagline: string | null;
  description: string;
  icon: string;
  thumbnail_url: string | null;
  what_we_do: string[] | null;
  gallery: string[] | null;
  display_order: number | null;
  service_use_cases?: DbServiceUseCase[];
  service_process_steps?: DbProcessStep[];
  service_packages?: DbPackage[];
  relatedServices?: Array<{
    id: string;
    name: string;
    slug: string;
    tagline: string;
    icon: string;
  }>;
}

export function adaptDbServiceToService(dbService: DbService): Service {
  return {
    id: dbService.id,
    name: dbService.name,
    slug: dbService.slug,
    tagline: dbService.tagline || "",
    description: dbService.description,
    icon: dbService.icon,
    whatWeDo: dbService.what_we_do || [],
    useCases: (dbService.service_use_cases || [])
      .sort((a, b) => a.display_order - b.display_order)
      .map(
        (uc): ServiceUseCase => ({
          title: uc.title,
          description: uc.description,
          image: uc.image_url || "/placeholder.svg?height=400&width=600",
        })
      ),
    process: (dbService.service_process_steps || [])
      .sort((a, b) => a.step_number - b.step_number)
      .map(
        (ps): ProcessStep => ({
          step: ps.step_number,
          title: ps.title,
          description: ps.description,
        })
      ),
    packages: (dbService.service_packages || [])
      .sort((a, b) => a.display_order - b.display_order)
      .map(
        (pkg): ServicePackage => ({
          name: pkg.name,
          description: pkg.description,
          startingPrice: pkg.starting_price || undefined,
          features: pkg.features,
        })
      ),
    gallery: dbService.gallery || [],
    relatedServices: dbService.relatedServices?.map((rs) => rs.id),
  };
}

export function adaptDbServicesToServices(dbServices: DbService[]): Service[] {
  return dbServices.map(adaptDbServiceToService);
}
