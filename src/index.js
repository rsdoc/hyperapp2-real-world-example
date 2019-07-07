import { app } from "./web_modules/hyperapp.js";
import { RoutePages } from "./routing/Router.js";
import { view } from "./shared/view.js";
import { pages, routes, HOME } from "./routing/pages.js";
import { USER_FEED, GLOBAL_FEED, TAG_FEED } from "./home/feeds.js";

const initialState = {
  page: HOME,
  articles: [],
  tags: [],
  feeds: {
    [USER_FEED]: { visible: false, active: false, type: USER_FEED },
    [GLOBAL_FEED]: { visible: true, active: true, type: GLOBAL_FEED },
    [TAG_FEED]: { visible: false, active: true, type: TAG_FEED, name: "" }
  },
  // user: {
  //   image:
  //     "https://s3.amazonaws.com/uifaces/faces/twitter/marcoramires/128.jpg",
  //   name: "matt"
  // },
  user: null,
  isLoading: false
};

app({
  init: () => [initialState],
  view,
  subscriptions: state => [RoutePages({ routes })],
  node: document.getElementById("app")
});
