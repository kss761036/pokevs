import Card from "@mui/material/Card";
import Input from "@mui/material/Input";

const PokeFloat = () => {
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
        <li className="flex-1 p-1">
          <Card variant="outlined">
            <div className="aspect-1/1"></div>
          </Card>
        </li>
        <li className="flex-1 p-1">
          <Card variant="outlined">
            <div className="aspect-1/1"></div>
          </Card>
        </li>
      </ul>
    </div>
  );
};

export default PokeFloat;
