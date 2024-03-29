import { useForm, SubmitHandler, useWatch } from 'react-hook-form';
import Papa from 'papaparse';
import { z } from 'zod';
import { trpc } from '@/app/_trpc/client';
import { toast } from 'sonner';

const MPPInputSchema = z.object({
  No: z.string().nullable(),
  Employee_ID: z.string().nullable(),
  Employee_Name: z.string().nullable(),
  Join_Date: z.string().nullable(),
  Job_Title_Name: z.string().nullable(),
  Org_Group_Name: z.string().nullable(),
  Job_Level_Code: z.string().nullable(),
  Category: z.string().nullable(),
  Status: z.string().nullable(),
  MPP: z.string().nullable(),
  Actual: z.string().nullable(),
  Gap: z.string().nullable(),
});

type MPPInputSchemaType = z.infer<typeof MPPInputSchema>;

const DataInputViewModel = () => {
  const { register, handleSubmit, control, reset } = useForm();

  const file = useWatch({ control, name: 'file' });

  const { adminRouter } = trpc;
  const mutation = adminRouter.insertMPP.useMutation();

  const onSubmit: SubmitHandler<any> = (data) => {
    Papa.parse(data.file[0], {
      header: true,
      complete: (results) => {
        const newData = (results.data as MPPInputSchemaType[])
          .map(({ No, ...rest }) => rest)
          .filter((obj) =>
            Object.values(obj).some(
              (val) => val !== undefined && val !== null && val !== '',
            ),
          );
        mutation.mutate(newData, {
          onSuccess: () => {
            toast.success('Data berhasil diupload');
            reset();
          },
          onError: () => {
            toast.error('Data gagal diupload');
          },
        });
      },
    });
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    file,
  };
};

export default DataInputViewModel;
