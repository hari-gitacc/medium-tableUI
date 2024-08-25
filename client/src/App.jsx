
import './App.css'
import React, { useState } from "react";
import { Table, DatePicker, Input, Button, Pagination } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import moment from "moment";


function App() {

  const [searchedColumn, setSearchedColumn] = useState("");
  const [dateRange, setDateRange] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [searchQuery, setSearchQuery] = useState("");

  const data = [
    {
      key: 1,
      createdAt: "2024-07-05T19:22:10",
      orderNumber: "84813",
      name: "hari",
      amount: 435.00,
      phone: "0123456677",
      status: "SUCCESS"
    },
    {
      key: 2,
      createdAt: "2024-07-05T18:18:36",
      orderNumber: "84808",
      name: "Prabha",
      amount: 400.00,
      phone: "0123456677",
      status: "SUCCESS"
    },
    {
      key: 3,
      createdAt: "2024-07-05T18:17:20",
      orderNumber: "84804",
      name: "Rajvijay",
      amount: 239.00,
      phone: "0123456677",
      status: "SUCCESS"
    },
    {
      key: 4,
      createdAt: "2024-07-05T18:09:01",
      orderNumber: "84803",
      name: "JAMBERI Natarajan",
      amount: 122.00,
      phone: "123456677",
      status: "SUCCESS"
    },
    {
      key: 5,
      createdAt: "2024-07-05T17:20:35",
      orderNumber: "84788",
      name: "Mahathir",
      amount: 400.00,
      phone: "123456677",
      status: "SUCCESS"
    },
    {
      key: 6,
      createdAt: "2024-07-05T17:15:31",
      orderNumber: "84786",
      name: "Raja",
      amount: 800.00,
      phone: "123456677",
      status: "SUCCESS"
    },
    {
      key: 7,
      createdAt: "2024-07-05T17:10:25",
      orderNumber: "84785",
      name: "John Doe",
      amount: 550.00,
      phone: "123456677",
      status: "Failed"
    }
  ];

  
  const handleGlobalSearch = (value) => {
    setSearchQuery(value);
  };


  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const handleDateFilter = (selectedKeys, confirm) => {
    confirm();
    setDateRange(selectedKeys[0]);
  };

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  const filterData = (data) => {
    if (!searchQuery) return data;
    
    return data.filter((item) =>
      (item.orderNumber && item.orderNumber.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.name && item.name.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  };

  const columns = [
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 10,
      render: (text) => moment(text).format("YYYY-MM-DD hh:mm:ss A"), // Changed format here
    
    },
    {
      title: "Order Number",
      dataIndex: "orderNumber",
      key: "orderNumber",
      width: 10,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 10,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      width: 5,
      render: (text) => (
        <span>
          {formatCurrency(text)}
        </span>
      ),
    },
    {
      title: "Mobile Number",
      dataIndex: "phone",
      key: "phone",
      width: 10,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 10,
      render: (text) => (
        <span
          className={`px-2 py-[1px] rounded-full pb-[3px] font-medium text-[12px] capitalize z-10 ${
            text.toLowerCase() === "success"
              ? "bg-green-300 text-green-800"
              : "text-red-800 bg-red-300"
          }`}
        >
          {text.toLowerCase()}
        </span>
      ),
    },
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
  };

  return (
    <main className="flex items-center justify-center  p-4">
    <div className="w-full max-w-6xl ">
      <div className="flex justify-between items-center">
       <div className="flex gap-x-0 items-center"> 
       <h2 className="text-2xl font-bold pl-3 p-2 text-[16px] text-gray-700">Transaction History</h2>
      
       </div>
        <div className="p-4">
          <Input
            placeholder="Search by Order Number or Name"
            value={searchQuery}
            onChange={(e) => handleGlobalSearch(e.target.value)}
            prefix={<SearchOutlined />}
            className="w-[300px]"
          />
        </div>
      </div>
      <div className="rounded-lg overflow-hidden shadow-lg bg-white">
        <Table
          columns={columns}
          dataSource={filterData(data).slice(
            (currentPage - 1) * pageSize,
            currentPage * pageSize
          )}
          pagination={false}
          className="custom-table font-medium"
          rowClassName="bg-white font-mont hover:bg-gray-100"
        />
      </div>
      <div className="flex justify-center mt-4">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={filterData(data).length}
          onChange={handlePageChange}
          showSizeChanger
          pageSizeOptions={["10", "20", "50", "100"]}
          itemRender={(page, type, originalElement) => {
            if (type === "page") {
              const isActive = page === currentPage;
              return (
                <span
                  className={`px-3 py-1 font-mont rounded-full cursor-pointer ${
                    isActive
                      ? "bg-[#af3ccccb] text-white"
                      : "bg-[#af3ccc70] text-[#841b9ee0] font-medium hover:bg-[#af3ccc70]"
                  }`}
                >
                  {page}
                </span>
              );
            }
            return originalElement;
          }}
        />
      </div>
    </div>
  </main>
  )
}

export default App
