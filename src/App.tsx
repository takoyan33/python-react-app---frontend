import React, { useState, useEffect } from "react";
import axios from "axios";
import { useQuery, useMutation } from "react-query";
import { Input } from "@chakra-ui/react";
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import {
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
} from "@chakra-ui/react";
import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react";

export type Data = {
  Hello: string;
  message: string;
};

export type Message = {
  message: string;
  key: number;
};

function App() {
  const toast = useToast();
  // const [data, setData] = React.useState<Data>();
  const [message, setMessage] = React.useState();
  const [lengths, setLengths] = React.useState();
  const [number, setNumber] = React.useState();
  const [texts, setTexts] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const url = "http://127.0.0.1:8000";

  const { isLoading, isError, data } = useQuery("pythonデータ", () =>
    fetch(url).then((res) => res.json())
  );
  if (isLoading) return <>Loading...</>;
  if (isError) return <>Error</>;

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
  const generatedata = () => {
    // 処理中(true)なら非同期処理せずに抜ける
    if (loading) return;
    setLoading(true);
    // 処理中フラグを上げる
    console.log(message);
    console.log(lengths);
    console.log(number);
    axios
      .post(url + "/msg", {
        message: message,
        max_length: lengths,
        num_return_sequences: number,
      })
      .then((res) => {
        toast({ description: "結果が出たよ！" });
        setTexts(res.data.message);
        console.log(res.data.message);
        setLoading(false);
        // console.log(texts?.message);
      })
      .catch(function (error) {
        toast({ description: "失敗しました！" });
        console.log(error);
      });
  };

  //messageを受け取る
  const handleChangemessage = (e: any) => {
    setMessage(e.target.value);
    console.log(message);
  };

  //lengthsを受け取る
  const handleChangelength = (e: any) => {
    setLengths(e.target.value);
    console.log(lengths);
  };

  //numberを受け取る
  const handleChangenumber = (e: any) => {
    setNumber(e.target.value);
    console.log(number);
  };

  return (
    <div className="max-w-5xl m-auto">
      <h2 className="text-2xl my-6 text-center">文章推論くん</h2>
      {/* {data ? (
        <div>
          <h2 className="text-xl my-2">データ一覧</h2>
          <p>{data.message}</p>
        </div>
      ) : (
        <></>
      )} */}

      <p className="my-4">
        文字自動生成くんは、APIでモデルの推論機能を使って、AIが文章を生成してくれます
      </p>
      <p className="my-4">文字を入れてみてね</p>
      <FormLabel>文章*</FormLabel>
      <div className="my-4">
        <Input placeholder="例：りんご" onChange={handleChangemessage} />
      </div>

      <FormLabel>生成される文章の長さ*</FormLabel>
      <div className="my-4">
        <NumberInput defaultValue={0} min={0}>
          <NumberInputField onChange={handleChangelength} />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </div>
      <FormLabel>文章の数*</FormLabel>
      <div className="my-4">
        <NumberInput defaultValue={0} min={0}>
          <NumberInputField onChange={handleChangenumber} />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </div>
      <div className="text-center m-auto my-6">
        <Button onClick={generatedata} colorScheme="blue">
          送信する
        </Button>
      </div>

      {loading && (
        <p className="my-6 text-center">
          <CircularProgress isIndeterminate color="green.300" />
          <span className="m-2">文章出力中・・・</span>
        </p>
      )}
      {texts && <p className="text-2xl my-6 text-center">出力結果</p>}
      <UnorderedList>
        {texts &&
          texts.map((text: any, index: any) => (
            <>
              <ListItem key={index}>{text}</ListItem>
            </>
          ))}
      </UnorderedList>
    </div>
  );
}

export default App;
