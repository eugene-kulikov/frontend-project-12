export default {
  translation: {
    page: {
      login: {
        title: 'Войти',
        fields: {
          name: 'Ваш ник',
          password: 'Пароль',
        },
        submit: 'Войти',
        altImage: 'Войти',
        footer: {
          text: 'Нет аккаунта?',
          link: 'Регистрация',
        },
      },
      registration: {
        title: 'Регистрация',
        fields: {
          name: 'Имя пользователя',
          password: 'Пароль',
          confirmPassword: 'Подтвердите пароль',
          placeholderConfirm: 'Пароли должны совпадать',
        },
        submit: 'Зарегистрироваться',
        altImage: 'Регистрация',
      },
      home: {
        channels: {
          title: 'Каналы',
          dropdown: {
            management: 'Управление каналом',
            remove: 'Удалить',
            rename: 'Переименовать',
          },
        },
        chat: {
          messages: 'сообщений',
          confirm: 'Отправить',
          placeholderMessage: 'Введите сообщение...',
          newMessage: 'Новое сообщение',
        },
      },
      notFound: {
        title: 'Страница не найдена',
        altImage: 'Страница не найдена',
        text: 'Но вы можете перейти',
        link: 'на главную страницу',
      },
    },
    component: {
      layout: {
        brand: 'Hexlet Chat',
        logout: 'Выйти',
      },
      modal: {
        add: {
          title: 'Добавить канал',
          confirm: 'Отправить',
          cancel: 'Отменить',
          label: 'Имя канала',
        },
        remove: {
          title: 'Удалить канал',
          confirm: 'Удалить',
          cancel: 'Отменить',
          question: 'Уверены?',
        },
        rename: {
          title: 'Переименовать канал',
          confirm: 'Отправить',
          cancel: 'Отменить',
          label: 'Имя канала',
        },
      },
    },
    validation: {
      required: 'Обязательное поле',
      invalidData: 'Неверные имя пользователя или пароль',
      intervalLength: 'От 3 до 20 символов',
      minLength: 'Не менее 6 символов',
      passwordMatch: 'Пароли должны совпадать',
      userExist: 'Такой пользователь уже существует',
      unique: 'Должно быть уникальным',
    },
  },
};
