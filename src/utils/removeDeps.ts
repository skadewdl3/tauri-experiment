import { resolveResource } from '@tauri-apps/api/path'
import { Command } from '@tauri-apps/api/shell'

// Install Uncomplicated Firewall
const removeUFW = async (): Promise<boolean> => {
  console.log('this ran')
  let script = await resolveResource('resources/remove_deps.sh')
  let command = new Command('bash', [script, 'ufw'])
  let result = await command.execute()
  return result.code === 0
}

// Uses the id of the dependency to
// call the correct function to install it
const remove = (id: string): Promise<boolean> => {
  switch (id) {
    case 'ufw':
      return removeUFW()
    default:
      return Promise.resolve(false)
  }
}
export default {
  remove,
}
