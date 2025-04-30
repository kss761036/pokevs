import Card from "@mui/material/Card";
import Input from "@mui/material/Input";
import { useDrop } from "react-dnd";
import { useRef, useEffect } from "react";

const PokeFloat = () => {
  const ref = useRef<HTMLLIElement>(null);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "BOX",
    drop: (item: { name: string }) => {
      console.log("Dropped:", item.name);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  useEffect(() => {
    if (ref.current) {
      drop(ref.current);
    }
  }, [ref, drop]);

  return (
    <div className="fixed top-[100px] left-1/2 translate-x-[calc(-100%_-_250px)] w-[300px]">
      <form action="">
        <fieldset>검색</fieldset>
        <Input></Input>
        <ul>
          <li>
            <h4>타입</h4>
          </li>
        </ul>
      </form>
      <ul className="flex">
        <li ref={ref} className="flex-1 p-1">
          <Card variant="outlined">
            <div className="aspect-1/1"></div>
          </Card>
        </li>
        <li ref={ref} className="flex-1 p-1">
          <Card variant="outlined">
            <div className="aspect-1/1"></div>
          </Card>
        </li>
      </ul>
    </div>
  );
};

export default PokeFloat;
