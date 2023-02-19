import * as yup from 'yup';

export default (t) => yup.object({
  username: yup.string()
    .min(3, t('validation.intervalLength'))
    .max(20, t('validation.intervalLength'))
    .required(t('validation.required')),
  password: yup.string()
    .min(6, t('validation.minLength'))
    .required(t('validation.required')),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password'), null], t('validation.passwordMatch'))
    .required(t('validation.required')),
});
