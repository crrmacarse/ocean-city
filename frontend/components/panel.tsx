import React from 'react';

const Panel = ({
  list,
}: { list: any[] }) => (
  <ul className="side__panel">
    {list.map((l) => <li>{l.name}</li>)}
  </ul>
);

export default Panel;
