const isNetlifyProdDeploy = process.env.CONTEXT === 'production';
const isNetlifyPreviewOrBranchDeploy =
  process.env.CONTEXT === 'deploy-preview' || process.env.CONTEXT === 'branch-deploy';

export function getBaseUrl() {
  if (typeof window !== 'undefined') {
    // browser should use relative path
    return '';
  }

  if (process.env.URL && isNetlifyProdDeploy) {
    // reference for Netlify (production)
    return process.env.URL;
  }

  if (process.env.DEPLOY_PRIME_URL && isNetlifyPreviewOrBranchDeploy) {
    // reference for Netlify (deploy preview)
    return process.env.DEPLOY_PRIME_URL;
  }

  if (process.env.DEPLOY_URL) {
    // reference for Netlify (commit hash id)
    return process.env.DEPLOY_URL;
  }

  if (process.env.VERCEL_URL) {
    // reference for vercel.com
    return `https://${process.env.VERCEL_URL}`;
  }

  if (process.env.RENDER_INTERNAL_HOSTNAME) {
    // reference for render.com
    return `http://${process.env.RENDER_INTERNAL_HOSTNAME}:${process.env.PORT}`;
  }

  // assume localhost
  return `http://localhost:${process.env.PORT ?? 3000}`;
}
