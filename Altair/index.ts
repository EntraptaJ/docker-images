import * as Koa from 'koa';
import * as KoaRouter from '@koa/router';
import { createRouteExplorer } from 'altair-koa-middleware';
const app = new Koa();
const router = new KoaRouter();

createRouteExplorer({
  url: '/altair',
  router,
  opts: {}
});

router.get('/', (ctx) => ctx.redirect('/altair'))

app.use(router.routes()).use(router.allowedMethods());

app.listen(80);
