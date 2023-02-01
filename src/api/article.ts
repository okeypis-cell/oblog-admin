import request from '@/utils/request'

export const getArticleList = (params: BaseQuery) => {
  return request({
    url: '/api/getArticleList',
    params
  })
}

export const getArticleDetail = (id: string) => {
  return request({
    url: '/api/getArticleDetail/' + id
  })
}
