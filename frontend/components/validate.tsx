import React, { useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';

/**
 * @TODO
 * axios request back to the slack api to receive the token
 * with the retrieved code as the payload. This should be handled
 * with the sagas to be pushed to the reducer auth. Once "data" is true
 * then it'll push back to the "/" path where it should be used as login there
 */
const Validate = () => {
  const { code } = useParams();

  useEffect(() => {
    console.error(code);
  }, []);

  return <Fragment />;
};

export default Validate;
