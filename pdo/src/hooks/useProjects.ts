import { useQuery } from '@tanstack/react-query'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export const useProjects = () => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const payload = await getPayload({ config: configPromise })

      const result = await payload.find({
        collection: 'projects',
        limit: 6,
        sort: '-createdAt',
      })

      return result.docs.map((project) => ({
        id: project.id.toString(),
        name: project.name, 
        technicalNote: project.technicalNote,
        description: project.description,
        images: project.images,
        plantImages: project.plantImages,
        publishedAt: project.publishedAt,
      }))
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}
