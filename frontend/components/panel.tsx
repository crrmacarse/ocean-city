import React from 'react';

const Panel = ({
  list,
}: { list: any[] }) => (
  <div className="side__panel">
    {list.map((l) => <p>{l.name}</p>)}
  </div>
);

export default Panel;
