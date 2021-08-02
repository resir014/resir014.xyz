import * as path from 'path'

// eslint-disable-next-line import/prefer-default-export
export function getContentDirectory(...paths: string[]) {
  return path.join(process.cwd(), ...paths)
}
