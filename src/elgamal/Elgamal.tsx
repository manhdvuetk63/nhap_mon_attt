import { Button, Input, Space } from 'antd';
import React, { useEffect, useState } from 'react';
// import * as bigintCryptoUtils from 'bigint-crypto-utils';
// import { mod } from '../utils/extendedEuclid';
import bigInt, { gcd } from 'big-integer';

const Elgamal = () => {
  const [x, setX] = useState<any>();
  const [p, setP] = useState<any>();
  const [a, setA] = useState<any>();
  const [k, setK] = useState<any>();
  const [alpha, setAlpha] = useState<any>();
  const [beta, setBeta] = useState<any>();
  const [gamma, setGamma] = useState<any>();
  const [delta, setDelta] = useState<any>();
  const [gamma2, setGamma2] = useState<any>();
  const [x2, setX2] = useState<any>();

  const reset = () => {
    setP('');
    setA('');
    setK('');
    setX('');
    setAlpha('');
  };

  const autoFill = () => {
    // setX('134542481841787419');
    // setP('1000000000000000009');
    // setA('654789123257');
    // setK('7531594862');
    // setAlpha('7');
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
    try {
      setBeta(bigInt(alpha).modPow(a, p).toString());
    } catch (error) {
      console.log(error);
    }
  }, [alpha, a, p]);

  useEffect(() => {
    if (!(alpha && k && p)) {
      return;
    }
    try {
      setGamma(bigInt(alpha).modPow(k, p).toString());
    } catch (error) {
      console.log(error);
    }
  }, [alpha, k, p]);

  useEffect(() => {
    if (!(beta && k && x && p)) {
      return;
    }
    try {
      setDelta(bigInt(beta).modPow(k, p).multiply(x).mod(p).toString());
    } catch (error) {
      console.log(error);
    }
  }, [beta, k, p, x]);

  useEffect(() => {
    if (!(gamma & p & a)) {
      return;
    }
    try {
      setGamma2(
        bigInt(gamma)
          .modPow(p - a - 1, p)
          .toString()
      );
    } catch (error) {
      console.log(error);
    }
  }, [gamma, p, a]);

  useEffect(() => {
    if (!(gamma2 && delta && p)) {
      return;
    }
    try {
      setX2(
        bigInt(gamma2 * delta)
          .mod(p)
          .toString()
      );
    } catch (error) {
      console.log(error);
    }
  }, [gamma2, delta, p]);

  return (
    <div>
      <h3 className='mb-4'>
        <b>Xây dựng hệ mật Elgamal</b>
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
          placeholder={`Enter a < p ${p ? `= ${p}` : ``}`}
          type='number'
        />
        <Input
          value={k}
          onChange={(e) => setK(e.target.value)}
          addonBefore='k'
          placeholder={`Enter k < p ${p ? `= ${p}` : ``}`}
          type='number'
        />
        <Input
          value={alpha}
          onChange={(e) => setAlpha(e.target.value)}
          addonBefore='α'
          type='number'
        />
      </Space>
      <hr />

      <Space direction='vertical'>
        <div>
          <b>Bản rõ x = {x || ''}</b>
        </div>
        <div>
          <b>p = {p || ''}</b>
        </div>
        <div>
          <b>a = {a || ''}</b>
        </div>
        <div>
          <b>k = {k || ''}</b>
        </div>
        <div>
          <b>alpha = {alpha || ''}</b>
        </div>
      </Space>
      <hr />
      <div>
        <p>
          Khóa công khai β = α ^ a mod p = {alpha} ^ {a} mod {p} = {beta}
        </p>
        <p>
          Mã khóa công khai = (p,α,β) = ({p},{alpha},{beta})
        </p>
        <p>Mã khóa bí mật = (a) = ({a})</p>
      </div>
      <hr />
      {k && (
        <>
          {gcd(k, p - 1).toString() !== '1' ? (
            <h4>
              <b>
                Không thỏa mãn tính khả nghịch: gcd(k, p - 1) = gcd({k}, {p - 1}
                ) ={gcd(k, p - 1).toString()}
              </b>
            </h4>
          ) : (
            <div>
              <div>
                <h4>
                  <b>Lập mã</b>
                </h4>
                <p>
                  γ = a^k mod p = {a} ^ {k} mod {p} = {gamma}
                </p>
                <p>
                  δ = x * β ^ K mod p = {x} * {beta} ^ {k} mod {p} = {delta}
                </p>
                <p>
                  Nhận được bản mã (γ,δ) = ({gamma} , {delta})
                </p>
              </div>
              <hr />
              <div>
                <h4>
                  <b>Giải mã</b>
                </h4>
                <p>
                  y ^ -a mod p = γ^(p-1-a) mod p = γ ^ (p-a-1) mod p = {gamma} ^
                  ({p}-{a}-1) mod {p} = {gamma2}
                </p>
                <b>
                  <p>x = γ ^ (-a) * δ = {x2}</p>
                </b>
                <h4 className='text-danger'>
                  <b>x = {x2 || 'Undifined'}</b>
                </h4>
              </div>
            </div>
          )}
        </>
      )}
        <Button onClick={reset}>Clear All</Button>
    </div>
  );
};

export default Elgamal;
