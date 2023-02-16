import prisma from '../src/utils/prisma'

const location = {
  label: 'San Francisco, US',
  latitude: 37.78,
  longitude: -122.42,
}

function seedLocation(location: any) {
  const data = {
    label: location.label,
    latitude: location.latitude,
    longitude: location.longitude,
  }

  prisma.location
    .create({ data })
    .then(() => console.info('[SEED] Successfully created location record'))
    .catch((e) => console.error('[SEED] Failed to create location record', e))
}

seedLocation(location)
