// // src/components/Modal.jsx
// import React from 'react';

// const Modal = ({ isOpen, onClose, handleAddPartner, handleFileChange, partnerData }) => {
//   return (
//     <>
//       {isOpen && (
//         <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
//           <div className="bg-white rounded-lg p-6 space-y-4 max-w-md mx-auto">
//             <h2 className="text-xl font-bold mb-4">Add New Partner</h2>
//             <form onSubmit={handleAddPartner}>
//               <div>
//                 <label className="block text-gray-700">Partner Image</label>
//                 <input
//                   type="file"
//                   multiple
//                   className="w-full px-4 py-2 border rounded"
//                   onChange={handleFileChange}
//                 />
//               </div>
//               <button className="px-4 py-2 bg-primary rounded text-white">Add Partner</button>
//             </form>
//             <button className="px-4 py-2 bg-red-500 rounded text-white" onClick={onClose}>Cancel</button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Modal;
