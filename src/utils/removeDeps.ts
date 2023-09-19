import { Command } from '@tauri-apps/api/shell'

// Remove Uncomplicated Firewall
const removeUFW = (callback: (str: string) => void): Promise<boolean> => {
  return new Promise(async (resolve) => {
    let script = await resolveResource('resources/remove_deps.sh')
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
const remove = (
  id: string,
  callback: (str: string) => void
): Promise<boolean> => {
  switch (id) {
    case 'ufw':
      return removeUFW(callback)
    default:
      return Promise.resolve(false)
  }
}
export default {
  remove,
}
