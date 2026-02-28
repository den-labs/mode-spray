import { enviroment } from '~~/config'

// used on chain icons
export const baseSite = enviroment.debug
  ? 'http://localhost:3000'
  : enviroment.lab
  ? 'https://modespray-lab.vercel.app'
  : 'https://modespray-mainnet.vercel.app'

export const labelSite = enviroment.lab ? 'Spray Laboratory' : 'Spray Production'

// switch envs
export const baseSiteLink = enviroment.debug
  ? 'http://localhost:3000'
  : enviroment.lab
  ? 'https://modespray-mainnet.vercel.app'
  : 'https://modespray-lab.vercel.app'

export const labeSiteLink = enviroment.lab ? 'Spray Production' : 'Spray Laboratory'
