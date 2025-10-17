import type { Payload } from 'payload'

// Empty function for now - team members will be created through the admin panel
// since they require media uploads (image is required)
export const seedTeamMembers = async (payload: Payload): Promise<void> => {
  // Team members will be created via admin panel with proper media uploads
  payload.logger.info('Team members will be created via admin panel')
}
