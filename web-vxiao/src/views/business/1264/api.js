import http from '@/utils/http'
export default {
  /**
   * 普通加载勋章列表
   * @param  {[type]} groupId [description]
   * @return {[type]}         [description]
   */
  loadMedalList(groupId) {
    return http.get(`/business/teacherevaluation/list/category/${groupId}`)
  },
  /**
   * 加载勋章列表需要加isSend = 1
   * @param  {[type]} groupId [description]
   * @return {[type]}         [description]
   */
  loadMedalListSend(groupId, isSend) {
    return http.get(`/business/teacherevaluation/list/category/${groupId}?${isSend}`)
  },
  /**
   * 加载显示设置列表
   * @param  {[type]} groupId [description]
   * @return {[type]}         [description]
   */
  loadShowSettingList(groupId) {
    return http.get(`/business/evaluation/list/yearschool/show/${groupId}`)
  },

  /**
   * 加载颁发数权限设置表格数据
   * @param  {[type]} groupId [description]
   * @return {[type]}         [description]
   */
  loadAuthTableData(groupId) {
    return http.get(`/business/evaluation/upper/limit/info/${groupId}`)
  },

  /**
   * 勋章编辑提交
   * @param  {[type]} groupId [description]
   * @return {[type]}         [description]
   */
  commitMedalData(category) {
    return http.post('/business/teacherevaluation/add/category', category)
  },

  /**
   * 加载勋章适用范围数据
   * @param  {[type]} groupId [description]
   * @return {[type]}         [description]
   */
  loadRangeData(groupId) {
    return http.get(`/business/evaluation/use/range/${groupId}`)
  },

  /**
   * 加载勋章适用范围数据
   * @param  {[type]} groupId [description]
   * @return {[type]}         [description]
   */
  loadMedalData(medalId) {
    return http.get(`/business/evaluation/query/category/${medalId}`)
  },

  /**
   * 加载勋章适用范围数据
   * @param  {[type]} groupId [description]
   * @return {[type]}         [description]
   */
  loadConditionData() {
    return http.get(`/business/evaluation/list/category?type=1264`)
  },

  /**
   * 加载評比勛章数据
   * @param  {[type]} groupId [description]
   * @return {[type]}         [description]
   */
  loadRatingMedalData(groupId) {
    return http.get(`/business/evaluation/list/ratingMedal/${groupId}`)
  },

  /**
   * 加载极速勋章数据
   * @param  {[type]} groupId [description]
   * @return {[type]}         [description]
   */
  loadSpeedMedalData(groupId) {
    return http.get(`/business/evaluation/list/topspeed/${groupId}`)
  },

  /**
   * 设置权限提交
   * @param  {[type]} groupId [description]
   * @return {[type]}         [description]
   */
  commitAuthData(groupId, data) {
    return http.post(`/business/evaluation/upper/limit/${groupId}`, {
      upperlimit: data
    })
  },

  /**
   * 批量设置权限提交
   * @param  {[type]} groupId [description]
   * @return {[type]}         [description]
   */
  commitBatchAuthData(groupId, data) {
    return http.post(`/business/evaluation/upper/limit/batchSet/${groupId}`, {
      groupId: groupId,
      upperlimit: data
    })
  },

  /**
   * 加载学生/小组列表
   * @param  {[type]} groupId [description]
   * @return {[type]}         [description]
   */
  loadStudentsAndTeams(groupId) {
    return http.get(`/business/evaluation/list/studentList/${groupId}`)
  },

  /**
   * 加载评价用户可选勋章
   * @param  {[type]} groupId [description]
   * @return {[type]}         [description]
   */
  loadUserMedals(groupId) {
    return http.get(`/business/teacherevaluation/list/category/${groupId}`)
  },

  /**
   * 报表雷达图
   * @param  {[type]} groupId [description]
   * @return {[type]}         [description]
   */
  loadRadarData(params) {
    let url = `/business/evaluation/query/randar/${params.groupId}?timeType=${params.timeType}&startTime=${params.startTime}&endTime=${
      params.endTime
    }`
    if (params.userId) {
      url = `${url}&userId=${params.userId}`
    }
    return http.get(url)
  },

  /**
   * 报表雷达图
   * @param  {[type]} groupId [description]
   * @return {[type]}         [description]
   */
  loadMedalWallData(params) {
    let url = `/business/evaluation/medal/wall/${params.groupId}?timeType=${params.timeType}&startTime=${params.startTime}&endTime=${params.endTime}`
    if (params.userId) {
      url = `${url}&userId=${params.userId}`
    }
    return http.get(url)
  },

  /**
   * 获取额外权限列表
   * @param  {[type]} groupId [description]
   * @return {[type]}         [description]
   */
  getExtraAuthList(schoolId) {
    return http.get(`/business/evaluation/list/extra/${schoolId}`)
  },

  /**
   * 保存额外权限分数
   * @param  {[type]} groupId [description]
   * @return {[type]}         [description]
   */
  saveExtraScore(datas) {
    return http.post(`/business/evaluation/add/extra`, { extras: datas })
  }
}