import { Hono } from 'hono'
import { serveStatic } from '@hono/node-server/serve-static'
import { serve } from '@hono/node-server'
import fs from 'fs'
import path from 'path'
import Papa from 'papaparse'
import type { APIResponse, MRFData, MRFFileInfo, UploadResponse } from '../../types/types.js';

const api: Hono = new Hono()

const mrfDir: string = path.join(process.cwd(), 'mrf_files')

// Serve static files from the MRF directory
api.use('/mrf/*', serveStatic({ root: './' }))

// Get list of MRF files
api.get('/mrf-files', async (c): Promise<APIResponse<MRFFileInfo[]>> => {
  try {
    const files: string[] = fs.readdirSync(mrfDir)
    const mrfFiles: MRFFileInfo[] = files
      .filter((file: string): boolean => file.endsWith('.json'))
      .map((file: string): MRFFileInfo => {
        const filePath: string = path.join(mrfDir, file)
        const stats: fs.Stats = fs.statSync(filePath)
        return {
          name: file,
          size: stats.size,
          created: stats.birthtime,
          modified: stats.mtime
        }
      })

    return c.json(mrfFiles)
  } catch (error) {
    const err = error as Error
    return c.json({ error: err.message }, 500)
  }
})

export default api