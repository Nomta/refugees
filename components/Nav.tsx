import Image from 'next/image';
import React, { FC, Fragment, useState } from 'react';
import { Transition, Dialog } from '@headlessui/react'

import logoImage from '/public/logo.png';
import personImage from '/public/person.svg';
import { useRouter } from 'next/router';
import { User } from '@prisma/client';
import { signOut } from 'next-auth/react';
import Link from 'next/link';

export const Nav: FC<{ user?: User }> = ({ user }) => {
  const menuItems = [
    { title: 'Редактировать профиль', link: '/editUser' },
    { title: 'Запись на смену', link: '/' },
    { title: 'Информация', link: '/info' },
    { title: 'Графики', link: '/schedule' },
  ];

  if (user?.isAdmin) {
    menuItems.push(
      { title: 'Таблица записей', link: '/table' },
      { title: 'Таблица старших', link: '/supervisors' }
    );
  }

  const router = useRouter();

  const activeUrl = router.asPath;
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className='md:px-4 md:py-2.5 border-gray-200 bg-white dark:bg-gray-800'>
      <div className='container flex flex-wrap justify-between items-center mx-auto'>
        <div className="relative z-20 px-2 sm:px-4 py-2.5 md:static md:px-0 md:py-0 flex-auto md:flex-none bg-white dark:bg-gray-800">
          <Link href='/'>
            <a className='flex items-center'>
              <Image
                className='mr-3 h-6 sm:h-9'
                src={logoImage}
                width='36'
                height='36'
                alt='Неравнодушные логотип'
              />
              <span className='self-center text-xl font-semibold whitespace-nowrap dark:text-white'>
                Неравнодушные
              </span>
            </a>
          </Link>
        </div>

        <div className='hidden justify-between items-center md:flex'>
          <ul className='flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium'>
            {menuItems.map((item) => (
              <li key={item.link}>
                <Link href={item.link}>
                  <a
                    className={
                      activeUrl === item.link
                        ? 'block rounded text-blue-700 dark:text-white'
                        : 'block text-gray-700 hover:text-blue-700 dark:text-gray-400 dark:hover:text-white"'
                    }
                    aria-current={activeUrl === item.link ? 'page' : 'false'}
                  >
                    {item.title}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        
        <Transition show={isMenuOpen} as={Fragment}>
          <Dialog onClose={() => setIsMenuOpen(false)}>
            <div className='fixed top-0 right-0 left-0 z-50 h-14 md:hidden' />

            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-10"
              leave="transition-opacity ease-in duration-300"
              leaveFrom="opacity-10"
              leaveTo="opacity-0"
            >
              <div className='fixed top-0 right-0 bottom-0 left-0 bg-slate-700 md:hidden' />
            </Transition.Child>
            
            <Transition.Child
              as={Fragment}
              enter="transition-all ease-out duration-300"
              enterFrom="-top-1/4 -right-full"
              enterTo="top-14 right-4"
              leave="transition-all ease-in duration-300"
              leaveFrom="top-14 right-4"
              leaveTo="-top-1/4 -right-full"
            >
              <Dialog.Panel className="fixed bg-white dark:bg-gray-800 shadow-md md:hidden">
                <ul className='flex flex-col mt-4'>
                  {menuItems.map((item) => (
                    <li key={item.link}>
                      <Link href={item.link}>
                        <a
                          className={
                            activeUrl === item.link
                              ? `block py-2 px-6 text-white bg-slate-700 rounded dark:text-white`
                              : 'block py-2 px-6 text-gray-700 border-b border-gray-100 dark:border-gray-700"'
                          }
                          aria-current={activeUrl === item.link ? 'page' : 'false'}
                        >
                          {item.title}
                        </a>
                      </Link>
                    </li>
                  ))}
                </ul>
              </Dialog.Panel>
            </Transition.Child>
          </Dialog>
        </Transition>

        <div className='relative z-20 px-2 sm:px-4 py-2.5 md:static md:px-0 md:py-0 flex gap-2 items-center md:order-2 bg-white dark:bg-gray-800'>
          {user && (
            <>
              <div className='flex flex-col items-end order-1 md:order-0'>
                <span className='md:block hidden text-sm text-gray-700 dark:text-gray-200 dark:hover:text-white'>
                  {user?.name}
                </span>
                <button
                  type='button'
                  className='block text-sm text-indigo-500 dark:text-gray-200 dark:hover:text-white'
                  onClick={() => signOut()}
                >
                  Выйти
                </button>
              </div>
              <div className='flex order-0 md:order-1 mr-3 text-sm bg-gray-400 rounded-full md:mr-0'>
                <span className='sr-only'>Открыть меню пользователя</span>
                <Image
                  className='w-8 h-8 rounded-full'
                  src={user?.image || personImage}
                  width={32}
                  height={32}
                  alt='Фото пользователя'
                />
              </div>
            </>
          )}

          <button
            type='button'
            className='order-2 inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className='sr-only'>Open main menu</span>
            <svg
              className='w-6 h-6'
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fillRule='evenodd'
                d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'
                clipRule='evenodd'
              ></path>
            </svg>
            <svg
              className='hidden w-6 h-6'
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fillRule='evenodd'
                d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                clipRule='evenodd'
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};
