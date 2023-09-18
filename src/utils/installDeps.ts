import { resolveResource } from '@tauri-apps/api/path'
import { Command } from '@tauri-apps/api/shell'

// Install Uncomplicated Firewall
const installUFW = async (): Promise<boolean> => {
  let script = await resolveResource('resources/install_deps.sh')
  let command = new Command('bash', [script, 'ufw'])
  let result = await command.execute()
  return result.code === 0
}

// Uses the id of the dependency to
// call the correct function to install it
const install = (id: string): Promise<boolean> => {
  switch (id) {
    case 'ufw':
      return installUFW()
    default:
      return Promise.resolve(false)
  }
}
export default {
  install,
}
