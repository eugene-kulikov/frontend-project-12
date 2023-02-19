import * as yup from 'yup';

export default (t) => yup.object({
  username: yup.string()
    .required(t('validation.required')),
  password: yup.string()
    .required(t('validation.required')),
});
