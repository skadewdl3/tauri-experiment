import { resolveResource } from '@tauri-apps/api/path'
import { Command } from '@tauri-apps/api/shell'

const checkLynis = async (): Promise<boolean> => {
  return true
}

const checkUFW = async (): Promise<boolean> => {
  let script = await resolveResource('resources/check_deps.sh')
  let command = new Command('bash', [script, 'ufw'])
  console.log(command)
  let result = await command.execute()
  console.log(result.stdout, result.stderr)
  return result.code === 0
}

const check = async (id: string): Promise<boolean> => {
  switch (id) {
    case 'lynis':
      return checkLynis()
    case 'ufw':
      return checkUFW()
    default:
      return Promise.resolve(false)
  }
}

export default {
  check,
}
