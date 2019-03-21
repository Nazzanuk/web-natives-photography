export const NormalizeArticle = (article) => {
    article.title         = _.get(article, "title.rendered");
    article.content       = _.get(article, "content.rendered");
    article.excerpt       = _.get(article, "excerpt.rendered");
    article.summary       = _.get(article, "acf.summary");
    article.featuredImage = _.get(article, "featured_media");

    const components   = _.get(article, "acf.components");
    article.components = components ? JSON.stringify(components) : null;

    return article;
};

export const NormalizePage = (page) => {
    page.title         = _.get(page, "title.rendered");
    page.content       = _.get(page, "content.rendered");
    page.excerpt       = _.get(page, "excerpt.rendered");
    page.summary       = _.get(page, "acf.summary");
    page.featuredImage = _.get(page, "featured_media");
    page.visibleTitle  = _.get(page, "acf.visibleTitle");

    const components = _.get(page, "acf.components");
    page.components  = components ? JSON.stringify(components) : null;

    return page;
};

export const NormalizeUser = (user) => {
    user.profileImage    = _.get(user, "acf.profileImage.url");
    user.backgroundImage = _.get(user, "acf.backgroundImage.url");

    return user;
};

export const NormalizeMedia = (media) => {
    media.title    = _.get(media, "title.rendered");
    media.caption  = _.get(media, "caption.rendered");
    media.url      = _.get(media, "source_url");
    media.largeUrl = _.get(media, "media_details.sizes['twentyseventeen-thumbnail-avatar']source_url");

    return media;
};

export const NormalizeProject = (project) => {
    project.title   = _.get(project, "title.rendered");
    project.summary = _.get(project, "acf.summary");
    project.images = _.get(project, "acf.images");

    return project;
};

export const NormalizeSet = (project) => {
    project.title    = _.get(project, "title.rendered");
    project.summary  = _.get(project, "acf.summary");
    project.projects = _.get(project, "acf.projects");


    return project;
};