import React from 'react';
import truncate from 'lodash/truncate';

export type fileType = {
  title: string,
  permalink: string,
  filetype: string,
  // eslint-disable-next-line camelcase
  url_private: string,
}

export type SlackMessageFileProps = {
  file: fileType,
};

/**
 * Random files seems to be not loaded properly on
 * their containers. Console errors states about CORB issues:
 *
 * https://www.chromestatus.com/feature/5629709824032768
 */
const SlackMessageFile = ({ file }: SlackMessageFileProps) => {
  const title = truncate(file.title, { length: 25 });

  if (['png', 'jpeg', 'jpg'].includes(file.filetype.toLocaleLowerCase())) {
    return (
      <a href={file.url_private} target="_blank" rel="noreferrer">
        <img
          src={file.url_private}
          alt={title}
          width="100%"
          onError={(e) => {
            e.target.alt = 'Image failed to load. Click here to open in new tab';
          }}
        />
      </a>
    );
  }

  if (['webm', 'mp4'].includes(file.filetype.toLocaleLowerCase())) {
    return (
      // eslint-disable-next-line jsx-a11y/media-has-caption
      <video width="100%" controls>
        <source
          src={file.url_private}
          type="video/mp4"
          alt={file.title}
          onError={(e) => {
            e.target.alt = 'Video failed to load. Click here to open in new tab';
          }}
        />
        Your browser does not support the video tag.
      </video>
    );
  }
  return <a download href={file.permalink}>{file.title}</a>;
};

export default SlackMessageFile;
