export const formatStoreArticleId = (id: string) => {
  const nameStr = `article_${id}`
  return nameStr
}

export const formatStorePagePath = (pagePath: string) => {
  const pathArray = pagePath.split('/')
  pathArray.shift()
  let pagePathStr = ''
  for (let i = 1; i < pathArray.length; i++) {
    if (i == pathArray.length) {
      pagePathStr = `${pagePathStr + pathArray[i]}`
    } else {
      pagePathStr = `${pagePathStr + pathArray[i]}-`
    }
  }
  return pagePathStr
}
