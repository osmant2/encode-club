import React, {useEffect, useState, useContext} from 'react'
import ReactPaginate from 'react-paginate';
import '../css/Style.css';
// import { InsuranceContext } from '../context/Insurancepolicy';
// import { VehicleContext } from '../context/Vehicle';

const AllClaimsTable = () => {
  //const { connectWallet, currentAccount, AcceptBid} = useContext(TransactionContext);  
  const [currentItems, setCurrentItems] = useState([]);


  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 3;

//   useEffect(() => {
//     const endOffset = itemOffset + itemsPerPage;
//     setCurrentItems(data.slice(itemOffset, endOffset));
//     setPageCount(Math.ceil(data.length / itemsPerPage));
//   }, [itemOffset, itemsPerPage, data]);

//   const handlePageClick = (event) => {
//     const newOffset = (event.selected * itemsPerPage) % data.length;
//     setItemOffset(newOffset);
//   };
  
//   const acceptBidding = (tokenId, bidderAddress, bidValue) => {
//     console.log(tokenId, bidderAddress, bidValue);
//     AcceptBid(tokenId, bidderAddress, bidValue);
//   }

//   function vals (tokenID, bidderAddress, bidValue){
//     console.log("marriage", tokenID, bidderAddress, bidValue);
//     //AcceptBid(2, "0x57614b7DFcBdb14907C9573f712461Ed3c983a56", "0.1");
//   }

  return (
    <div className='mx-20 mb-32'>
      <table className='table table-striped'>
        <thead>
          <tr className=''>
            <th className='text-white'>ID</th>
            <th className='text-white'> Owner Name</th>
            <th className='text-white'> Model </th>
            <th className='text-white'> Color </th>
            <th className='text-white'> PolicyId </th>            
            <th className='text-white'> Bidding Acceptance</th>
            <th className='text-white'> Bid Date</th>
          </tr>
        </thead>
        <tbody className='bg-gray-100'>
        
            <tr> 
              <td>0</td>
              <td>one</td>    
              <td className='text-black'>two</td>             
              <td>ether</td>
              <td className='text-center'>
                   Accept             
              </td>
              <td className='text-center'>three</td>
              <td>four</td>
            </tr>
         
            <tr> 
              <td>0</td>
              <td>one</td>    
              <td className='text-black'>two</td>             
              <td>ether</td>
              <td className='text-center'>
                   Accept             
              </td>
              <td className='text-center'>three</td>
              <td>four</td>
            </tr>
          

        {/* {data.map((item,index) => ( 
            <tr key={index}> 
              <td >{index}</td>
              <td >{item.ownerIPname}</td>    
              <td className='text-black'>{item.bidderAddress}</td>             
              <td>{item.bidValue} ether</td>
              <td className='text-center'>
                <button 
                className='bg-black text-white py-1 px-6 rounded' 
                onClick={(event) => acceptBidding(item.tokenID, item.bidderAddress, item.bidValue, event)}
                >
                Accept
                </button>
              </td>
              <td className='text-center'>{item.bidAccepted}</td>
              <td>{item.timestamp}</td>
            </tr>
         ))
         }          */}
        </tbody>
      </table> 
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        //onPageChange={handlePageClick}
        pageRangeDisplayed={1}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        containerClassName="pagination"
        pageLinkClassName="page-num"
        previousLinkClassName="page-num"
        nextLinkClassName="page-num"
        activeLinkClassName="active"
      />
     </div>
  )
}

export default AllClaimsTable