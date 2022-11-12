# T446 CMS

> This is a simple NextJS app for creating content like pages, alerts & galleries to the T446 website.

## Features

- The T446 website is entirely headless. The frontend is deployed to a CDN as static react and consumes the JSON files produced by this application at load time to display pages and other content.
- The approach is intended to be secure and headless like Gatsby or another SSR but with no need to rebuild the project for simple content updates.
- The CMS features role-based editing of content so we can have youth and adults making changes as needed. We retain the permissions granularity we would expect from a more complex CMS without the maintenance overhead.

## Next Steps

### Phase 1

- Pages: View
  - Fields title, status, date, actions (edit, view (on live site), delete)
- Assets - image manager
- Assets - image loader

  - Resize uploaded images

- Galleries - view
- Galleries - Create
- Galleries - Edit
- Pages: Create
- Pages: Edit (basic)
- Pages: Block Style editor
  - Convert all page content to Markdown
  - Update t446-front
  - 15 blocks
