import React from 'react';
import { connect } from 'react-redux';
import { RootState } from 'reducers';
import ReactMarkdown from 'react-markdown';
import { toArray } from 'react-emoji-render';

export interface ownProps {
  text: string,
}

const mapStateToProps = ({ chat }: RootState, ownState: ownProps) => ({
  ...chat,
  ...ownState,
});

export type SlackMessageTextProps = ReturnType<typeof mapStateToProps>

const SlackMessageText = ({
  users,
  text,
}: SlackMessageTextProps) => {
  const searchUserValue = (_: string, matched: string) => {
    if (users[matched]) {
      return `@${users[matched].display}`;
    }

    return `@${matched}`;
  };

  const formatText = (fText: string) => {
    const regex = /<[@|!]([a-z\d_]+)>/ig;

    if (!regex.test(fText)) { return fText; }

    return fText.replace(regex, searchUserValue);
  };

  // https://www.npmjs.com/package/react-emoji-render
  const parseEmojis = (value: any): string => {
    const emojisArray = toArray(value);

    // toArray outputs React elements for emojis and strings for other
    const newValue: any = emojisArray.reduce((previous, current) => {
      if (typeof current === 'string') {
        return previous + current;
      }

      return previous + current.props.children;
    }, '');

    return newValue;
  };

  return <ReactMarkdown className="chat__head__message__text" linkTarget="_blank" source={parseEmojis(formatText(text))} />;
};

export default connect(mapStateToProps)(SlackMessageText);
