import { html } from "../shared/html.js";
import cc from "../web_modules/classcat.js";
import { ChangeTab, ChangePage } from "./actions.js";
import { TAG_FEED } from "./feedNames.js";
import { profile, article as articleLink } from "../shared/pages.js";
import { format } from "../shared/date.js";
import { pages } from "./selectors.js";

const Banner = () =>
  html`
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>
  `;

const FeedTab = ({ active, visible, type, name }, children) =>
  visible
    ? html`
        <li class="nav-item">
          <a
            href=""
            class="${cc({ "nav-link": true, active: active === type })}"
            onClick=${[ChangeTab, { name, type }]}
          >
            ${children}
          </a>
        </li>
      `
    : "";

const FavoriteButton = ({ article }) => {
  const style = article.favorited ? "btn-primary" : "btn-outline-primary";

  return html`
    <button class=${"btn btn-sm btn-primary pull-xs-right " + style}>
      <i class="ion-heart" /> ${article.favoritesCount}
    </button>
  `;
};

const ArticlePreview = ({ article }) => html`
  <div class="article-preview">
    <div class="article-meta">
      <a href=${profile(article.author.username)}>
        <img src=${article.author.image} />
      </a>
      <div class="info">
        <a class="author" href=${profile(article.author.username)}>
          ${article.author.username}
        </a>
        <span class="date">${format(article.createdAt)}</span>
      </div>
      ${FavoriteButton({ article })}
    </div>
    <a href=${articleLink(article.slug)} class="preview-link">
      <h1>${article.title}</h1>
      <p>${article.description}</p>
      <span>Read more...</span>
      <ul class="tag-list">
        ${article.tagList.map(tag => {
          return html`
            <li class="tag-default tag-pill tag-outline" key=${tag}>
              ${tag}
            </li>
          `;
        })}
      </ul>
    </a>
  </div>
`;

const ListPagination = ({ pages }) => {
  if (pages.length < 2) {
    return "";
  }
  return html`
    <nav>
      <ul class="pagination">
        ${pages.map(
          page =>
            html`
              <li
                class=${page.isCurrent ? "page-item active" : "page-item"}
                key=${String(page.index)}
              >
                <a
                  class="page-link"
                  href=""
                  onClick=${[ChangePage, { currentPageIndex: page.index }]}
                >
                  ${page.humanDisplay}
                </a>
              </li>
            `
        )}
      </ul>
    </nav>
  `;
};

const ArticleList = ({ isLoading, articles, pages }) => {
  if (isLoading) {
    return html`
      <div class="article-preview">Loading...</div>
    `;
  }
  if (articles.length === 0) {
    return html`
      <div class="article-preview">No articles are here... yet.</div>
    `;
  }
  return html`
    <div>
      ${articles.map(article => ArticlePreview({ article }))}
      ${ListPagination({ pages })}
    </div>
  `;
};

const Tags = ({ tags }) => html`
  <div class="tag-list">
    ${tags.map(tag => {
      return html`
        <a
          href=""
          class="tag-pill tag-default"
          key="${tag}"
          onClick=${[ChangeTab, { type: TAG_FEED, name: tag }]}
        >
          ${tag}
        </a>
      `;
    })}
  </div>
`;

export const HomePage = ({
  user,
  articles,
  articlesCount,
  currentPageIndex,
  isLoading,
  tags,
  feeds,
  active
}) =>
  html`
    <div class="home-page" key="home-page">
      ${user ? "" : Banner()}

      <div class="container page">
        <div class="row">
          <div class="col-md-9">
            <div class="feed-toggle">
              <ul class="nav nav-pills outline-active">
                ${FeedTab({ ...feeds[0], active }, "Your Feed")}
                ${FeedTab({ ...feeds[1], active }, "Global Feed")}
                ${FeedTab(
                  { ...feeds[2], active },
                  html`
                    <i class="ion-pound" /> ${feeds[2].name}
                  `
                )}
              </ul>
            </div>
            ${ArticleList({
              articles,
              isLoading,
              pages: pages({ articlesCount, currentPageIndex })
            })}
          </div>

          <div class="col-md-3">
            <div class="sidebar">
              <p>Popular Tags</p>

              ${Tags({ tags })}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
