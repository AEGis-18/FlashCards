import { useState } from "react";
import { Box } from "./formElements/Box";
import { Button } from "./formElements/Button";

export function DisplayFlashCard({ card, handleClick }) {
  const [isfrontSide, setIsFrontSide] = useState(true);

  return (
    <>
      <Box className={"w-[300px] h-[150px] p-0"}>
        {isfrontSide ? (
          <div
            className="w-full h-full cursor-pointer"
            onClick={() => setIsFrontSide((prev) => !prev)}
          >
            <h2 className="text-3xl font-bold">{card.front}</h2>
          </div>
        ) : (
          <div className="flex flex-col justify-between h-full">
            <div className="flex flex-col justify-center items-center text-center w-full h-full">
              <p className="text-2xl font-bold">{card.back}</p>
            </div>
            {/* <p>{card.value}</p> */}
            <div className="flex w-full h-fit">
              <Button
                size={"very_small"}
                variant={"cancel"}
                onClick={() => handleClick(card.id, "vd")}
                className={"m-0 rounded-tl-none rounded-r-none flex-1"}
              >
                Very difficult
              </Button>
              <Button
                size={"very_small"}
                className={
                  "bg-orange-500 border-orange-500 m-0 rounded-l-none rounded-r-none  flex-1"
                }
                onClick={() => handleClick(card.id, "d")}
              >
                Difficult
              </Button>
              <Button
                size={"very_small"}
                onClick={() => handleClick(card.id, "e")}
                className={"m-0 rounded-l-none rounded-r-none  flex-1"}
              >
                Easy
              </Button>
              <Button
                size={"very_small"}
                variant={"accept"}
                onClick={() => handleClick(card.id, "ve")}
                className={"m-0 rounded-l-none rounded-tr-none  flex-1"}
              >
                Very easy
              </Button>
            </div>
          </div>
        )}
      </Box>
    </>
  );
}
