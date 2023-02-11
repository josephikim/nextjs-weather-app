export const geoApiOptions = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPID_API_KEY as string,
    'X-RapidAPI-Host': process.env.NEXT_PUBLIC_RAPID_API_HOST as string,
  },
}

export const GEO_API_URL = process.env.NEXT_PUBLIC_GEO_API_URL as string
