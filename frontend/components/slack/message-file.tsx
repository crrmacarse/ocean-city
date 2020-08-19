import React from 'react';

export type fileType = {
  title:string,
  permalink: string,
  filetype: string,
  // eslint-disable-next-line camelcase
  url_private: string,
}

export type SlackMessageFileProps = {
  file: fileType,
};

const SlackMessageFile = ({ file }: SlackMessageFileProps) => {
  if (['png', 'jpeg', 'jpg'].includes(file.filetype.toLocaleLowerCase())) {
    return (
      <a href={file.url_private} target="_blank" rel="noreferrer">
        <img src={file.url_private} alt={file.title} width="100%" />
      </a>
    );
  }

  if (['webm', 'mp4'].includes(file.filetype.toLocaleLowerCase())) {
    return (
      // eslint-disable-next-line jsx-a11y/media-has-caption
      <video width="100%" controls>
        <source src={file.url_private} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    );
  }
  return <a download href={file.permalink}>{file.title}</a>;
};

export default SlackMessageFile;
