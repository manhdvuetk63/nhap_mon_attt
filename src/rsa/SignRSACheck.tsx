import { Button, Input, Space } from 'antd';
import React, { useEffect, useState } from 'react';
// import * as bigintCryptoUtils from 'bigint-crypto-utils';
import bigInt from 'big-integer';

const SignCheckRSA = () => {
  const [x, setX] = useState<any>();
  const [n, setN] = useState<any>();
  const [e, setE] = useState<any>();
  const [s, setS] = useState<any>();
  const [result, setResult] = useState<any>();
  const [check, setCheck] = useState<boolean>(false);

  useEffect(() => {
    if (!(s && e && n)) {
      return;
    }
    try {
      let _result = bigInt(s).modPow(e, n).toString();
      setResult(_result);
      setCheck(_result === x.toString());
    } catch (error) {
      console.log(error);
    }
  }, [x, e, n, s]);

  const reset = () => {
    setE('');
    setX('');
    setS('');
    setN('');
    setCheck(false);
  };

  return (
    <div>
      <h3 className='mb-4'>
        <b>Kiểm tra chữ ký</b>
      </h3>
      <hr />
      <Space className='w-100' direction='vertical' size='large'>
        <Input
          value={x}
          onChange={(e) => setX(e.target.value)}
          addonBefore='x'
          type='number'
        />
        <Input
          value={s}
          onChange={(e) => setS(e.target.value)}
          addonBefore='s'
          type='number'
        />
        <Input
          value={e}
          onChange={(e) => setE(e.target.value)}
          addonBefore='d'
          type='number'
        />
        <Input
          value={n}
          onChange={(e) => setN(e.target.value)}
          addonBefore='n'
          type='number'
        />
      </Space>
      <hr />
      <p>
        <b>Bản rõ x = {x || ''}</b>
      </p>
      <p>
        <b>Chữ ký số = {s || ''}</b>
      </p>
      <p>
        <b>Khóa công khai e = {e || ''}</b>
      </p>
      <p>
        <b>Modulo khóa công khai n = {n || ''}</b>
      </p>
      <hr />
      {s && e && n && (
        <>
          <hr />
          <p>
            <b>s ^ e mod n = </b>
            {s} ^ {e} mod {n} = {result}
          </p>
          {check ? (
            <p>
              <b className='text-danger'>
                x = {x} === {result}
              </b>
            </p>
          ) : (
            <p>
              <b className='text-danger'>
                x == {x} !== {result}
              </b>
              <hr />
            </p>
          )}
          {check ? (
            <h4 className='text-danger'>
              <b>Đây là chữ ký hợp lệ</b>
            </h4>
          ) : (
            <h4 className='text-danger'>
              <b>Chữ ký không hợp lệ</b>
            </h4>
          )}
        </> 
      )}
        <Button onClick={reset}>Clear All</Button>

    </div>
  );
};

export default SignCheckRSA;
