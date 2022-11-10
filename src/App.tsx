import React, { useState, useEffect } from "react";
import axios from "axios";
import { useQuery, useMutation } from "react-query";

export type Data = {
  Hello: string;
  message: string;
};

export type Message = {
  message: string;
  key: number;
};

function App() {
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
    axios
      .post(url + "/msg", {
        message: message,
        max_length: lengths,
        num_return_sequences: number,
      })
      .then((res) => {
        alert("結果が出たよ！");
        setTexts(res.data.message);
        console.log(res.data.message);
        setLoading(false);
        // console.log(texts?.message);
      })
      .catch(function (error) {
        alert("失敗しました");
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
      <h2 className="text-2xl my-6">文章推論くん</h2>
      {data ? (
        <div>
          <h2 className="text-xl my-2">データ一覧</h2>
          <p>{data.message}</p>
        </div>
      ) : (
        <></>
      )}
      <br></br>
      <p>
        文字自動生成くんは、APIでモデルの推論機能を使って、AIが文章を生成してくれます
      </p>
      <p className="">文字を入れてみてね</p>
      <br></br>
      <label className="block mb-2 text-sm font-medium text-gray-900 ">
        文章
      </label>
      <input
        type="text"
        onChange={handleChangemessage}
        className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 "
      />
      <br></br>
      <label className="block mb-2 text-sm font-medium text-gray-900 ">
        生成される文章の長さ
      </label>
      <input
        type="number"
        onChange={handleChangelength}
        className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 "
      />
      <br></br>
      <label className="block mb-2 text-sm font-medium text-gray-900 ">
        文章の数
      </label>
      <input
        type="number"
        onChange={handleChangenumber}
        className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 "
      />
      <br></br>
      <input
        onClick={generatedata}
        type="submit"
        value="送信する"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      />
      <br></br>
      {loading && <p className="my-6">出力中・・・</p>}
      <br></br>
      {texts && <p className="text-2xl my-6">出力結果</p>}
      {texts &&
        texts.map((text: any, index: any) => (
          <>
            <li className="todo-item my-6" key={index}>
              <span className="todo-item__text">{text}</span>
            </li>
          </>
        ))}
    </div>
  );
}

export default App;
