const Base = require('./base')
// class Base {
//   constructor (name) {
//     this.name = name
//   }
//   async successRes (ctx, data, msg) {
//     console.dir('successRes:')
//     const body = {
//       code: 200,
//       msg: msg || 'success',
//       data: data || {}
//     }
//     ctx.response.status = 200
//     ctx.response.type = 'json'
//     ctx.response.body = body
//     return ctx
//     // console.dir(ctx)
//   }
//   errorRes (status, msg) {
//     this.ctx.body = {
//       status: status,
//       msg: msg || 'error',
//       data: ''
//     }
//   }
//   static async article333() {
//     console.dir('article333')
//   }
// }
class Controller extends Base {
  constructor (name) {
    super(name)
  }
  static commonSuccess (ctx, data, msg) {
  // commonSuccess (data, msg) {
    ctx.body = {
      status: 200,
      msg: msg || 'success',
      data: data || {}
    }
    return ctx
  }
  // controller
  static article(ctx) {
    ctx.response.status = 200
    ctx.response.type = 'json'
    ctx.response.body = {
      title: 'ctx article',
      tags: ['news', 'sports'],
      article: 'ctx Tommy Pham thinks a new stadium or even relocation might be needed to draw more fans to the Rays games.'
    }
    // return ctx
    const body = {
      title: 'ctx article',
      tags: ['news', 'sports'],
      article: 'ctx Tommy Pham thinks a new stadium or even relocation might be needed to draw more fans to the Rays games.'
    }
    Controller.commonSuccess(ctx, body, 'success article')
    // const ret = {
    //   title: 'controller article',
    //   tags: ['news', 'sports'],
    //   article: 'Tommy Pham thinks a new stadium or even relocation might be needed to draw more fans to the Rays games.'
    // }
    // this.successRes(ret)
  }
  async commonSuccess2(ctx, data, msg) {
    ctx.body = {
      status: 200,
      msg: msg || 'commonSuccess2',
      data: data || {}
    }
    return ctx
  }
  async selfSuccess() {
    console.dir('selfSuccess')
  }
  async article2(ctx, next) {
    // console.dir(ctx)
    console.log('this: ')
    console.log(this)
    const body = {
      title: '111111111ctx article2',
      tags: ['news', 'sports'],
      article: 'ctx Tommy Pham thinks a new stadium or even relocation might be needed to draw more fans to the Rays games.'
    }
    // this.commonSuccess2(ctx, body, 'success article')
    await this.selfSuccess()
    let res = await this.successRes(ctx, body, 'success article')
    return res
    // console.dir('over')
    // next()
    // await this.successRes(ctx, body, 'success article')
  }
  async article3(ctx, next) {
    console.dir('article3')
    // this.article33() // undefined
    Controller.article33()
    // super.article333() // undefined
    Controller.article333() // ok：继承的静态方法
    Base.article333() // 这也ok的
    ctx.response.type = 'json'
	  ctx.response.body = { type: 'article3' }
  }
  static async article33() {
    console.dir('article33')
  }
}

// let con = new Controller('guojc')
// con.article2()

module.exports = new Controller('guojc online')
// module.exports = Controller
// module.exports = con
