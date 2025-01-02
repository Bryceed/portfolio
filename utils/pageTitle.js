const siteName = "Wellington N.";

export function getPageTitle({ mainPage, title } = {}) {
  if (title) {
    return `${title} - ${mainPage} | ${siteName}`;
  } else if (mainPage) {
    return `${mainPage} | ${siteName}`;
  } else {
    return `${siteName} portfolio`;
  }
}
