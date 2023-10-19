import { useRouter } from 'next/router'
import { SubmitHandler, useForm } from 'react-hook-form'
import { IRegister } from '../../entities'
import { Button, ErrorMessage } from '@/shared/ui'
import Link from 'next/link'

export const RegisterForm = () => {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting: isLoading },
    setError
  } = useForm<IRegister>()

  const innRegister = register('inn', {
    required: 'Поле обязательно для заполнения',
    pattern: {
      value: /^\d{12}$/,
      message: 'ИНН должен состоять из 12 цифр'
    }
  })
  const passwordRegister = register('password', {
    required: 'Поле обязательно для заполнения'
  })

  const onSubmit: SubmitHandler<IRegister> = async (data) => {
    try {
      // await login(data);
      router.push('/')
    } catch (error) {
      setError('root', {
        message: 'Произошла ошибка, попробуйте еще раз'
      })
    }
  }

  return (
    <div className="bg-white flex h-fit w-full max-w-sm flex-col gap-2 rounded-lg border-2 px-4 py-6 shadow-md">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <div className="flex flex-col gap-3">
          <label className="font-semibold">ИНН</label>
          <input
            {...innRegister}
            placeholder="ИНН"
            className="border-gray-200 ring-neutral-400 rounded-lg border-2 p-2 outline-none focus:ring-1"
          />
          {errors?.inn?.message && <ErrorMessage message={errors.inn.message} />}
        </div>
        <div className="flex flex-col gap-3">
          <label className="font-semibold">Пароль</label>
          <input
            {...passwordRegister}
            placeholder="Пароль"
            type="password"
            className="border-gray-200 ring-neutral-400 rounded-lg border-2 p-2 outline-none focus:ring-1"
          />
          {errors?.password?.message && <ErrorMessage message={errors.password.message} />}
        </div>

        <Button text="ЗАРЕГИСТРИРОВАТЬСЯ" type="submit" className="mt-6" />
        {errors?.root?.message && <ErrorMessage message={errors.root.message} />}

        <div className="flex items-center gap-2">
          <hr className="w-full" />
          <span className="text-base">или</span>
          <hr className="w-full" />
        </div>

        <Link href="/auth/signin" className="w-full">
          <Button text="ВОЙТИ" className="bg-neutral-800 mt-2" />
        </Link>

        <Link href="#" className="text-primary mt-4 w-full text-center hover:underline">
          Скачать инструкции и приложение
        </Link>
      </form>
    </div>
  )
}
