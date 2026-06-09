export function convertHtmlStringToArray(htmlString: string) {
  const regex = /<img[^>]+src="([^">]+)"/g
  // Array to store matched src URLs
  const srcUrls = []
  let match
  while ((match = regex.exec(htmlString)) !== null) {
    srcUrls.push(match[1]) // Push the src URL (group 1 of the match) into the array
  }
  return srcUrls
}

export function GetUrlsArray(images: any) {
  return images?.map((edge: any) => edge.node.sourceUrl)
}
