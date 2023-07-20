import Icon from '@/Components/Icon'
import IconButton from '@/Components/IconButton'
import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import Modal from '@/Components/Modal'
import PrimaryButton from '@/Components/PrimaryButton'
import TextInput from '@/Components/TextInput'
import { Switch } from '@headlessui/react'
import { useForm } from '@inertiajs/react'
import { FormEventHandler, useEffect, useState } from 'react'

type EditCateringProps = {
  catering: Catering
}

export default function EditCateringModal({ catering }: EditCateringProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { data, setData, put, processing, errors, reset } = useForm({
    name: catering.name || '',
    phone: catering.phone || '',
    address: catering.address || '',
    email: catering.email || '',
    website: catering.website || '',
    status: catering.status || false
  })

  const openModal = () => {
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
  }

  const submit: FormEventHandler = e => {
    e.preventDefault()

    put(route('caterings.update', catering.id), {
      onSuccess: () => {
        closeModal()
      }
    })
  }

  useEffect(() => {
    return () => {
      reset()
    }
  }, [])

  return (
    <>
      <IconButton onClick={openModal}>
        <Icon name="Edit3" />
      </IconButton>

      <Modal show={isOpen} onClose={closeModal}>
        <form className="p-6" onSubmit={submit}>
          <h2 className="text-md font-medium text-gray-900 dark:text-gray-100">Edit Catering</h2>
          <div className="mt-4">
            <InputLabel htmlFor="name" value="Name" />
            <TextInput
              id="name"
              type="text"
              name="name"
              value={data.name}
              className="mt-1 block w-full"
              autoComplete="name"
              isFocused={true}
              onChange={e => setData('name', e.target.value)}
            />
            <InputError message={errors.name} className="mt-2" />
          </div>
          <div className="mt-4">
            <InputLabel htmlFor="phone" value="Phone" />
            <TextInput
              id="phone"
              type="tel"
              name="phone"
              value={data.phone}
              className="mt-1 block w-full"
              autoComplete="phone"
              onChange={e => setData('phone', e.target.value)}
            />
            <InputError message={errors.phone} className="mt-2" />
          </div>
          <div className="mt-4">
            <InputLabel htmlFor="address" value="Address" />
            <TextInput
              id="address"
              type="text"
              name="address"
              value={data.address}
              className="mt-1 block w-full"
              autoComplete="address"
              onChange={e => setData('address', e.target.value)}
            />
            <InputError message={errors.address} className="mt-2" />
          </div>
          <div className="mt-4">
            <InputLabel htmlFor="email" value="Email" />
            <TextInput
              id="email"
              type="email"
              name="email"
              value={data.email}
              className="mt-1 block w-full"
              autoComplete="email"
              onChange={e => setData('email', e.target.value)}
            />
            <InputError message={errors.email} className="mt-2" />
          </div>
          <div className="mt-4">
            <InputLabel htmlFor="website" value="Website" />
            <TextInput
              id="website"
              type="url"
              name="website"
              value={data.website}
              className="mt-1 block w-full"
              autoComplete="website"
              onChange={e => setData('website', e.target.value)}
            />
            <InputError message={errors.website} className="mt-2" />
          </div>
          <div className="mt-4">
            <InputLabel htmlFor="status" value="Status" />
            <Switch
              checked={data.status}
              onChange={val => setData('status', val)}
              className={`${
                data.status ? 'bg-indigo-500' : 'bg-gray-200 dark:bg-gray-500'
              } relative inline-flex h-6 w-11 items-center rounded-full`}
            >
              <span className="sr-only">Enable notifications</span>
              <span
                className={`${
                  data.status ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white transition`}
              />
            </Switch>
            <InputError message={errors.status} className="mt-2" />
          </div>
          <div className="flex items-center justify-end mt-4">
            <PrimaryButton className="ml-4" disabled={processing}>
              Update
            </PrimaryButton>
          </div>
        </form>
      </Modal>
    </>
  )
}