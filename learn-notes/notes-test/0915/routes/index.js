const KoaRouter = require('koa-router')
const Controller = require('../controller/index')
// 路由前缀
const router = new KoaRouter({
  prefix: '/v2'
})
// ing: 分块注入

router.get('/', (ctx, next) => {
	ctx.body = 'index'
})
router.get('/list', (ctx, next) => {
	ctx.response.type = 'json'
	ctx.response.body = { type: 'list' }
})
router.get('/detail', (ctx, next) => {
	ctx.response.status = 200
	ctx.response.type = 'json'
	ctx.response.body = {
		title: 'Tommy Pham v111111',
		tags: ['news', 'sports'],
		article: 'Tommy Pham thinks a new stadium or even relocation might be needed to draw more fans to the Rays games.'
	}
	next()
})
// controller
// async function article(ctx) {
//   ctx.response.status = 200
// 	ctx.response.type = 'json'
// 	ctx.response.body = {
// 		title: 'article',
// 		tags: ['news', 'sports'],
// 		article: 'Tommy Pham thinks a new stadium or even relocation might be needed to draw more fans to the Rays games.'
//   }
//   return ctx
// }
// console.dir(Controller.article)
// router.get('/article', Controller.article)
// const Controller2 = new Controller()
// router.get('/article2', (ctx, next) => {
// 	ctx.response.type = 'json'
// 	ctx.response.body = { type: 'article2' }
// })
// router.get('/article2', Controller.article2) // 有（），ctx 穿不进去；无（），this.comsuccess的thisundefine
// article.artitle3()
// router.get('/article2', article.artitle3) // 有（），ctx 穿不进去；无（），this.comsuccess的thisundefine
// router.get('/article2', (ctx, next) => { article.artitle3() }) // 有（），ctx 穿不进去；无（），this.comsuccess的thisundefine
// 跑通:方法需要互相调用
router.get('/article2', (ctx, next) => { return Controller.article2(ctx, next) })
// 静态方法直接写么：单一方法时随时可用，单一方法调用静态方法也行:class名称；单一方法调用继承的静态共用方法：
router.get('/article3', Controller.article3)
// new
router.get('/index', Controller.index)
module.exports = router