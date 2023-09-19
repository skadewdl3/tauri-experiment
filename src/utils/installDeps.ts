import { resolveResource } from '@tauri-apps/api/path'
import { Command } from '@tauri-apps/api/shell'

// Install Uncomplicated Firewall
const installUFW = (callback: (str: string) => void): Promise<boolean> => {
  return new Promise(async (resolve) => {
    let script = await resolveResource('resources/install_deps.sh')
    let command = new Command('bash', [script, 'ufw'])
    command.on('close', (result) => {
      resolve(result.code === 0)
    })
    if (callback) {
      command.stdout.on('data', (data) => callback(data))
      command.stderr.on('data', (data) => callback(data))
    }

    command.spawn()
  })
}

// Uses the id of the dependency to
// call the correct function to install it
const install = (
  id: string,
  callback: (str: string) => void
): Promise<boolean> => {
  switch (id) {
    case 'ufw':
      return installUFW(callback)
    default:
      return Promise.resolve(false)
  }
}
export default {
  install,
}
