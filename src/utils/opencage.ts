import opencage from 'opencage-api-client'

export const forwardGeocode = async (query: string) => {
  return opencage
    .geocode({ q: query })
    .then((data) => {
      // console.log(JSON.stringify(data));
      if (data.results.length > 0) {
        const place = data.results[0]
        console.log(place.formatted)
        console.log(place.geometry)
        console.log(place.annotations.timezone.name)
        return data.results
      } else {
        console.log('Status', data.status.message)
        console.log('total_results', data.total_results)
        return {
          status: data.status.messsage,
          total_results: data.total_results,
        }
      }
    })
    .catch((error) => {
      // console.log(JSON.stringify(error));
      console.log('Error', error.message)
      // other possible response codes:
      // https://opencagedata.com/api#codes
      if (error.status.code === 402) {
        console.log('hit free trial daily limit')
        console.log('become a customer: https://opencagedata.com/pricing')
      }
      return {
        error: true,
        code: error.status.code,
      }
    })
}
