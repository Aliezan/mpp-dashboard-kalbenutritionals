/* eslint-disable arrow-body-style */
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { trpc } from '@/app/_trpc/client';
import MutationsHandler from '@/components/adminTable/Handler/mutations';

const MPPModalViewModel = () => {
  const MPPEmployeeSchema = z.object({
    EmployeeID: z.string(),
    EmployeeName: z.string(),
    JoinDate: z.string(),
    JobTitleName: z.string(),
    OrgGroupName: z.string(),
    JobLevelCode: z.string(),
    Category: z.string(),
    Status: z.string(),
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
    formState: { errors },
  } = form;

  const { data: MPPOrganisations } = trpc.adminRouter.getOrgMPP.useQuery();

  const searchParams = useSearchParams();
  const MPPModal = searchParams.get('MPPModal');

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
  const { editMPP, addMPPGap } = MutationsHandler();

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

    editMPP.mutate(
      {
        id: searchParamsValue.Id,
        Employee_ID: EmployeeID,
        Employee_Name: EmployeeName,
        Join_Date: JoinDate,
        Job_Title_Name: JobTitleName,
        Org_Group_Name: OrgGroupName,
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

    addMPPGap.mutate({
      Org_Group_Name: searchParamsValue.OrgGroupName,
      Job_Title_Name: searchParamsValue.JobTitleName,
      Job_Level_Code: searchParamsValue.JobLevelCode,
      Category: searchParamsValue.Category,
      Status: searchParamsValue.Status,
    });
  };

  useEffect(() => {
    if (MPPModal === 'y') {
      form.setValue('EmployeeID', searchParamsValue.EmployeeID, {
        shouldValidate: true,
      });
      form.setValue('EmployeeName', searchParamsValue.EmployeeName, {
        shouldValidate: true,
      });
      form.setValue('JoinDate', searchParamsValue.JoinDate, {
        shouldValidate: true,
      });
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
    }
  }, [
    MPPModal,
    searchParams,
    form,
    searchParamsValue.Id,
    searchParamsValue.EmployeeID,
    searchParamsValue.EmployeeName,
    searchParamsValue.JoinDate,
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
  };
};

export default MPPModalViewModel;
