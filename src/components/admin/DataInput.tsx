// 'use client';

// import React, { FC, useState } from 'react';
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { FileSpreadsheet } from 'lucide-react';
// import Papa from 'papaparse';

// const DataInput: FC = () => {
//   const [data, setData] = useState([]);

//   const fileHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       Papa.parse(e.target.files[0], {
//         header: true,
//         skipEmptyLines: true,
//         complete(results) {
//           setData(results.data);
//         },
//         error(error) {
//           console.log(error);
//         },
//       });
//     }
//   };

//   console.log(data);

//   return (
//     <Card className='w-[600px]'>
//       <CardHeader>
//         <CardTitle>Input Data MPP</CardTitle>
//         <CardDescription>
//           Input data MPP dengan format .csv setiap tanggal 20
//         </CardDescription>
//       </CardHeader>
//       <CardContent>
//         <div className='flex items-center justify-center'>
//           <FileSpreadsheet size={50} />
//         </div>
//         <div className='gap-1.5'>
//           <Label htmlFor='MPPFile'>.csv file</Label>
//           <Input type='file' name='file' id='MPPfile' accept='.csv' />
//         </div>
//       </CardContent>
//     </Card>
//   );
// };

// export default DataInput;
