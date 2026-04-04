import * as fs from "fs"
import * as path from "path"

/**
 * Get email password from env or from a file.
 * Use EMAIL_PASSWORD_FILE when the password contains #, $, or quotes that break .env parsing
 * (e.g. next-sitemap / @next/env will crash on $ in values).
 *
 * - If EMAIL_PASSWORD_FILE is set: read the first line (trimmed) from that path.
 *   Path is relative to process.cwd() unless absolute.
 * - Otherwise: use EMAIL_PASSWORD from env.
 *
 * In .env.local use:
 *   EMAIL_PASSWORD_FILE=.env.email-password
 * and put the real password as the first line in .env.email-password (that file is gitignored).
 */
export function getEmailPassword(): string | undefined {
  const filePath = process.env.EMAIL_PASSWORD_FILE?.trim().replace(/^["']|["']$/g, "")
  if (filePath) {
    try {
      const resolved = path.isAbsolute(filePath)
        ? filePath
        : path.resolve(process.cwd(), filePath)
      const raw = fs.readFileSync(resolved, "utf8")
      const line = raw.split(/\r?\n/)[0]
      return line?.trim() ?? ""
    } catch (err) {
      console.error("Failed to read EMAIL_PASSWORD_FILE:", (err as Error).message)
      return undefined
    }
  }
  return process.env.EMAIL_PASSWORD
}
