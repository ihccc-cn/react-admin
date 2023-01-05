import React from "react";
import { ReactSortable } from "react-sortablejs";
import { uuid } from "@/utils/utils";
import InputCell from "../../components/input-cell";

function InputList({ group, items }) {
  const [source, setSource] = React.useState(items || []);

  return (
    <ReactSortable
      animation={150}
      list={source}
      setList={setSource}
      group={{ name: group, pull: "clone", put: false }}
      clone={item => ({ ...item, key: uuid() })}
      sort={false}
    >
      {source.map(item => (
        <InputCell title={item.title} icon={item.icon} key={item.key} />
      ))}
    </ReactSortable>
  );
}

export default InputList;
