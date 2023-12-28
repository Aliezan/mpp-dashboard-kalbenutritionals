/* eslint-disable arrow-body-style */
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { trpc } from '@/app/_trpc/client';
import MutationsHandler from '@/components/adminTable/Handler/mutations';

// *TODO ADD INPUT VALIDATION

const MPPModalViewModel = () => {
  const MPPEmployeeSchema = z.object({
    EmployeeID: z.string().min(3, 'Masukkan Employee ID dengan benar'),
    EmployeeName: z.string().min(3, 'Masukkan nama dengan benar'),
    JoinDate: z.string().min(1, 'Masukkan tanggal dengan benar'),
    JobTitleName: z.string().min(1),
    OrgGroupName: z.string().min(1),
    JobLevelCode: z.string().min(1),
    Category: z.string().min(1),
    Status: z.string().min(1),
  });

  type MPPEmployeeSchemaType = z.infer<typeof MPPEmployeeSchema>;

  const form = useForm<MPPEmployeeSchemaType>({
    resolver: zodResolver(MPPEmployeeSchema),
    defaultValues: {
      EmployeeID: '',
      EmployeeName: '',
      JoinDate: '',
      JobTitleName: '',
      OrgGroupName: '',
      JobLevelCode: '',
      Category: '',
      Status: '',
    },
  });

  const {
    formState: { errors, dirtyFields },
  } = form;

  type DirtyFieldsType = {
    [key: string]: any;
  };

  const editFormDirty = (dirtyFieldsParam: DirtyFieldsType) => {
    const fieldsToCheck = [
      'EmployeeID',
      'EmployeeName',
      'JoinDate',
      'JobTitleName',
      'JobLevelCode',
      'Category',
      'Status',
    ];
    return fieldsToCheck.some((field) => field in dirtyFieldsParam);
  };

  const moveFormDirty = (dirtyFieldsParam: DirtyFieldsType) => {
    const fieldsToCheck = ['OrgGroupName'];
    return fieldsToCheck.some((field) => field in dirtyFieldsParam);
  };

  const { data: MPPOrganisations } = trpc.adminRouter.getOrgMPP.useQuery();

  const searchParams = useSearchParams();
  const formMode = searchParams.get('formMode');

  const searchParamsValue = {
    Id: decodeURIComponent(searchParams.get('id') ?? ''),
    EmployeeID: decodeURIComponent(searchParams.get('EmployeeId') ?? ''),
    EmployeeName: decodeURIComponent(searchParams.get('name') ?? ''),
    JoinDate: decodeURIComponent(searchParams.get('date') ?? ''),
    JobTitleName: decodeURIComponent(searchParams.get('title') ?? ''),
    OrgGroupName: decodeURIComponent(searchParams.get('OrgGroupName') ?? ''),
    JobLevelCode: decodeURIComponent(searchParams.get('JobLevelCode') ?? ''),
    Category: decodeURIComponent(searchParams.get('Category') ?? ''),
    Status: decodeURIComponent(searchParams.get('Status') ?? ''),
  };

  const router = useRouter();
  const { editMPP, editMPPOrg, addMPPGap, assignMPPGap } = MutationsHandler();

  const onSubmit: SubmitHandler<MPPEmployeeSchemaType> = (data) => {
    const {
      EmployeeID,
      EmployeeName,
      JoinDate,
      JobTitleName,
      OrgGroupName,
      JobLevelCode,
      Category,
      Status,
    } = data;

    if (formMode === 'move') {
      editMPPOrg.mutate(
        {
          id: searchParamsValue.Id,
          Employee_ID: EmployeeID,
          Employee_Name: EmployeeName,
          Join_Date: JoinDate,
          Org_Group_Name: OrgGroupName,
          Job_Title_Name: JobTitleName,
          Job_Level_Code: JobLevelCode,
          Category,
          Status,
        },
        {
          onSuccess: () => {
            addMPPGap.mutate({
              Org_Group_Name: searchParamsValue.OrgGroupName,
              Job_Title_Name: searchParamsValue.JobTitleName,
              Job_Level_Code: searchParamsValue.JobLevelCode,
              Category: searchParamsValue.Category,
              Status: searchParamsValue.Status,
            });
            router.push('/manage-mpp');
            toast.success('Employee berhasil dipindahkan');
          },
          onError: () => {
            router.push('/manage-mpp');
            toast.error('Gagal memindahkan employee. Coba lagi');
          },
        },
      );
    }

    if (formMode === 'assign') {
      assignMPPGap.mutate(
        {
          id: searchParamsValue.Id,
          Employee_ID: EmployeeID,
          Employee_Name: EmployeeName,
          Join_Date: JoinDate,
          Status,
        },
        {
          onSuccess: () => {
            router.push('/manage-mpp');
            toast.success('MPP Gap berhasil diisi');
          },
          onError: () => {
            router.push('/manage-mpp');
            toast.error('Gagal mengubah mengisi MPP Gap. Coba lagi');
          },
        },
      );
    }

    if (formMode === 'edit') {
      editMPP.mutate(
        {
          id: searchParamsValue.Id,
          Employee_ID: EmployeeID,
          Employee_Name: EmployeeName,
          Join_Date: JoinDate,
          Job_Title_Name: JobTitleName,
          Job_Level_Code: JobLevelCode,
          Category,
          Status,
        },
        {
          onSuccess: () => {
            router.push('/manage-mpp');
            toast.success('MPP berhasil diubah');
          },
          onError: () => {
            router.push('/manage-mpp');
            toast.error('Gagal mengubah MPP. Coba lagi');
          },
        },
      );
    }
  };

  let formattedDate = '';
  if (searchParamsValue.JoinDate) {
    const [day, month, year] = searchParamsValue.JoinDate.split('-');
    if (day && month && year) {
      formattedDate = `20${year}-${month.padStart(2, '0')}-${day.padStart(
        2,
        '0',
      )}`;
    }
  }
  useEffect(() => {
    if (formMode === 'edit') {
      form.setValue('EmployeeID', searchParamsValue.EmployeeID);
      form.setValue('EmployeeName', searchParamsValue.EmployeeName);
      form.setValue('JoinDate', formattedDate);
      form.setValue('JobTitleName', searchParamsValue.JobTitleName, {
        shouldValidate: true,
      });
      form.setValue('OrgGroupName', searchParamsValue.OrgGroupName, {
        shouldValidate: true,
      });
      form.setValue('JobLevelCode', searchParamsValue.JobLevelCode, {
        shouldValidate: true,
      });
      form.setValue('Category', searchParamsValue.Category, {
        shouldValidate: true,
      });
      form.setValue('Status', searchParamsValue.Status, {
        shouldValidate: true,
      });
    } else if (formMode === 'assign') {
      form.setValue('JobTitleName', searchParamsValue.JobTitleName);
      form.setValue('OrgGroupName', searchParamsValue.OrgGroupName);
      form.setValue('JobLevelCode', searchParamsValue.JobLevelCode);
      form.setValue('Category', searchParamsValue.Category);
    } else if (formMode === 'move') {
      form.setValue('EmployeeID', searchParamsValue.EmployeeID);
      form.setValue('EmployeeName', searchParamsValue.EmployeeName);
      form.setValue('JoinDate', formattedDate);
      form.setValue('JobTitleName', searchParamsValue.JobTitleName, {});
      form.setValue('OrgGroupName', searchParamsValue.OrgGroupName, {
        shouldValidate: true,
      });
      form.setValue('JobLevelCode', searchParamsValue.JobLevelCode, {});
      form.setValue('Category', searchParamsValue.Category, {});
      form.setValue('Status', searchParamsValue.Status, {});
    } else {
      form.reset();
    }
  }, [
    formMode,
    searchParams,
    form,
    searchParamsValue.Id,
    searchParamsValue.EmployeeID,
    searchParamsValue.EmployeeName,
    formattedDate,
    searchParamsValue.JobTitleName,
    searchParamsValue.OrgGroupName,
    searchParamsValue.JobLevelCode,
    searchParamsValue.Category,
    searchParamsValue.Status,
  ]);

  return {
    form,
    errors,
    MPPOrganisations,
    onSubmit,
    dirtyFields,
    editFormDirty,
    moveFormDirty,
    formMode,
  };
};

export default MPPModalViewModel;
