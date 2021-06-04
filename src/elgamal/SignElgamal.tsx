import { Button, Input, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { mod } from '../utils/extendedEuclid';
import bigInt from 'big-integer';

const SignElgama = () => {
  const [x, setX] = useState<any>();
  const [p, setP] = useState<any>();
  const [a, setA] = useState<any>();
  const [k, setK] = useState<any>();
  const [alpha, setAlpha] = useState<any>();
  const [beta, setBeta] = useState<any>();
  const [ed, setED] = useState<any>();
  const [ed2, setED2] = useState<any>();
  const [s1, setS1] = useState<any>();
  const [s2, setS2] = useState<any>();

  const reset = () => {
    setA('');
    setX('');
    setP('');
    setK('');
    setAlpha('');
    setBeta('');
    setED('');
    setS1('');
    setS2('');
  };

  const autoFill = () => {
    setX('2035');
    setP('2357');
    setA('1751');
    setK('1523');
    setAlpha('2');
  };

  useEffect(() => {
    if (!(alpha && a && p)) {
      return;
    }
    setBeta(bigInt(alpha).modPow(a, p).toString());
  }, [alpha, a, p]);

  useEffect(() => {
    if (!(k && p)) {
      return;
    }

    try {
      setED(
        bigInt(k)
          .modInv(p - 1)
          .toString()
      );
    } catch (error) {}
  }, [k, p]);

  useEffect(() => {
    if (!(alpha && k && p)) {
      return;
    }
    try {
      setS1(bigInt(alpha).modPow(k, p).toString());
    } catch (error) {}
  }, [alpha, k, p]);

  useEffect(() => {
    if (!(x && a && s1 && p)) {
      return;
    }
    try {
      setED2(mod(x - a * s1, p - 1).toString());
    } catch (error) {}
  }, [a, p, s1, x]);

  useEffect(() => {
    if (!(ed2 && k && p)) {
      return;
    }
    try {
      setS2(
        bigInt(k)
          .modInv(p - 1)
          .multiply(ed2)
          .mod(p - 1)
          .toString()
      );
    } catch (error) {}
  }, [ed2, k, p]);

  return (
    <div>
      <h3 className='mb-4'>
        <b>Ký văn bản X bằng hệ mật Elgamal</b>
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
          value={p}
          onChange={(e) => setP(e.target.value)}
          addonBefore='p'
          type='number'
        />
        <Input
          value={a}
          onChange={(e) => setA(e.target.value)}
          addonBefore='a'
          type='number'
        />
        <Input
          value={k}
          onChange={(e) => setK(e.target.value)}
          addonBefore='k'
          type='number'
        />
        <Input
          value={alpha}
          onChange={(e) => setAlpha(e.target.value)}
          addonBefore='alpha'
          type='number'
        />
      </Space>
      <hr />
      <p>
        <b>Bản rõ x = {x || ''}</b>
      </p>
      <p>
        <b>Phần tử nguyên thủy: alpha = </b>
        {alpha}
      </p>
      <p>
        <b>Cặp khóa công khai để kiểm tra chữ ký: (alpha, beta, p) = </b> (
        {alpha} , {beta} , {p})
      </p>
      <p>
        <b>Cặp khóa bí mật để ký: (a, k) = </b> ({a} , {k})
      </p>
      <p>
        <b>s1= </b> {s1}
      </p>
      <p>
        <b>egcd(k, p - 1) mod p - 1 = </b> {ed}
      </p>
      <p>
        <b>(x - a * s) mod p - 1 = </b> {ed2}
      </p>
      <p>
        <b>(s1,s2) =(alpha ^ k mod p, (x - a * s1) * (k ^ -1) = </b> ({s1} ,{' '}
        {s2})
      </p>

      <hr />
      {s1 && s2 && (
        <h4 className='text-danger'>
          =&gt; Chữ ký trên x: (s1,s2) = ({s1} , {s2})
        </h4>
      )}
      <Button onClick={reset}>Clear All</Button>
    </div>
  );
};

export default SignElgama;
