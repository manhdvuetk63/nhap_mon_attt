/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Button, Input, Space } from 'antd';
import ReactApexChart from 'react-apexcharts';
import curve from '../utils/elliptic';
import { ApexOptions } from 'apexcharts';

export interface Point {
  x: number;
  y: number;
}

const Elliptic = () => {
  const [a, setA] = useState<any>();
  const [b, setB] = useState<any>();
  const [r, setR] = useState<any>();
  const [c, setC] = useState(curve(a, b, r));
  const [Px, setPx] = useState<any>();
  const [Py, setPy] = useState<any>();
  const [Qx, setQx] = useState<any>();
  const [Qy, setQy] = useState<any>();
  const [n, setN] = useState<any>();
  const [result, setResult] = useState('');
  const [plotPoints, setPlotPoints] = useState<Point[]>(c.getPoints().slice(1));


  useEffect(() => {
    if (r > 999) {
      setR(999);
      return;
    }
    setC(curve(a, b, r));
    setPlotPoints(curve(a, b, r).getPoints().slice(1));
  }, [a, b, r]);

  const plus = () => {
    if (!(Px && Py && Qx && Qy)) {
      setResult('Hãy nhập đầy đủ tọa độ của P và Q !!!');
      return;
    }
    let P = c.getPoint(parseInt(Px), parseInt(Py));
    let Q = c.getPoint(parseInt(Qx), parseInt(Qy));
    if (typeof P === 'undefined') {
      setResult('P không thuộc đường cong elliptic này');
      return;
    }
    if (typeof Q === 'undefined') {
      setResult('Q không thuộc đường cong elliptic này');
      return;
    }
    setResult(`P(${Px},${Py}) + Q(${Qx},${Qy}) = ${P.plus(Q).toString()}`);
  };

  const multiply = () => {
    if (!(Px && Py && n)) {
      setResult('Hãy nhập đầy đủ P và n!!!');
      return;
    }
    let P = c.getPoint(parseInt(Px), parseInt(Py));

    if (typeof P === 'undefined') {
      setResult('P không thuộc đường cong elliptic này');
      return;
    }

    if (n <= 0) {
      setResult(`${n}P(${Px},${Py}) = (0,0)`);
      return;
    }

    let generate = P.generate();
    let _result = generate![(n % generate!.length) - 1];

    setResult(`${n}P(${Px},${Py}) = ${_result?.toString()}`);
  };

  return (
    <div>
      <h3 className='mb-3'>
        <b>Xây dựng hệ mật Elliptic</b>
      </h3>
      <Space className='inputs'>
        <Input
          value={a}
          onChange={(e) => setA(e.target.value)}
          addonBefore='a'
          placeholder='Nhập a'
          type='number'
        />
        <Input
          value={b}
          onChange={(e) => setB(e.target.value)}
          addonBefore='b'
          placeholder='Nhập b'
          type='number'
        />
        <Input
          value={r}
          onChange={(e) => setR(e.target.value)}
          addonBefore='r'
          placeholder='Nhập r'
          type='number'
        />

        {!c.rIsPrime() && (
          <h4 className='text-danger'>
            <b>R không phải là số nguyên tố !!!</b>
          </h4>
        )}
      </Space>
      <div>
        <h4 className='my-3'>
          <b>
            Các điểm trên E{r}({a},{b}) là điểm vô cực O và các điểm sau
          </b>
        </h4>
        <table className='table table-bordered'>
          <tbody>
            <tr>
              {plotPoints.slice(0, plotPoints.length / 2).map((point, i) => (
                <td key={i}>{point.toString()}</td>
              ))}
            </tr>
            <tr>
              {plotPoints.slice(plotPoints.length / 2 + 1).map((point, i) => (
                <td key={i}>{point.toString()}</td>
              ))}
            </tr>
            {c.rIsPrime()}
          </tbody>
        </table>
      </div>
      <div>
        <h4 className='my-3'>
          <b>Các phép tính trên đường cong elliptic</b>
        </h4>
        <div>
          <Space>
            <b>Điểm P</b>
            <Input
              value={Px}
              onChange={(e) => setPx(e.target.value)}
              addonBefore='x'
              placeholder='Nhập Px'
              type='number'
            />
            <Input
              value={Py}
              onChange={(e) => setPy(e.target.value)}
              addonBefore='y'
              placeholder='Nhập Py'
              type='number'
            />
            <b>Điểm Q</b>
            <Input
              value={Qx}
              onChange={(e) => setQx(e.target.value)}
              addonBefore='Qx'
              placeholder='Nhập Qx'
              type='number'
            />
            <Input
              value={Qy}
              onChange={(e) => setQy(e.target.value)}
              addonBefore='Qy'
              placeholder='Nhập Qy'
              type='number'
            />
            <Input
              value={n}
              onChange={(e) => setN(e.target.value)}
              addonBefore='n'
              placeholder='Nhập N'
              type='number'
            />
          </Space>
        </div>
        <div className='mt-4'>
          <Space>
            <Button type='primary' onClick={plus}>
              P + Q
            </Button>
            <Button type='primary' onClick={multiply}>
              P x n
            </Button>
            <div className='ml-4 mt-1'>
              <h4 className='text-danger'>
                <b>{result}</b>
              </h4>
            </div>
          </Space>
        </div>
      </div>
    </div>
  );
};

export default Elliptic;
