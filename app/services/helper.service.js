export const GetPostImageUrl = (post) => {
    return _.get(post, `_embedded["wp:featuredmedia"][0].source_url`) || "/static/img/logo.png"
};

export const GetPostImageStyle = (post) => {
    return {backgroundImage: `url("${GetPostImageUrl(post)}")`}
};

export const Backgroundify = (image = "/static/img/logo.png") => {
    if (!image) image = "/static/img/logo.png";
    return {backgroundImage: `url("${image}")`}
};

export const NormalizeComponents = (components) => {
    if (!components) return [];

    return JSON.parse(components);
};