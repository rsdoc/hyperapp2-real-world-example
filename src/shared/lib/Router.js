import page from "../../web_modules/page.js";

const router = (dispatch, { routes }) => {
  const paths = Object.keys(routes);
  paths.forEach(path => {
    const route = routes[path];
    page(path, context => {
      dispatch(route, context.params);
    });
  });

  page.start({ hashbang: true });

  return () => {
    page.stop();
  };
};

export const RoutePages = ({ routes }) => [router, { routes }];

const redirectEffect = (dispatch, props) => page.redirect(props.path);
export const Redirect = props => [redirectEffect, props];
