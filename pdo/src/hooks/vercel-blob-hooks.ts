import { put, del } from '@vercel/blob'
import type { CollectionBeforeChangeHook, CollectionAfterDeleteHook } from 'payload'

export const vercelBlobBeforeChange: CollectionBeforeChangeHook = async ({
  data,
  req,
  operation,
}) => {
  // Only handle file uploads
  if (operation === 'create' && data.filename && req.file) {
    try {
      // Use the file data buffer from req.file
      const fileData = req.file.data
      const fileName = data.filename
      
      const result = await put(`media/${fileName}`, fileData, {
        access: 'public',
        addRandomSuffix: false,
        contentType: req.file.mimetype,
      })
      
      // Update the URL to point to Vercel Blob
      data.url = result.url
      
      console.log(`Successfully uploaded file to Vercel Blob: ${result.url}`)
    } catch (error) {
      console.error('Error uploading to Vercel Blob:', error)
      throw error
    }
  }
  
  return data
}

export const vercelBlobAfterDelete: CollectionAfterDeleteHook = async ({
  doc,
  req,
}) => {
  // Delete the file from Vercel Blob when the document is deleted
  if (doc.filename) {
    try {
      await del(`media/${doc.filename}`)
      console.log(`Successfully deleted file from Vercel Blob: media/${doc.filename}`)
    } catch (error) {
      console.error('Error deleting file from Vercel Blob:', error)
      // Don't throw error to prevent breaking the delete operation
    }
  }
}
