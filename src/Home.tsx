import React, { useState, useEffect } from "react";
import axios from "axios";
import { useQuery, useMutation } from "react-query";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { Input, useDisclosure } from "@chakra-ui/react";
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Button,
  FormControl,
  FormLabel,
  useToast,
  ListItem,
  UnorderedList,
  CircularProgress,
} from "@chakra-ui/react";
import {
  HiAnnotation,
  HiOutlineChartBar,
  HiHashtag,
  HiPaperAirplane,
} from "react-icons/hi";

export type Data = {
  Hello: string;
  message: string;
};

export type Message = {
  message: string;
  key: number;
};

function Home() {
  const toast = useToast();
  // const [data, setData] = React.useState<Data>();
  const { register, handleSubmit } = useForm();
  const [texts, setTexts] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSccess] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const url = "http://127.0.0.1:8000";

  const { isLoading, isError, data } = useQuery("pythonデータ", () =>
    fetch(url).then((res) => res.json())
  );
  if (isLoading)
    return (
      <p className="my-6 text-center">
        <CircularProgress isIndeterminate color="green.300" />
      </p>
    );
  if (isError) return <p className="my-6 text-center">表示に失敗しました</p>;

  //データ取得
  // const GetData = () => {
  //   axios
  //     .get(url)
  //     .then((res) => {
  //       setData(res.data);
  //       console.log(res.data);
  //     })
  //     .catch(function (error) {
  //       alert("失敗しました");
  //       console.log(error);
  //     });
  // };

  //データ送信
  const generatedata = (data: any) => {
    // 処理中(true)なら非同期処理せずに抜ける
    if (loading) return;
    setLoading(true);
    // 処理中フラグを上げる
    setTexts([]);
    setSccess(false);
    console.log(data);
    axios
      .post(url + "/msg", {
        message: data.message,
        max_length: data.lengths,
        num_return_sequences: data.number,
      })
      .then((res) => {
        // onOpen();
        // toast({
        //   description: "結果が出たよ！",
        //   title: "文字が生成されました",
        //   status: "success",
        //   duration: 9000,
        //   isClosable: true,
        // });
        setTexts(res.data.message);
        console.log(res.data.message);
        setLoading(false);
        // setSccess(true);
        navigate("/result", {
          state: { gptdata: res.data.message },
        });
      })
      .catch(function (error) {
        toast({
          description: "もう一度試してください",
          title: "文字が生成に失敗しました",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        setLoading(false);
        console.log(error);
      });
  };

  return (
    <div className="max-w-5xl m-auto">
      <h2 className="text-2xl my-6 text-center font-bold">Mojicraft</h2>

      <p className="my-4  text-center">
        Mojicraftは、APIでモデルの推論機能を使って、AIが文章を生成してくれます
      </p>
      <p className="my-4 text-center">文字を入れてみてください</p>
      <p className="my-4 text-center">
        ※生成される文章の長さが50文字以上になると時間がかかります。
      </p>
      <p className="text-center">RinnaAPI</p>
      <Link to="/chatgpt">
        Home
        <p className="text-center">chatgptを使う</p>
      </Link>
      {loading && (
        <p className="my-6 text-center">
          <CircularProgress isIndeterminate color="green.300" />
          <span className="m-2 mt-6">文章出力中・・・</span>
        </p>
      )}

      <form onSubmit={handleSubmit(generatedata)}>
        <FormControl isRequired>
          <span className="">
            <FormLabel>
              <HiAnnotation />
              文章
            </FormLabel>
          </span>
        </FormControl>
        <div className="my-4">
          <Input placeholder="例：りんご" {...register("message")} />
        </div>
        <FormControl isRequired>
          <HiOutlineChartBar />
          <FormLabel>生成される文章の長さ</FormLabel>
        </FormControl>
        <div className="my-4">
          <NumberInput defaultValue={0} min={0}>
            <NumberInputField {...register("lengths")} />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </div>
        <FormControl isRequired>
          <HiHashtag />
          <FormLabel>文章の数</FormLabel>
        </FormControl>
        <div className="my-4">
          <NumberInput defaultValue={0} min={0}>
            <NumberInputField
              // onChange={handleChangenumber}
              {...register("number")}
            />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </div>
        <div className="text-center m-auto my-6">
          <Button colorScheme="blue" type="submit">
            <HiPaperAirplane />
            　送信する
          </Button>
        </div>
      </form>

      {/* <>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>出力結果</ModalHeader>
            <ModalCloseButton />
            <UnorderedList>
              {texts &&
                texts.map((text: any, index: any) => (
                  <ListItem key={index}>{text}</ListItem>
                ))}
            </UnorderedList>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </> */}
    </div>
  );
}

export default Home;
