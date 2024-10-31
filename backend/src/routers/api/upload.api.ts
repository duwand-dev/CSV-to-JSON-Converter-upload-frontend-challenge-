import { Hono } from 'hono'
import path from "path";
import fs from 'fs'
import Papa from 'papaparse'
import type { APIResponse, MRFData, UploadResponse } from '../../types/types.js';

const api = new Hono();

const mrfDir: string = path.join(process.cwd(), 'mrf_files')

// Ensure directories exist
;[mrfDir].forEach((dir: string): void => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
})

async function streamToBuffer(stream: ReadableStream<Uint8Array>): Promise<Buffer> {
  const reader = stream.getReader();
  const chunks: Uint8Array[] = [];

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
  }

  const totalLength = chunks.reduce((sum, chunk) => sum + chunk.length, 0);
  const buffer = new Uint8Array(totalLength);
  let offset = 0;
  for (const chunk of chunks) {
    buffer.set(chunk, offset);
    offset += chunk.length;
  }

  return Buffer.from(buffer);
}

// Upload endpoint
api.post('/', async (c): Promise<APIResponse<UploadResponse>> => {
  try {
    const body: FormData = await c.req.formData()
    const file: FormDataEntryValue | null = body.get('file')

    if (!file || !(file instanceof File)) {
      return c.json({ error: 'No file uploaded' }, 400)
    }

    // Read file content
    const buffer: Buffer = await streamToBuffer(file.stream())
    const content: string = buffer.toString()

    // Parse the content (assuming it's valid JSON or CSV)
    let data: string = JSON.stringify(Papa.parse(content).data);

    // Create MRF file
    const mrfData: MRFData = {
      version: "1.0",
      timestamp: new Date().toISOString(),
      data: data
    }

    // Generate unique filename
    const filename: string = `mrf_${Date.now()}@${file.name.slice(0, -4)}.json`
    const mrfPath: string = path.join(mrfDir, filename)

    // Save MRF file
    fs.writeFileSync(mrfPath, JSON.stringify(mrfData, null, 2))

    return c.json({
      success: true,
      filename: filename
    })
  } catch (error) {
    const err = error as Error
    console.log(err)
    return c.json({ error: err.message }, 500)
  }
})

export default api;