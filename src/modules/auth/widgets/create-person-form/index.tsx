import { useRouter } from 'next/router'
import React from 'react'
import { IPerson } from '../../entities/person'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Button, ErrorMessage } from '@/shared/ui'
import { useGetCompanies } from '../../hooks/useGetCompanies'
import { useGetRegions } from '../../hooks/useGetRegions'
import { createPerson } from '../../features/create-person'

export const CreatePersonForm = () => {
  const router = useRouter()

  const { data: companies } = useGetCompanies()
  const { data: regions } = useGetRegions()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm<IPerson>()

  const nameRegister = register('name', {
    required: 'Поле обязательно для заполнения'
  })
  const govIdRegister = register('gov_id', {
    required: 'Поле обязательно для заполнения'
  })
  const addressNameRegister = register('address_name', {
    required: 'Поле обязательно для заполнения'
  })
  const phoneNumberRegister = register('phone_number', {
    required: 'Поле обязательно для заполнения'
  })

  const [file, setFile] = React.useState<File | null>(null)
  const [companyId, setCompanyId] = React.useState<number | null>(null)
  const [regionId, setRegionId] = React.useState<number | null>(null)

  const onSubmit: SubmitHandler<IPerson> = async (data) => {
    try {
      const formData = new FormData()
      formData.append('name', data.name)
      formData.append('gov_id', data.gov_id)
      formData.append('address_name', data.address_name)
      formData.append('phone_number', data.phone_number)
      formData.append('company_id', String(companyId))
      formData.append('region_id', String(regionId))
      formData.append('user_id', String(localStorage.getItem('userId')))
      formData.append('photo', file!)

      await createPerson(formData)
      router.push('/')
    } catch (errorObject) {
      const error = errorObject as Error
      setError('root', {
        message: error.message ?? 'Произошла ошибка, попробуйте еще раз'
      })
    }
  }

  return (
    <div className="flex h-fit w-full max-w-sm flex-col gap-2 rounded-lg border-2 bg-white px-4 py-6 shadow-md">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          <label className="font-semibold">Имя</label>
          <input
            {...nameRegister}
            placeholder="Имя"
            className="rounded-lg border-2 border-gray-200 p-2 outline-none ring-neutral-400 focus:ring-1"
          />
          {errors?.name?.message && <ErrorMessage message={errors.name.message} />}
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-semibold">ИИН</label>
          <input
            {...govIdRegister}
            placeholder="ИИН"
            className="rounded-lg border-2 border-gray-200 p-2 outline-none ring-neutral-400 focus:ring-1"
          />
          {errors?.gov_id?.message && <ErrorMessage message={errors.gov_id.message} />}
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-semibold">Компания</label>
          <select
            defaultValue={'default'}
            onChange={(e) => setCompanyId(Number(e.target.value))}
            className="select w-full border-2 border-gray-200 pl-2 text-base text-gray-400"
          >
            <option value={'default'} disabled>
              Выберите компанию
            </option>
            {companies &&
              companies.data &&
              companies.data.map((company) => (
                <option value={company.id} key={company.id}>
                  {company.name}
                </option>
              ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-semibold">Регион</label>
          <select
            defaultValue={'default'}
            onChange={(e) => setRegionId(Number(e.target.value))}
            className="select w-full border-2 border-gray-200 pl-2 text-base text-gray-400"
          >
            <option value={'default'} disabled>
              Выберите регион
            </option>
            {regions &&
              regions.data &&
              regions.data.map((region) => (
                <option value={region.id} key={region.id}>
                  {region.name}
                </option>
              ))}
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-semibold">Адрес</label>
          <input
            {...addressNameRegister}
            placeholder="Адрес"
            className="rounded-lg border-2 border-gray-200 p-2 outline-none ring-neutral-400 focus:ring-1"
          />
          {errors?.address_name?.message && <ErrorMessage message={errors.address_name.message} />}
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-semibold">Номер телефона</label>
          <input
            {...phoneNumberRegister}
            placeholder="Номер телефона"
            className="rounded-lg border-2 border-gray-200 p-2 outline-none ring-neutral-400 focus:ring-1"
          />
          {errors?.phone_number?.message && <ErrorMessage message={errors.phone_number.message} />}
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-semibold">Фото</label>

          <input
            type="file"
            onChange={(e) => {
              if (e.target.files) setFile(e.target.files[0])
            }}
            className="file-input file-input-bordered w-full"
          />
        </div>

        <Button text="ДОБАВИТЬ" type="submit" className="mt-6" />
        {errors?.root?.message && <ErrorMessage message={errors.root.message} />}
      </form>
    </div>
  )
}
