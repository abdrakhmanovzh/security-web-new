import { useRouter } from 'next/router'
import { SubmitHandler, useForm } from 'react-hook-form'
import { IRegister } from '../../entities'
import { Button, ErrorMessage } from '@/shared/ui'
import Link from 'next/link'
import { register as signup } from '@/modules/auth/features/register'

export const RegisterForm = () => {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting: isLoading },
    setError
  } = useForm<IRegister>()

  const emailRegister = register('email', {
    required: 'Поле обязательно для заполнения',
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
      message: 'Некорректный email'
    }
  })
  const passwordRegister = register('password', {
    required: 'Поле обязательно для заполнения'
  })

  const onSubmit: SubmitHandler<IRegister> = async (data) => {
    try {
      await signup(data)
      router.push('/auth/create-person')
    } catch (errorObject) {
      const error = errorObject as Error
      setError('root', {
        message: error.message ?? 'Произошла ошибка, попробуйте еще раз'
      })
    }
  }

  return (
    <div className="flex h-fit w-full max-w-sm flex-col gap-2 rounded-lg border-2 bg-white px-4 py-6 shadow-md">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <div className="flex flex-col gap-3">
          <label className="font-semibold">Почта</label>
          <input
            {...emailRegister}
            placeholder="Почта"
            className="rounded-lg border-2 border-gray-200 p-2 outline-none ring-neutral-400 focus:ring-1"
          />
          {errors?.email?.message && <ErrorMessage message={errors.email.message} />}
        </div>
        <div className="flex flex-col gap-3">
          <label className="font-semibold">Пароль</label>
          <input
            {...passwordRegister}
            placeholder="Пароль"
            type="password"
            className="rounded-lg border-2 border-gray-200 p-2 outline-none ring-neutral-400 focus:ring-1"
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
          <Button text="ВОЙТИ" className="mt-2 bg-neutral-800" />
        </Link>

        <Link href="#" className="mt-4 w-full text-center text-primary hover:underline">
          Скачать инструкции и приложение
        </Link>
      </form>
    </div>
  )
}
