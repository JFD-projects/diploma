import React, { useState, useEffect } from 'react';
import { Row, Col, Slider, InputNumber } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { getFilterPrices, setFilter } from '../../../store/devices';

const PriceRange = () => {
	const [data, setData] = useState({ min: 2, max: 90000 });
	const prices = useSelector(getFilterPrices());
	const dispatch = useDispatch();

	const handleChange = range => {
		setData({ min: range[0], max: range[1] });
	};
	useEffect(() => {
		dispatch(setFilter({ name: 'price', value: data }));
	}, [data]);

	return (
		<>
			<h5>Цена</h5>
			<Row>
				<Col span={6}>
					<InputNumber className='w-100' min={2} max={90000} value={data.min} onChange={value => setData(prev => ({ ...prev, min: value }))} />
				</Col>
				<Col className='px-2' span={12}>
					<Slider range value={[data.min, data.max]} min={2} max={90000} onChange={handleChange} />
				</Col>
				<Col span={6}>
					<InputNumber className='w-100' min={2} max={90000} value={data.max} onChange={value => setData(prev => ({ ...prev, max: value }))} />
				</Col>
			</Row>
		</>
	);
};

export default PriceRange;
