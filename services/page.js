var client = require('./contentful').client

async function getPageData (url) {
  try {
    const result = await client.getEntries({
      content_type: 'pages',
      'fields.urlSegment': url
    })
    return result
  } catch (error) {
    console.log('ERROR: ', error)
  }
}

module.exports = {
  getPageData
}
