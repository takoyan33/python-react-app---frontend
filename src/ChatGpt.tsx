import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Button, ListItem, UnorderedList } from "@chakra-ui/react";
import { HiPaperAirplane } from "react-icons/hi";

const ChatGpt = () => {
  const location = useLocation();
  const [gptdata, setGptdata] = useState([]);

  return (
    <div className="h-screen bg-neutral-100 ">
      <div className="p-6 my-6 max-w-screen-xl m-auto">
        <p className="text-center my-10 font-bold text-poteto-black text-3xl font-bold">
          Chatgpt
        </p>
        <p>
          <UnorderedList></UnorderedList>
          <div className="text-center m-auto my-6">
            <Link to="/">
              <Button colorScheme="blue">
                <HiPaperAirplane />
                　トップに戻る
              </Button>
            </Link>
          </div>
        </p>
      </div>
    </div>
  );
};

export default ChatGpt;
