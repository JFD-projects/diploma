import React from 'react';
// import {Pagination} from "react-bootstrap";
import { useSelector } from 'react-redux';
import { getDevices } from '../../store/devices';
import { Pagination } from 'antd';

const Pages = () => {
    const devices = useSelector(getDevices());
    const pageCount = Math.ceil(devices.length / 12)
    const pages = []

    for (let i = 0; i < pageCount; i++) {
        pages.push(i + 1)
    }

    return (
        <Pagination defaultCurrent={pages[0]} total={50} />
    //     <Pagination className="mt-3">
    //     {/* {pages.map(page =>
    //         <Pagination.Item
    //             key={page}
    //             active={device.page === page}
    //             onClick={() => device.setPage(page)}
    //         >
    //             {page}
    //         </Pagination.Item>
    //     )} */}
    // </Pagination>
    );
};

export default Pages;
