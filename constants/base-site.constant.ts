import { enviroment } from '~~/config'

// used on chain icons
export const baseSite = enviroment.debug
  ? 'http://localhost:3000'
  : enviroment.lab
  ? 'https://modespray.vercel.app/lab'
  : 'https://modespray.vercel.app/app'

export const labelSite = enviroment.lab ? 'Spray Laboratory' : 'Spray Production'

// switch envs
export const baseSiteLink = enviroment.debug
  ? 'http://localhost:3000'
  : enviroment.lab
  ? 'https://modespray.vercel.app/app'
  : 'https://modespray.vercel.app/lab'

export const labeSiteLink = enviroment.lab ? 'Spray Production' : 'Spray Laboratory'
