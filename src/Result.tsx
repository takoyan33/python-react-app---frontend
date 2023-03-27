import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Button, ListItem, UnorderedList } from "@chakra-ui/react";
import {
  HiAnnotation,
  HiOutlineChartBar,
  HiHashtag,
  HiPaperAirplane,
} from "react-icons/hi";

const Result = () => {
  const location = useLocation();
  const [gptdata, setGptdata] = useState([]);
  useEffect(() => {
    if (location.state) {
      setGptdata(location.state.gptdata);
      console.log(location.state.gptdata);
    }
  }, [location.state]);

  return (
    <div className="h-screen bg-neutral-100 ">
      <div className="p-6 my-6 max-w-screen-xl m-auto">
        <p className="text-center my-10 font-bold text-poteto-black text-3xl font-bold">
          要約結果
        </p>
        <p>
          <UnorderedList>
            {gptdata &&
              gptdata.map((text: any, index: any) => (
                <ListItem key={index}>{text}</ListItem>
              ))}
          </UnorderedList>
          <div className="text-center m-auto my-6">
            <Button colorScheme="blue">
              <HiPaperAirplane />
              　トップに戻る
            </Button>
          </div>
        </p>
      </div>
    </div>
  );
};

export default Result;
