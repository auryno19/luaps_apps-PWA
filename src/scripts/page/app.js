import UrlParser from '../route/urlParser';
import routes from '../route/routes';

const app = {
  async renderPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    const page = routes[url];
    // this._content.innerHTML = await page.render();
    await page.afterRender();
  },
};

export default app;
