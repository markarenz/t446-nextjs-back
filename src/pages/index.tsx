import type { NextPage } from 'next';
import Layout from '../components/Layout';
import T446Logo from '../components/img/T446Logo';
import styles from '../styles/modules/Dashboard.module.scss';

const Dashboard: NextPage = () => {
  const pageMeta = {
    title: 'Home',
    metedesc: 'This is the dashboard for the T446 Content app'
  };
  return (
    <Layout pageMeta={pageMeta}>
      <div className={styles.pageRoot}>
        <div className={styles.logoWrap}>
          <T446Logo />
          <h2 className="mb-2">Troop 446 CMS</h2>
          <div className="container-lg">
            <h2>Welcome</h2>
            <p>
              Welcome to the Troop 446 Content Management System. With this
              tool, you can edit the data used by the frontend website. To
              publish your changes, use the publish tool for each type of item:
              page, gallery, alert, etc.
            </p>
            <h2>Markdown</h2>
            <p>
              Markdown is a simple, lightweight markup language for text. It's
              highly readable and easy to use. We use this for many of the
              textboxes in galleries, alerts, and pages. If you see an "eye"
              icon on a textbox, it uses markdown. click on the eye to preview
              how the text will be formatted.
            </p>
            <p>
              For more information on Markdown, check out this{' '}
              <a
                href="https://www.markdownguide.org/cheat-sheet/"
                style={{ fontWeight: 'bold' }}
                target="_blank"
                rel="noopener noreferrer"
              >
                cheat sheet
              </a>
              . There are only a few items you'll use regularly: headlines,
              bold, italics, bullet lists, and links.
            </p>
            <p>
              For a headline (h2, h3, etc.) add a few #'s at the start of a
              line. For example: <code>## This is a Headline</code>
            </p>
            <p>
              For bold, wrap the text in two asterisks like this:{' '}
              <code>Some of this text **is bold**</code>.
            </p>
            <p>
              For italics, wrap the text in underscores or single asterisks like
              this: <code>Some of this text *is bold*</code>.
            </p>
            <p>
              For bullet lists, add a dash at the start of a line. You can
              indent 2 spaces to make a nested list.
            </p>
            <p>
              Links are easy. Just wrap the link text in square brackets and the
              link in parenthesis, like this:
              <code>[Text for link](https://www.website.com/page)</code>.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
